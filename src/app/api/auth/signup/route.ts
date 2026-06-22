import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { users, audit_logs } from '@/types/database';
import { signToken } from '@/lib/auth';
import { sendWelcomeEmail } from '@/lib/email';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password, companyName, industry, country, city, revenueRange, goals } = body;

  if (!name || !email || !password || !companyName || !industry || !country || !city) {
    return NextResponse.json({ error: 'Required fields are missing.' }, { status: 400 });
  }

  const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1).then((rows: any[]) => rows[0]);
  if (existingUser) {
    return NextResponse.json({ error: 'Email already registered.' }, { status: 409 });
  }

  const passwordHash = bcrypt.hashSync(password, 12);
  const result = await db.insert(users).values({
    email,
    password_hash: passwordHash,
    full_name: name,
    company: companyName,
    industry,
    country,
    city,
    revenue_range: revenueRange,
    goals: goals || [],
    role: 'user'
  }).returning();

  const user = result[0];
  await db.insert(audit_logs).values({
    user_id: user.id,
    action: 'signup',
    ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
    user_agent: request.headers.get('user-agent') || 'unknown'
  }).catch(() => null);

  await sendWelcomeEmail(email, name).catch(() => null);

  const token = signToken({ userId: user.id, email: user.email });
  const response = NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      company: user.company,
      role: user.role
    }
  });

  response.cookies.set('aura_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  });

  return response;
}
