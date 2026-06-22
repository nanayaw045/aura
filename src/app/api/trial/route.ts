import { NextResponse } from 'next/server';
import { and, eq, gt } from 'drizzle-orm';
import { db } from '@/lib/db';
import { trials } from '@/types/database';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = (body?.email || '').trim().toLowerCase();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid institution email is required.' }, { status: 400 });
    }

    const now = new Date();
    const activeTrial = await db
      .select()
      .from(trials)
      .where(and(eq(trials.email, email), gt(trials.expires_at, now)))
      .limit(1)
      .then((rows: any[]) => rows[0]);

    if (activeTrial) {
      return NextResponse.json({ error: 'This email already has an active trial.' }, { status: 409 });
    }

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await db.insert(trials).values({ email, expires_at: expiresAt });

    return NextResponse.json({ ok: true, message: 'Trial started.' });
  } catch (err) {
    return NextResponse.json({ error: 'Unable to start trial.' }, { status: 500 });
  }
}
