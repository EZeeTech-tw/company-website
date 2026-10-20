import Link from "next/link";
import Image from "next/image";
import type { NewsItem } from "@/lib/news";
export function NewsCard({ item: { slug, meta } }: { item: NewsItem }) {
 return <Link className="news-card" href={`/news/${slug}`}><div className="news-image">{meta.image ? <Image src={meta.image} alt={meta.title} width={640} height={400} sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw" unoptimized /> : <span aria-hidden="true">EZeeTech / NEWS</span>}</div>
 <div className="news-body"><div className="news-meta"><span className="badge">{meta.category}</span><time dateTime={meta.date}>{meta.date}</time></div><h3>{meta.title}</h3>{meta.excerpt && <p className="line-clamp-3">{meta.excerpt}</p>}<span className="text-link">閱讀完整消息 ↗</span></div></Link>;
}
