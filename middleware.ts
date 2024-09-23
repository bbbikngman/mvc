import { NextResponse, NextRequest } from "next/server";


// 定义不需要验证的公共路径
const publicPaths = ['/login', '/api/auth/login', '/api/auth/register', '/public'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 允许公共路径通过
    if (publicPaths.some((path) => pathname.startsWith(path))) {
        console.log('Public path, allowing access.');
        return NextResponse.next();
    }

    // 获取请求中的token
    const token = request.cookies.get('token')?.value;
    console.log("验证token鉴权：" + token);
    

    if(!token) {
        const loginUrl = new URL('/login', request.url);
          // 在查询参数中加入回调路径，以便登录后重定向回到原始页面
         loginUrl.searchParams.set('callbackUrl', pathname);
         console.log('Redirecting to login:', loginUrl.toString());
         return NextResponse.redirect(loginUrl);
    }
    console.log('Token exists, allowing access.');
    // 如果存在token，允许请求
    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'] // 根据需要添加更多受保护的路径
}