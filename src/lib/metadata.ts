import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { translator } from '@/i18n/text';
import { brandName } from './site';
export async function pageMetadata(title: string, description: string, path: string): Promise<Metadata> {
  const locale = await getLocale();
  const t = translator(locale);
  const url = locale === 'en' ? `/en${path === '/' ? '' : path}` : path;
  title = t(title); description = t(description);
  return {
    title: {absolute: `${title} | ${locale === 'en' ? 'EZeeTech' : 'EZeeTech 宜智科技'}`}, description,
    alternates: {canonical: url, languages: {'zh-Hant': path, en: `/en${path === '/' ? '' : path}`, 'x-default': path}},
    openGraph: {title, description, url, type: 'website', siteName: t(brandName), locale: locale === 'en' ? 'en_US' : 'zh_TW', alternateLocale: locale === 'en' ? 'zh_TW' : 'en_US', images: [{url:'/opengraph-image',width:1200,height:630,alt:'EZeeTech — Advanced Engineering Technologies'}]},
    twitter: {card:'summary_large_image',title,description,images:['/opengraph-image']}
  };
}
