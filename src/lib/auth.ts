import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const rawSecret = process.env.JWT_SECRET || process.env.DATABASE_URL || 'change-me-to-a-secret';
const JWT_SECRET = crypto.createHash('sha256').update(rawSecret).digest('hex');

export type AuthPayload = {
  userId: number;
  email: string;
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
