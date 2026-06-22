import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { users } from '@/types/database';
import { getUserFromRequest } from '@/lib/session';

export async function POST(request: Request) {
  const user = getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { businessName, industry, country, city, revenueRange, goals } = body;

  if (!businessName || !industry || !country || !city) {
    return NextResponse.json({ error: 'Missing onboarding fields' }, { status: 400 });
  }

  await db.update(users).set({
    company_name: businessName,
    industry,
    country,
    city,
    revenue_range: revenueRange,
    goals,
    health_score: 88
  }).where(eq(users.id, user.userId));

  return NextResponse.json({ success: true });
}
