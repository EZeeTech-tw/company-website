'use client';
import { useState, type FormEvent } from 'react';
import { useLocale } from 'next-intl';
import { validWaitlistEmail } from '@/lib/waitlist';

export function WaitlistForm() {
  const locale = useLocale();
  const en = locale === 'en';
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const fields = new FormData(event.currentTarget);
    const email = String(fields.get('email') || '').trim();
    if (!validWaitlistEmail(email)) {
      setError(en ? 'Please enter a valid @gmail.com address.' : '請填寫有效的 @gmail.com 信箱。');
      return;
    }
    setBusy(true); setError('');
    try {
      const response = await fetch('/api/waitlist', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, consent: fields.get('consent') === 'on', website: fields.get('website'), locale }) });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error('unavailable');
      setSuccess(true);
    } catch {
      setError(en ? 'Registration could not be submitted. Please retry or email info@ezeetech.tw with “Composita OS Waitlist”.' : '登記尚未送出。請重試，或寄信至 info@ezeetech.tw，主旨註明「Composita OS Waitlist」。');
    } finally { setBusy(false); }
  }
  if (success) return <div className="waitlist-success" role="status"><span aria-hidden="true">✓</span><h2>{en ? 'You’re on the list.' : '已收到你的登記。'}</h2><p>{en ? 'We’ll contact your Gmail when early access becomes available. Registration does not guarantee access or a launch date.' : '開放搶先體驗時，我們會透過你留下的 Gmail 聯繫。登記不代表保證取得體驗資格或特定上線日期。'}</p></div>;
  return <form className="contact-form waitlist-form" onSubmit={submit} aria-busy={busy}>
    <div><label htmlFor="waitlist-email">Gmail</label><input id="waitlist-email" name="email" type="email" autoComplete="email" placeholder="you@gmail.com" required maxLength={254} aria-describedby="waitlist-email-help"/><p id="waitlist-email-help" className="waitlist-help">{en ? 'Use your @gmail.com address. No account or password required.' : '請使用 @gmail.com 信箱，不需要建立帳號或提供密碼。'}</p></div>
    <label className="checkbox-label waitlist-consent"><input name="consent" type="checkbox" required/><span>{en ? 'I agree to receive Composita OS early access and launch notifications.' : '我同意接收 Composita OS 搶先體驗與產品上線通知。'}</span></label>
    <div className="hidden" aria-hidden="true"><label htmlFor="waitlist-website">Website</label><input id="waitlist-website" name="website" tabIndex={-1} autoComplete="off"/></div>
    <button className="btn btn-primary" type="submit" disabled={busy}>{busy ? (en ? 'Submitting…' : '登記中…') : (en ? 'Join the waitlist ↗' : '加入候補名單 ↗')}</button>
    <p className="waitlist-help">{en ? 'Your email is sent to the EZeeTech team and used only for these notifications. To cancel, email ' : '信箱會交由宜智科技團隊保管，僅供上述通知使用。若要取消登記，請來信 '}<a className="text-link" href="mailto:info@ezeetech.tw?subject=Composita%20OS%20Waitlist">info@ezeetech.tw</a>。</p>
    {error && <p role="alert" className="status-error">{error}</p>}
  </form>;
}
