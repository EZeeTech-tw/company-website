import { setRequestLocale } from "next-intl/server";
import { getText } from "@/i18n/server";
import { Link } from "@/i18n/navigation";
import { ApplicationPhoto } from "@/components/ApplicationPhoto";
import { LogoMarquee } from "@/components/LogoMarquee";
import { ProductVideoPreview } from "@/components/ProductVideoPreview";
import { CompositeOSPreview } from "@/components/CompositeOSPreview";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { CTASection, SectionHeader, SolutionCard } from "@/components/SiteSections";
import { pageMetadata } from "@/lib/metadata";
import { defaultDescription, solutions } from "@/lib/site";
import Image from 'next/image';
import { insights, insightCopy } from '@/lib/insights';
export async function generateMetadata({params}: {params: Promise<{locale:string}>}) { setRequestLocale((await params).locale); return pageMetadata("先進工程技術與創新研發", defaultDescription, "/"); }
export default async function HomePage({params}: {params: Promise<{locale:string}>}) {
 setRequestLocale((await params).locale);
 const t = await getText();
 const locale = (await params).locale;
 return <>
 <div className="home-opening">
 <section className="waitlist-banner"><Container><div className="waitlist-banner-inner"><div><span className="waitlist-tag">COMPOSITA OS / EARLY ACCESS</span><h2>{locale==='en'?'An AI agent for composite analysis.':'複合材料分析，交給 AI Agent。'}</h2><p>{locale==='en'?'Join the Composita OS waitlist for early access updates on automated composite layup modeling, simulation and failure assessment.':'加入 Composita OS 候補名單，接收複材鋪層建模、模擬與失效評估自動化的搶先體驗通知。'}</p></div><Link href="/waitlist" className="btn btn-primary">{locale==='en'?'Join the waitlist ↗':'加入候補名單 ↗'}</Link></div></Container></section>
 <PageHero variant="hero-carbon home-hero" eyebrow="ADVANCED ENGINEERING TECHNOLOGIES" title="Engineering Ideas. Delivering Impact." description={<><p className="hero-subtitle">{t("工程驅動創新，技術創造價值。")}</p><p>{locale==='en'?'Composite design, simulation and prototyping for teams developing lightweight structures.':'以複材設計、數位模擬與快速打樣，協助研發團隊打造輕量化結構。'}</p></>}>
 <div className="button-row"><Link href="/waitlist" className="btn btn-primary">{locale==='en'?'Join the Composita OS waitlist ↗':'加入 Composita OS 候補名單 ↗'}</Link><Link href="/contact" className="btn btn-ghost">{t("討論工程需求")}</Link></div>
 <div className="hero-footer"><span>COMPOSITE ENGINEERING</span><span>STRUCTURAL DESIGN</span><span>DESIGN · SIMULATE · VALIDATE</span></div>
 </PageHero>
 </div>
 <LogoMarquee/>
 <section className="home-composite-section"><Container className="section-space"><SectionHeader eyebrow="COMPOSITE ENGINEERING" title={t("從複材工程，到自動化分析。")} description={t("結合 Composita 工程服務與 Composita OS Agent，串聯設計、分析與交付。")}/><div className="solutions-feature"><SolutionCard solution={solutions[0]}/><CompositeOSPreview/></div></Container></section>
 <section className="home-video-section" aria-labelledby="home-video-heading"><Container className="home-preview-layout"><div><p className="eyebrow">COMPOSITA OS / IN MOTION</p><h2 id="home-video-heading">{locale==='en'?'Composite analysis. See the workflow.':'複合材料分析，直接看流程。'}</h2><p className="home-preview-description">{locale==='en'?'A quick look at the Composita OS interface for composite modeling, simulation and failure assessment.':'用一段短預覽，認識 Composita OS 的複材建模、模擬與失效評估介面。'}</p><div className="home-preview-actions"><Link href="/waitlist" className="btn btn-primary">{locale==='en'?'Join the waitlist ↗':'加入候補名單 ↗'}</Link><a href="https://www.youtube.com/watch?v=hcnYq2N0lOI" target="_blank" rel="noopener noreferrer" className="text-link">{locale==='en'?'Watch the full video ↗':'觀看完整影片 ↗'}</a></div></div><ProductVideoPreview/></Container></section>
 <section><Container className="section-space"><SectionHeader eyebrow="INDUSTRIES & APPLICATIONS" title="Engineering Across Industries." description={t("以工程能力為基礎，探索先進複合材料與結構設計的應用。")}/><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{([
   [t("無人載具"),t("輕量化結構、設備托架與快速迭代。"),"drone"],
   [t("機器人"),t("承載零件、結構分析與製造可行性。"),"robotics"],
   [t("交通與移動載具"),t("載具結構、輕量化設計與系統整合。"),"mobility"],
   [t("產業工程"),t("設備結構、模擬分析與原型驗證。"),"research"],
 ] as const).map(([title,description,kind])=><div key={title} className="feature-card application-card"><ApplicationPhoto kind={kind}/><h3>{title}</h3><p className="text-slate-600">{description}</p></div>)}</div></Container></section>
 <section className="bg-white border-y"><Container className="section-space"><SectionHeader eyebrow="ENGINEERING INSIGHTS" title={locale==='en'?'Better questions. Better engineering.':'從工程問題，找到設計方向。'} description={locale==='en'?'Practical guides to material selection, analysis and project planning.':'從選材、分析到專案準備，找到下一個設計決策的依據。'}/><div className="grid md:grid-cols-3 gap-6">{insights.slice(0,3).map(article=>{const copy=insightCopy(article,locale);return <Link href={`/insights/${article.slug}`} key={article.slug} className="feature-card insight-card"><Image className="insight-thumbnail" src={`/insights/${article.slug}.svg`} alt="" width={1200} height={640} unoptimized/><p className="eyebrow">{article.category}</p><h3 className="mt-4 text-lg leading-relaxed font-semibold">{copy.title}</h3><span className="text-link mt-5 inline-block">{locale==='en'?'Read guide ↗':'閱讀指南 ↗'}</span></Link>;})}</div><Link href="/insights" className="btn btn-secondary mt-8">{locale==='en'?'Explore engineering insights ↗':'探索工程知識 ↗'}</Link></Container></section>
 <CTASection/>
 </>;
}
