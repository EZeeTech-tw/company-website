"use client";
import { useState } from "react";
import { NewsCard } from "./NewsCard";
import type { NewsItem } from "@/lib/news";
const categories = ["All", "Company", "CompositERA", "SSERS", "Awards", "Partnerships"];
export function NewsExplorer({ items }: { items: NewsItem[] }) {
 const [category,setCategory]=useState("All");
 const filtered=items.filter(item=>category==="All" || item.meta.category===category);
 return <><div className="filter-list" aria-label="新聞分類">{categories.map(c=><button key={c} aria-pressed={category===c} onClick={()=>setCategory(c)}>{c==="All"?"全部消息":c}</button>)}</div><p className="text-sm text-slate-600 mb-6" role="status">{filtered.length} 篇消息</p>{filtered.length?<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{filtered.map(item=><NewsCard key={item.slug} item={item}/>)}</div>:<div className="empty-state"><h2>此分類目前尚無公開消息</h2><p className="mt-3 text-slate-600">歷史紀錄依原始內容分類，後續進展將在此更新。</p><button className="btn btn-secondary mt-6" onClick={()=>setCategory("All")}>查看全部消息</button></div>}</>;
}
