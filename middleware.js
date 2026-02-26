import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getCookie } from 'cookies-next';

export function middleware(req) {
  const token = getCookie('token', { req });
  const { pathname } = req.nextUrl;

  // Skip login route
  if (pathname === '/login') {
    return NextResponse.next();
  }

  // Check token for protected routes
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};