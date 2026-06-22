import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const rawSecret = process.env.JWT_SECRET;
if (!rawSecret) {
  throw new Error('JWT_SECRET is required for token signing');
}

const JWT_SECRET = crypto.createHash('sha256').update(rawSecret).digest('hex');

export type AuthPayload = {
  userId: number;
  email: string;
};

export type AdminPayload = {
  admin: true;
};

export function signToken(payload: AuthPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthPayload;
  } catch {
    return null;
  }
}

export function signAdminToken() {
  return jwt.sign({ admin: true }, JWT_SECRET, { expiresIn: '30m' });
}

export function verifyAdminToken(token: string) {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as AdminPayload;
    return payload?.admin === true;
  } catch {
    return false;
  }
}
