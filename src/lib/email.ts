import { Resend } from '@resend/node';

const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  throw new Error('RESEND_API_KEY is required to send email from AURA BUSINESS INTELLIGENCE');
}

const resend = new Resend(apiKey);

export async function sendWelcomeEmail(email: string, fullName: string) {
  return resend.emails.send({
    from: 'welcome@aura.business',
    to: email,
    subject: 'Welcome to AURA BUSINESS INTELLIGENCE',
    html: `
      <div style="font-family: Inter, sans-serif; color: #0A1F44;">
        <h1 style="margin:0 0 16px; font-size:24px;">Welcome to AURA BUSINESS INTELLIGENCE</h1>
        <p style="margin:0 0 12px; font-size:16px; line-height:1.5;">Hello ${fullName},</p>
        <p style="margin:0 0 12px; font-size:16px; line-height:1.5;">Your account is now active. Begin using the platform to unlock live institutional insights, secure analytics workflows, and executive-grade reporting.</p>
        <p style="margin:0; font-size:16px; line-height:1.5;">Thank you for choosing AURA BUSINESS INTELLIGENCE.</p>
      </div>
    `
  });
}
