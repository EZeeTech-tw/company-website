import type { MetadataRoute } from "next";
import { getNewsList } from "@/lib/news";
import { siteUrl } from "@/lib/site";
import { insights } from '@/lib/insights';
export default function sitemap(): MetadataRoute.Sitemap {
 return [
  ...["","/solutions","/solutions/composita","/solutions/ssers","/about","/technology","/news","/contact","/insights"].flatMap(path=>['','/en'].map(prefix=>({url:siteUrl+prefix+path,alternates:{languages:{'zh-Hant':siteUrl+path,en:siteUrl+'/en'+path}},changeFrequency:"monthly" as const,priority:path?0.8:1}))),
  ...insights.flatMap(article=>['','/en'].map(prefix=>({url:`${siteUrl}${prefix}/insights/${article.slug}`,alternates:{languages:{'zh-Hant':`${siteUrl}/insights/${article.slug}`,en:`${siteUrl}/en/insights/${article.slug}`}},changeFrequency:'monthly' as const,priority:0.7}))),
  ...getNewsList().flatMap(post=>['','/en'].map(prefix=>({url:`${siteUrl}${prefix}/news/${post.slug}`,alternates:{languages:{'zh-Hant':`${siteUrl}/news/${post.slug}`,en:`${siteUrl}/en/news/${post.slug}`}},changeFrequency:"yearly" as const,priority:0.6}))),
 ];
}
