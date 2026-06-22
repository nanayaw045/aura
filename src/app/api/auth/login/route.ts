import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { users } from '@/types/database';
import { signToken } from '@/lib/auth';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
  }

  const user = await db.select().from(users).where(eq(users.email, email)).limit(1).then((rows: any[]) => rows[0]);

  if (!user || !bcrypt.compareSync(password, (user as any).password_hash || '')) {
    return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
  }

  const token = signToken({ userId: user.id, email: user.email });
  const response = NextResponse.json({ user: { id: user.id, email: user.email, name: user.name, company_name: user.company_name, role: user.role } });
  response.cookies.set('aura_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  });
  return response;
}
