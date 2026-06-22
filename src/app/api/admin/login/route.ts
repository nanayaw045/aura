import { NextResponse } from 'next/server';
import { signAdminToken } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const provided = body?.password;
    const adminPassword = process.env.ADMIN_PASSWORD || 'Pintogee12345';
    if (!provided || provided !== adminPassword) {
      return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 });
    }

    const token = signAdminToken();
    const response = NextResponse.json({ ok: true });
    response.cookies.set('admin_session', token, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 30 * 60
    });
    return response;
  } catch (err) {
    return NextResponse.json({ ok: false, message: 'Bad request' }, { status: 400 });
  }
}
