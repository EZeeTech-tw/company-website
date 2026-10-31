import news from './news-en.json';
import type { NewsItem, NewsMeta } from '@/lib/news';
export function localizeNews(item: NewsItem, locale: string): NewsMeta {
  const translation = (news as Record<string, {title:string;excerpt?:string}>)[item.slug];
  return locale === 'en' && translation ? {...item.meta, ...translation, excerpt: translation.excerpt} : item.meta;
}
