import { useText } from "@/i18n/useText";
import { Link } from "@/i18n/navigation";
import { ApplicationPhoto } from "@/components/ApplicationPhoto";
import { LogoMarquee } from "@/components/LogoMarquee";
import { CompositeOSPreview } from "@/components/CompositeOSPreview";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { CTASection, FeatureCard, SectionHeader, SolutionCard } from "@/components/SiteSections";
import { NewsCard } from "@/components/NewsCard";
import { getNewsList } from "@/lib/news";
import { pageMetadata } from "@/lib/metadata";
import { defaultDescription, solutions } from "@/lib/site";
export async function generateMetadata() { return pageMetadata("先進工程技術與創新研發", defaultDescription, "/"); }
export default function HomePage() {
 const t = useText();
 const news = getNewsList().slice(0,3);
 return <>
 <PageHero variant="hero-carbon home-hero" eyebrow="ADVANCED ENGINEERING TECHNOLOGIES" title="Engineering Ideas. Delivering Impact." description={<><p className="hero-subtitle">{t("工程驅動創新，技術創造價值。")}</p><p>{t("EZeeTech｜宜智科技股份有限公司是一家先進工程技術公司。從複合材料結構到機電能源系統，我們整合工程設計、數位模擬與實際驗證，讓創新構想走向產業應用。")}</p></>}>
 <div className="button-row"><Link href="/solutions" className="btn btn-primary">{t("探索兩大產品線 ↗")}</Link><Link href="/contact" className="btn btn-ghost">{t("討論工程需求")}</Link></div>
 <div className="hero-footer"><span>COMPOSITE ENGINEERING</span><span>ENERGY RECOVERY</span><span>DESIGN · SIMULATE · VALIDATE</span></div>
 </PageHero>
 <LogoMarquee/>
 <section><Container className="section-space"><SectionHeader eyebrow="COMPOSITE ENGINEERING" title={t("從複材工程，到自動化分析。")} description={t("結合 Composita 工程服務與 Composita OS Agent，串聯設計、分析與交付。")}/><div className="solutions-feature"><SolutionCard solution={solutions[0]}/><CompositeOSPreview/></div></Container></section>
 <section className="bg-white border-y"><Container className="section-space"><SectionHeader eyebrow="CORE ENGINEERING CAPABILITIES" title="From Ideas to Real-World Applications." description={t("從需求定義到實際驗證，串起每一個開發階段。")}/><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{[[t("工程設計"),t("釐清需求與邊界條件，建立材料、機構與系統設計方案。")],[t("模擬與分析"),t("以數位模型比較方案，支援結構評估與研發決策。")],[t("原型與驗證"),t("透過打樣、量測與測試，持續驗證與改良設計。")],[t("系統整合"),t("銜接結構、機電、製程與使用情境，推進實際應用。")]].map(([title,description])=><FeatureCard key={title} title={title}><p>{description}</p></FeatureCard>)}</div></Container></section>
 <section><Container className="section-space"><SectionHeader eyebrow="INDUSTRIES & APPLICATIONS" title="Engineering Across Industries." description={t("以工程能力為基礎，探索先進材料與能源技術的應用。")}/><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{([
   [t("無人載具"),t("輕量化結構、設備托架與快速迭代。"),"drone"],
   [t("機器人"),t("承載零件、結構分析與製造可行性。"),"robotics"],
   [t("交通與移動載具"),t("懸吊運動、能源回收與車載系統整合。"),"mobility"],
   [t("產業工程"),t("設備結構、模擬分析與原型驗證。"),"research"],
 ] as const).map(([title,description,kind])=><div key={title} className="feature-card application-card"><ApplicationPhoto kind={kind}/><h3>{title}</h3><p className="text-slate-600">{description}</p></div>)}</div></Container></section>
 <section className="bg-white border-y"><Container className="section-space grid md:grid-cols-2 gap-12"><SectionHeader eyebrow="ABOUT EZEETECH" title="Built by Engineers. Driven by Curiosity."/><div className="space-y-5 text-slate-600"><p>{t("宜智科技創立於 2025 年，起源於校園工程研究與技術開發，以 SSERS 振動能量回收研究為早期核心。")}</p><p>{t("隨著工程能力與產業需求拓展，我們發展 Composita，將研發能力延伸至先進複合材料、結構設計與研發數位化。")}</p><Link href="/about" className="text-link inline-block">{t("認識我們的故事 ↗")}</Link></div></Container></section>
 <section><Container className="section-space"><SectionHeader eyebrow="LATEST NEWS" title="Our Journey in Engineering." description={t("技術研究、企業進展與合作紀錄。")}/><div className="grid md:grid-cols-3 gap-6">{news.map(item=><NewsCard key={item.slug} item={item}/>)}</div>{!news.length && <p className="empty-state">{t("目前尚無消息。")}</p>}<Link href="/news" className="btn btn-secondary mt-8">{t("查看全部消息 ↗")}</Link></Container></section>
 <CTASection/>
 </>;
}
