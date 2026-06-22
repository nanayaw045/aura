import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { chat_sessions } from '@/types/database';
import { getUserFromRequest } from '@/lib/session';

export async function POST(request: Request) {
  const user = getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { message } = body;

  if (!message || typeof message !== 'string') {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }

  const prompt = message.toLowerCase();
  const response = prompt.includes('profit')
    ? 'Focus on high-margin products and upsell services with clear ROI for premium buyers.'
    : prompt.includes('growth')
    ? 'Expand into targeted growth sectors by layering AI-driven sales activity with customer success.'
    : prompt.includes('risk')
    ? 'Diversify revenue and monitor exposure to the top three clients to reduce risk concentration.'
    : 'Use your latest operating metrics to prioritize the top three initiatives for growth and efficiency.';

  const messages = [
    { role: 'user', text: message },
    { role: 'assistant', text: response }
  ];

  await db.insert(chat_sessions).values({
    user_id: user.userId,
    title: `Chat - ${new Date().toISOString()}`,
    messages
  });

  return NextResponse.json({ message: response });
}
