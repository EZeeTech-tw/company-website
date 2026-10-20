import type { MetadataRoute } from "next";
import { getNewsList } from "@/lib/news";
import { siteUrl } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
 return [
  ...["","/solutions","/solutions/compositera","/solutions/ssers","/about","/technology","/news","/contact"].map(path=>({url:siteUrl+path,changeFrequency:"monthly" as const,priority:path?0.8:1})),
  ...getNewsList().map(post=>({url:`${siteUrl}/news/${post.slug}`,changeFrequency:"yearly" as const,priority:0.6})),
 ];
}
