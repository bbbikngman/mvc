import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(request: Request) {
    const { username, password } = await request.json();
    //与后端通信验证用户
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username, password }),
    });

    if(!res.ok) {
        const errorData = await res.json();
        return NextResponse.json({ message: errorData.message || '登录失败'},  { status: res.status });
    }

    const data = await res.json();
    const token = data.token;

    //设置httpOnly Cookie
    const response = NextResponse.json({ message: 'Login successful!' });

    response.headers.set('Set-Cookie', serialize('token', token, {
        httpOnly: true,
        path: '/', // 确保在所有路径下都可用
        secure: process.env.NODE_ENV === 'production',// 仅在生产环境下使用 secure
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 1 周
    }));
    
    return response;
}