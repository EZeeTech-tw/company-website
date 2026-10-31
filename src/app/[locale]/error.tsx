"use client";
import { useText } from '@/i18n/useText';
export default function ErrorPage({reset}:{error:Error;reset:()=>void}){const t=useText();return <div className="site-container section-space"><p className="eyebrow">SOMETHING WENT WRONG</p><h1 className="mt-4">{t('內容暫時無法載入。')}</h1><p className="mt-4 text-slate-600">{t('請重新嘗試，或透過 info@ezeetech.tw 與我們聯繫。')}</p><button className="btn btn-primary mt-6" onClick={reset}>{t('重新載入')}</button></div>;}
