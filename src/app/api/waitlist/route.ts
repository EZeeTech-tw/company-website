import { Resend } from 'resend';
import { createHash } from 'node:crypto';
import { validWaitlistEmail } from '@/lib/waitlist';

export async function POST(request: Request) {
  try {
    const origin = request.headers.get('origin');
    if (origin && origin !== new URL(request.url).origin) return Response.json({ error: 'origin' }, { status: 403 });
    if (Number(request.headers.get('content-length')) > 2048) return Response.json({ error: 'size' }, { status: 413 });
    const raw = await request.text();
    if (raw.length > 2048) return Response.json({ error: 'size' }, { status: 413 });
    let data;
    try { data = JSON.parse(raw); } catch { return Response.json({ error: 'invalid' }, { status: 400 }); }
    if (!data || typeof data !== 'object' || Array.isArray(data) || !validWaitlistEmail(data.email) || data.consent !== true || data.website) {
      return Response.json({ error: 'invalid' }, { status: 400 });
    }
    if (!process.env.RESEND_API_KEY) return Response.json({ error: 'unavailable' }, { status: 503 });
    const email = data.email.trim().toLowerCase();
    const result = await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: 'noreply@ezeetech.tw',
      to: ['info@ezeetech.tw', 'info.ezeetech.sustain@gmail.com', 'ezeetech.2025@gmail.com'],
      replyTo: email,
      subject: 'Composita OS Waitlist｜新登記',
      text: `Gmail: ${email}\n產品: Composita OS\n同意接收搶先體驗與產品上線通知: 是\n語言: ${data.locale === 'en' ? 'English' : '繁體中文'}\n取消登記請由公司信箱處理。`,
    }, { idempotencyKey: `waitlist-${createHash('sha256').update(email).digest('hex')}` });
    if (result.error || !result.data?.id) return Response.json({ error: 'unavailable' }, { status: 502 });
    return Response.json({ success: true });
  } catch { return Response.json({ error: 'unavailable' }, { status: 500 }); }
}
