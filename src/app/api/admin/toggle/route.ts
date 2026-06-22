import { NextResponse } from 'next/server';
import { isMaintenance, setMaintenance } from '@/lib/admin';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const provided = body?.password;
    const adminPassword = process.env.ADMIN_PASSWORD || 'Pintogee12345';
    if (!provided || provided !== adminPassword) {
      return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 });
    }
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
