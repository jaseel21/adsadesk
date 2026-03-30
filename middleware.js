import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getCookie } from 'cookies-next';

// Define allowed origins for CORS
const ALLOWED_ORIGINS = [
  'https://adsa-desk.web.app',
  'https://adsa-desk.firebaseapp.com',
  
  'http://localhost:5173', // Vite default dev port
  'http://localhost:3000', // Next.js default dev port
];

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const origin = req.headers.get('origin');
  
  // Handle CORS for API routes
  if (pathname.startsWith('/api')) {
    // Determine if the current origin is allowed
    const isAllowedOrigin = ALLOWED_ORIGINS.includes(origin) || !origin;
    
    // For preflight (OPTIONS) requests
    if (req.method === 'OPTIONS') {
      const response = new NextResponse(null, { status: 200 });
      if (isAllowedOrigin) {
        response.headers.set('Access-Control-Allow-Origin', origin || '*');
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
        response.headers.set('Access-Control-Allow-Credentials', 'true');
      }
      return response;
    }
  }

  // Auth logic for non-API routes (as per original code)
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

  const response = NextResponse.next();

  // Add CORS headers to the response for API routes
  if (pathname.startsWith('/api')) {
    const isAllowedOrigin = ALLOWED_ORIGINS.includes(origin) || !origin;
    if (isAllowedOrigin) {
      response.headers.set('Access-Control-Allow-Origin', origin || '*');
      response.headers.set('Access-Control-Allow-Credentials', 'true');
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};