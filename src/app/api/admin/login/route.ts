import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const provided = body?.password;
    const adminPassword = process.env.ADMIN_PASSWORD || 'Pintogee12345';
    if (!provided || provided !== adminPassword) {
      return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, message: 'Bad request' }, { status: 400 });
  }
}
