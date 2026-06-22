import { verifyToken } from '@/lib/auth';
import type { AuthPayload } from '@/lib/auth';

export const SESSION_COOKIE = 'aura_token';

export function getUserFromRequest(request: Request): AuthPayload | null {
  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = Object.fromEntries(cookieHeader.split(';').map((item) => {
    const [key, ...value] = item.trim().split('=');
    return [key, decodeURIComponent(value.join('='))];
  }));

  const token = cookies[SESSION_COOKIE];
  if (!token) return null;
  return verifyToken(token);
}
