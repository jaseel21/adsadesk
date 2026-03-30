import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getCookie } from 'cookies-next';

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const origin = req.headers.get('origin');
  
  // Handle CORS for API routes
  if (pathname.startsWith('/api')) {
    // For preflight (OPTIONS) requests
    if (req.method === 'OPTIONS') {
      const response = new NextResponse(null, { status: 204 });
      response.headers.set('Access-Control-Allow-Origin', origin || '*');
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
      response.headers.set('Access-Control-Allow-Credentials', 'true');
      response.headers.set('Access-Control-Max-Age', '86400');
      return response;
    }
  }

  // Auth logic for non-API routes (standard forward-facing student/admin pages)
  if (!pathname.startsWith('/api') && pathname !== '/login') {
    const token = getCookie('token', { req });
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  let response = NextResponse.next();

  // Add CORS headers to ALL API responses
  if (pathname.startsWith('/api')) {
    response.headers.set('Access-Control-Allow-Origin', origin || '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};