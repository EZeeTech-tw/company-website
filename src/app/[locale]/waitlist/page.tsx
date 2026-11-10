import { setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/Container';
import { WaitlistWorkflow } from '@/components/WaitlistWorkflow';
import { WaitlistForm } from '@/components/WaitlistForm';
import { Link } from '@/i18n/navigation';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; setRequestLocale(locale);
  return pageMetadata(locale === 'en' ? 'Composita OS — Join the waitlist' : 'Composita OS｜搶先體驗候補名單', locale === 'en' ? 'Leave your Gmail to receive Composita OS early access and launch notifications.' : '留下 Gmail，接收 Composita OS 搶先體驗與產品上線通知。', '/waitlist');
}
export default async function WaitlistPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; setRequestLocale(locale);
  const en = locale === 'en';
  return <section className="waitlist-page"><Container className="waitlist-layout">
    <div className="waitlist-intro"><p className="eyebrow">COMPOSITA OS / EARLY ACCESS</p><h1>{en ? 'More engineering.\nLess repetition.' : '專注工程設計。\n讓分析流程更簡單。'}</h1><p className="waitlist-lead">{en ? 'An agent platform for composite engineering. Join the waitlist and hear from us when early access opens.' : '為複合材料工程打造的 Agent 平台。加入候補名單，在開放體驗時收到第一手通知。'}</p><WaitlistWorkflow/><p className="waitlist-note">{en ? 'Composita OS is in development. Availability and features will be announced as they become ready.' : 'Composita OS 持續開發中，開放時間與可體驗功能將另行通知。'}</p><Link href="/solutions/composita#compositeos" className="text-link">{en ? 'Explore Composita OS ↗' : '認識 Composita OS ↗'}</Link></div>
    <div className="waitlist-panel"><span className="waitlist-tag">JOIN THE WAITLIST</span><h2>{en ? 'Be first to hear.' : '搶先一步，收到消息。'}</h2><p className="waitlist-panel-description">{en ? 'Just your Gmail. We’ll take it from here.' : '只需留下 Gmail，接下來交給我們。'}</p><WaitlistForm/></div>
  </Container></section>;
}
