"use client";
import { useText } from '@/i18n/useText';
export default function Loading(){const t=useText();return <div className="site-container section-space" role="status" aria-live="polite"><p className="eyebrow">EZEETECH</p><p className="mt-4 text-slate-600">{t('正在載入內容…')}</p><div className="mt-8 h-40 rounded-xl bg-slate-100" aria-hidden="true"/></div>;}
