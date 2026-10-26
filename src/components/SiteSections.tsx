import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "./Container";
import { solutions } from "@/lib/site";
export function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
 return <div className="section-heading"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{description && <p className="section-description">{description}</p>}</div>;
}

export function FeatureCard({ title, children }: { title: string; children: ReactNode }) {
  return <div className="feature-card"><h3>{title}</h3><div className="text-slate-600">{children}</div></div>;
}

export function SolutionCard({ solution }: { solution: typeof solutions[number] }) {
  return <Link className="solution-card" href={`/solutions/${solution.id}`}>
    <div className={`solution-art ${solution.id}`} aria-hidden="true"><span>{solution.id === "composita" ? "01 / MATERIALS" : "02 / ENERGY"}</span></div>
    <div className="solution-body"><p className="eyebrow">{solution.english}</p><h3>{solution.name}</h3><p className="font-semibold">{solution.title}</p><p className="text-slate-600">{solution.description}</p><div className="tag-list">{solution.tags.map(tag => <span key={tag}>{tag}</span>)}</div><span className="text-link">探索 {solution.name} ↗</span></div></Link>;
}

export function SolutionsGrid() { 
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{solutions.map(solution => <SolutionCard key={solution.id} solution={solution} />)}</div>; 
}

export function CTASection({ title = "Have an Engineering Challenge?", description = "從初步技術討論到概念驗證，讓我們一起探索下一個工程解決方案。", href = "/contact", label = "與我們討論需求" }: { title?: string; description?: string; href?: string; label?: string }) {
  return <section className="cta-section"><Container className="section-space"><p className="eyebrow">LET’S BUILD WHAT’S NEXT</p><h2>{title}</h2><p>{description}</p><Link className="btn btn-primary" href={href}>{label}<span aria-hidden="true">↗</span></Link></Container></section>;
}

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
 return <nav aria-label="麵包屑" className="breadcrumb"><ol><li><Link href="/">首頁</Link></li>{items.map((item, i) => <li key={i}>{item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}</li>)}</ol></nav>;
}
