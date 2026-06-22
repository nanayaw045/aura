import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { users } from '@/types/database';
import { signToken } from '@/lib/auth';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password, companyName, industry, country, city, revenueRange, goals } = body;

  if (!name || !email || !password || !companyName) {
    return NextResponse.json({ error: 'Required fields are missing.' }, { status: 400 });
  }

  const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1).then((rows: any[]) => rows[0]);
  if (existingUser) {
    return NextResponse.json({ error: 'Email already registered.' }, { status: 409 });
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const result = await db.insert(users).values({
    name,
    email,
    password_hash: passwordHash,
    company_name: companyName,
    industry,
    country,
    city,
    revenue_range: revenueRange,
    goals: goals || [],
    plan: 'Starter',
    health_score: 72
  }).returning();

  const user = result[0];
  const token = signToken({ userId: user.id, email: user.email });
  const response = NextResponse.json({ user: { id: user.id, email: user.email, name: user.name, company_name: user.company_name } });
  response.cookies.set('aura_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  });
  return response;
}
