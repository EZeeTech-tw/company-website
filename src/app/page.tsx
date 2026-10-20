import Link from "next/link";
import { ApplicationPhoto } from "@/components/ApplicationPhoto";
import { LogoMarquee } from "@/components/LogoMarquee";
import { CompositeOSPreview } from "@/components/CompositeOSPreview";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { CTASection, FeatureCard, SectionHeader, SolutionCard } from "@/components/SiteSections";
import { NewsCard } from "@/components/NewsCard";
import { getNewsList } from "@/lib/news";
import { defaultDescription, pageMetadata, solutions } from "@/lib/site";
export const metadata = pageMetadata("先進工程技術與創新研發", defaultDescription, "/");
export default function HomePage() {
 const news = getNewsList().slice(0,3);
 return <>
 <PageHero variant="hero-carbon home-hero" eyebrow="ADVANCED ENGINEERING TECHNOLOGIES" title="Engineering Ideas. Delivering Impact." description={<><p className="hero-subtitle">工程驅動創新，技術創造價值。</p><p>EZeeTech｜宜智科技股份有限公司是一家先進工程技術公司。從複合材料結構到機電能源系統，我們整合工程設計、數位模擬與實際驗證，讓創新構想走向產業應用。</p></>}>
 <div className="button-row"><Link href="/solutions" className="btn btn-primary">探索兩大產品線 ↗</Link><Link href="/contact" className="btn btn-ghost">討論工程需求</Link></div>
 <div className="hero-footer"><span>COMPOSITE ENGINEERING</span><span>ENERGY RECOVERY</span><span>DESIGN · SIMULATE · VALIDATE</span></div>
 </PageHero>
 <LogoMarquee/>
 <section><Container className="section-space"><SectionHeader eyebrow="COMPOSITE ENGINEERING" title="從複材工程，到自動化分析。" description="結合 CompositeERA 工程服務與 CompositeOS Agent，串聯設計、分析與交付。"/><div className="solutions-feature"><SolutionCard solution={solutions[0]}/><CompositeOSPreview/></div></Container></section>
 <section className="bg-white border-y"><Container className="section-space"><SectionHeader eyebrow="CORE ENGINEERING CAPABILITIES" title="From Ideas to Real-World Applications." description="從需求定義到實際驗證，串起每一個開發階段。"/><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{[["工程設計","釐清需求與邊界條件，建立材料、機構與系統設計方案。"],["模擬與分析","以數位模型比較方案，支援結構評估與研發決策。"],["原型與驗證","透過打樣、量測與測試，持續驗證與改良設計。"],["系統整合","銜接結構、機電、製程與使用情境，推進實際應用。"]].map(([title,description])=><FeatureCard key={title} title={title}><p>{description}</p></FeatureCard>)}</div></Container></section>
 <section><Container className="section-space"><SectionHeader eyebrow="INDUSTRIES & APPLICATIONS" title="Engineering Across Industries." description="以工程能力為基礎，探索先進材料與能源技術的應用。"/><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{([
   ["無人載具","輕量化結構、設備托架與快速迭代。","drone"],
   ["機器人","承載零件、結構分析與製造可行性。","robotics"],
   ["交通與移動載具","懸吊運動、能源回收與車載系統整合。","mobility"],
   ["產業工程","設備結構、模擬分析與原型驗證。","research"],
 ] as const).map(([title,description,kind])=><div key={title} className="feature-card application-card"><ApplicationPhoto kind={kind}/><h3>{title}</h3><p className="text-slate-600">{description}</p></div>)}</div></Container></section>
 <section className="bg-white border-y"><Container className="section-space grid md:grid-cols-2 gap-12"><SectionHeader eyebrow="ABOUT EZEETECH" title="Built by Engineers. Driven by Curiosity."/><div className="space-y-5 text-slate-600"><p>宜智科技創立於 2025 年，起源於校園工程研究與技術開發，以 SSERS 振動能量回收研究為早期核心。</p><p>隨著工程能力與產業需求拓展，我們發展 CompositeERA，將研發能力延伸至先進複合材料、結構設計與研發數位化。</p><Link href="/about" className="text-link inline-block">認識我們的故事 ↗</Link></div></Container></section>
 <section><Container className="section-space"><SectionHeader eyebrow="LATEST NEWS" title="Our Journey in Engineering." description="技術研究、企業進展與合作紀錄。"/><div className="grid md:grid-cols-3 gap-6">{news.map(item=><NewsCard key={item.slug} item={item}/>)}</div>{!news.length && <p className="empty-state">目前尚無消息。</p>}<Link href="/news" className="btn btn-secondary mt-8">查看全部消息 ↗</Link></Container></section>
 <CTASection/>
 </>;
}
