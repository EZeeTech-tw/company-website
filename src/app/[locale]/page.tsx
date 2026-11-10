import { setRequestLocale } from "next-intl/server";
import { getText } from "@/i18n/server";
import { Link } from "@/i18n/navigation";
import { ApplicationPhoto } from "@/components/ApplicationPhoto";
import { LogoMarquee } from "@/components/LogoMarquee";
import { CompositeOSPreview } from "@/components/CompositeOSPreview";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { CTASection, FeatureCard, SectionHeader, SolutionCard } from "@/components/SiteSections";
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
 <PageHero variant="hero-carbon home-hero" eyebrow="ADVANCED ENGINEERING TECHNOLOGIES" title="Engineering Ideas. Delivering Impact." description={<><p className="hero-subtitle">{t("工程驅動創新，技術創造價值。")}</p><p>{locale==='en'?'Composite design, simulation and prototyping for teams developing lightweight structures.':'以複材設計、數位模擬與快速打樣，協助研發團隊打造輕量化結構。'}</p></>}>
 <div className="button-row"><Link href="/waitlist" className="btn btn-primary">{locale==='en'?'Join the Composita OS waitlist ↗':'加入 Composita OS 候補名單 ↗'}</Link><Link href="/contact" className="btn btn-ghost">{t("討論工程需求")}</Link></div>
 <div className="hero-footer"><span>COMPOSITE ENGINEERING</span><span>STRUCTURAL DESIGN</span><span>DESIGN · SIMULATE · VALIDATE</span></div>
 </PageHero>
 <section className="waitlist-banner"><Container><div className="waitlist-banner-inner"><div><span className="waitlist-tag">COMPOSITA OS / EARLY ACCESS</span><h2>{locale==='en'?'Your next engineering workflow starts here.':'下一步工程工作流程，搶先體驗。'}</h2><p>{locale==='en'?'Leave your Gmail for early access and launch updates.':'留下 Gmail，接收搶先體驗與產品上線通知。'}</p></div><Link href="/waitlist" className="btn btn-primary">{locale==='en'?'Join the waitlist ↗':'加入候補名單 ↗'}</Link></div></Container></section>
 <LogoMarquee/>
 <section><Container className="section-space"><SectionHeader eyebrow="COMPOSITE ENGINEERING" title={t("從複材工程，到自動化分析。")} description={t("結合 Composita 工程服務與 Composita OS Agent，串聯設計、分析與交付。")}/><div className="solutions-feature"><SolutionCard solution={solutions[0]}/><CompositeOSPreview/></div></Container></section>
 <section className="home-video-section" aria-labelledby="home-video-heading"><Container className="section-space"><SectionHeader eyebrow="MEET COMPOSITA OS" title={locale==='en'?'The future of composite design.':'認識複材設計的下一步。'}/><h2 id="home-video-heading" className="sr-only">Meet Composita OS | The Future of Composite Design</h2><div className="home-video-player"><iframe src="https://www.youtube-nocookie.com/embed/hcnYq2N0lOI?rel=0" title="Meet Composita OS | The Future of Composite Design" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/></div><a href="https://www.youtube.com/watch?v=hcnYq2N0lOI" target="_blank" rel="noopener noreferrer" className="text-link home-video-link">{locale==='en'?'Watch on YouTube ↗':'在 YouTube 觀看 ↗'}</a></Container></section>
 <section className="bg-white border-y"><Container className="section-space"><SectionHeader eyebrow="CORE ENGINEERING CAPABILITIES" title="From Ideas to Real-World Applications." description={t("從需求定義到實際驗證，串起每一個開發階段。")}/><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{[[t("工程設計"),t("釐清需求與邊界條件，建立材料、機構與系統設計方案。")],[t("模擬與分析"),t("以數位模型比較方案，支援結構評估與研發決策。")],[t("原型與驗證"),t("透過打樣、量測與測試，持續驗證與改良設計。")],[t("系統整合"),t("銜接結構、機電、製程與使用情境，推進實際應用。")]].map(([title,description])=><FeatureCard key={title} title={title}><p>{description}</p></FeatureCard>)}</div></Container></section>
 <section><Container className="section-space"><SectionHeader eyebrow="INDUSTRIES & APPLICATIONS" title="Engineering Across Industries." description={t("以工程能力為基礎，探索先進複合材料與結構設計的應用。")}/><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{([
   [t("無人載具"),t("輕量化結構、設備托架與快速迭代。"),"drone"],
   [t("機器人"),t("承載零件、結構分析與製造可行性。"),"robotics"],
   [t("交通與移動載具"),t("載具結構、輕量化設計與系統整合。"),"mobility"],
   [t("產業工程"),t("設備結構、模擬分析與原型驗證。"),"research"],
 ] as const).map(([title,description,kind])=><div key={title} className="feature-card application-card"><ApplicationPhoto kind={kind}/><h3>{title}</h3><p className="text-slate-600">{description}</p></div>)}</div></Container></section>
 <section className="bg-white border-y"><Container className="section-space grid md:grid-cols-2 gap-12"><SectionHeader eyebrow="ABOUT EZEETECH" title="Built by Engineers. Driven by Curiosity."/><div className="space-y-5 text-slate-600"><p>{t("宜智科技創立於 2025 年，起源於校園工程研究與技術開發，持續累積設計、模擬、原型製作與系統整合能力。")}</p><p>{t("隨著工程能力與產業需求拓展，我們發展 Composita，將研發能力延伸至先進複合材料、結構設計與研發數位化。")}</p><Link href="/about" className="text-link inline-block">{t("認識我們的故事 ↗")}</Link></div></Container></section>
 <section className="bg-white border-y"><Container className="section-space"><SectionHeader eyebrow="ENGINEERING INSIGHTS" title={locale==='en'?'Better questions. Better engineering.':'從工程問題，找到設計方向。'} description={locale==='en'?'Practical guides to material selection, analysis and project planning.':'從選材、分析到專案準備，找到下一個設計決策的依據。'}/><div className="grid md:grid-cols-3 gap-6">{insights.slice(0,3).map(article=>{const copy=insightCopy(article,locale);return <Link href={`/insights/${article.slug}`} key={article.slug} className="feature-card insight-card"><Image className="insight-thumbnail" src={`/insights/${article.slug}.svg`} alt="" width={1200} height={640} unoptimized/><p className="eyebrow">{article.category}</p><h3 className="mt-4 text-lg leading-relaxed font-semibold">{copy.title}</h3><span className="text-link mt-5 inline-block">{locale==='en'?'Read guide ↗':'閱讀指南 ↗'}</span></Link>;})}</div><Link href="/insights" className="btn btn-secondary mt-8">{locale==='en'?'Explore engineering insights ↗':'探索工程知識 ↗'}</Link></Container></section>
 <CTASection/>
 </>;
}
