import { NextResponse } from 'next/server';
import { isMaintenance, setMaintenance, verifyAdminRequest } from '@/lib/admin';

export async function GET(req: Request) {
  if (!verifyAdminRequest(req)) {
    return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json({ ok: true, maintenance: isMaintenance() });
}

export async function POST(req: Request) {
  try {
    if (!verifyAdminRequest(req)) {
      return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 });
    }
    const body = await req.json();
    const action = body?.action || 'toggle';
    if (action === 'toggle') {
      const newVal = setMaintenance(!isMaintenance());
      return NextResponse.json({ ok: true, maintenance: newVal });
    }
    if (action === 'set') {
      const v = !!body?.value;
      const newVal = setMaintenance(v);
      return NextResponse.json({ ok: true, maintenance: newVal });
    }
    return NextResponse.json({ ok: false, message: 'Invalid action' }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ ok: false, message: 'Bad request' }, { status: 400 });
  }
}
