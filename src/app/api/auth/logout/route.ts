// src/app/api.auth/logout/logout.ts
// 登出路由
import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(request: Request) {
  const response = NextResponse.json({ success: true });

  // 删除Cookie
  response.headers.set('Set-Cookie', serialize('token', '', {
    path: '/',
    expires: new Date(0),
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  }))
  return response;
}

