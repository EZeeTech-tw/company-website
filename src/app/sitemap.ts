import type { MetadataRoute } from 'next';
import { getNewsList } from '@/lib/news';
import { siteUrl } from '@/lib/site';
import { insights } from '@/lib/insights';
import { localePath } from '@/lib/locale-path';
export default function sitemap(): MetadataRoute.Sitemap {
  const entries = (path: string, frequency: 'monthly' | 'yearly', priority: number) => ['en', 'zh'].map(locale => ({
    url: siteUrl + localePath(path, locale),
    alternates: { languages: { 'zh-Hant': siteUrl + localePath(path, 'zh'), en: siteUrl + localePath(path, 'en') } },
    changeFrequency: frequency, priority,
  }));
  return [
    ...['/','/solutions/composita','/about','/technology','/news','/contact','/insights','/services','/waitlist'].flatMap(path => entries(path, 'monthly', path === '/' ? 1 : 0.8)),
    ...insights.flatMap(article => entries(`/insights/${article.slug}`, 'monthly', 0.7)),
    ...getNewsList().flatMap(post => entries(`/news/${post.slug}`, 'yearly', 0.6)),
  ];
}
