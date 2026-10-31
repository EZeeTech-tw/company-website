import './globals.css';
import {getLocale} from 'next-intl/server';
import {siteUrl} from '@/lib/site';
export const metadata={metadataBase:new URL(siteUrl),title:'404 | EZeeTech',robots:{index:false,follow:true}};
export default async function GlobalNotFound(){const en=(await getLocale())==='en';return <html lang={en?'en':'zh-Hant-TW'}><body><main className="site-container section-space"><h1>{en?'Page not found.':'找不到這個頁面。'}</h1><a href={en?'/en':'/'}>{en?'Back to home':'返回首頁'}</a></main></body></html>;}
