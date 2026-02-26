import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export function getToken() {
  const cookieStore = cookies();
  return cookieStore.get('token')?.value;
}

export function setToken(token) {
  // Client-side only; use in actions
  document.cookie = `token=${token}; path=/; max-age=604800`; // 7 days
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}