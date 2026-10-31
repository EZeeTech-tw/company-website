import type { MetadataRoute } from "next";
import { getNewsList } from "@/lib/news";
import { siteUrl } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
 return [
  ...["","/solutions","/solutions/composita","/solutions/ssers","/about","/technology","/news","/contact"].flatMap(path=>['','/en'].map(prefix=>({url:siteUrl+prefix+path,alternates:{languages:{'zh-Hant':siteUrl+path,en:siteUrl+'/en'+path}},changeFrequency:"monthly" as const,priority:path?0.8:1}))),
  ...getNewsList().flatMap(post=>['','/en'].map(prefix=>({url:`${siteUrl}${prefix}/news/${post.slug}`,alternates:{languages:{'zh-Hant':`${siteUrl}/news/${post.slug}`,en:`${siteUrl}/en/news/${post.slug}`}},changeFrequency:"yearly" as const,priority:0.6}))),
 ];
}
