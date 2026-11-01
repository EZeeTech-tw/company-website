import { setRequestLocale } from "next-intl/server";
import { getText } from "@/i18n/server";
import { Link } from "@/i18n/navigation";
import { LogoMarquee } from "@/components/LogoMarquee";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { SectionHeader, FeatureCard, SolutionsGrid, CTASection } from "@/components/SiteSections";
import { pageMetadata } from "@/lib/metadata";
export async function generateMetadata({params}: {params: Promise<{locale:string}>}) { setRequestLocale((await params).locale); return pageMetadata("關於宜智科技", "宜智科技創立於 2025 年，從校園工程研究出發，以 Composita 聚焦複合材料結構設計、工程分析與原型開發。", "/about"); }
export default async function AboutPage({params}: {params: Promise<{locale:string}>}) {
 setRequestLocale((await params).locale);
 const t = await getText(); return <>
 <PageHero eyebrow="WHO WE ARE" title="Built by Engineers. Driven by Curiosity." description={t("EZeeTech｜宜智科技股份有限公司 — Advanced Engineering Technology Company")} breadcrumb={[{label:t("關於我們")}]}/>
 <section><Container className="section-space grid md:grid-cols-2 gap-12"><SectionHeader eyebrow="OUR STORY" title={t("始於工程研究，持續走向產業應用。")}/><div className="space-y-5 text-slate-600"><p>{t("宜智科技於 2025 年創立，起源於校園實驗室的工程研究與技術開發。我們透過研究、原型製作與應用探索，累積跨領域工程實作經驗。")}</p><p>{t("從研究到原型的過程，讓團隊累積設計、模擬、測試與系統整合能力。隨著工程能力與產業需求拓展，我們進一步發展 Composita，將這些能力延伸至先進複合材料、輕量化結構與數位化研發。")}</p><p>{t("今天，我們聚焦 Composita 複合材料工程，以結構設計、分析、可製造性評估與打樣對接，回應研發團隊的開發需求。讓工程工作能被檢查、交付與驗證，是持續前進的方向。")}</p></div></Container></section>
 <section className="bg-white border-y"><Container className="section-space"><SectionHeader eyebrow="WHO WE ARE" title="Engineering Ideas. Delivering Impact." description={t("工程驅動創新，技術創造價值。我們結合跨領域工程設計、數位模擬與實際場域驗證，將創新構想轉化為具有應用價值的技術與產品。")}/><SectionHeader eyebrow="OUR ENGINEERING PHILOSOPHY" title={t("以問題為起點，以驗證為依據。")}/><div className="grid md:grid-cols-3 gap-6">{[[t("理解需求"),t("先釐清使用情境、功能限制與驗收條件，再選擇合適的工程路徑。")],[t("整合專業"),t("串聯材料、機構、電機與電子工程，讓設計能銜接製造與系統整合。")],[t("持續驗證"),t("尊重測試條件與數據邊界，透過原型、量測與迭代持續改良。")]].map(([title,description])=><FeatureCard key={title} title={title}><p>{description}</p></FeatureCard>)}</div></Container></section>
 <section><Container className="section-space"><SectionHeader eyebrow="OUR SOLUTIONS" title={t("以複合材料工程，串聯設計與交付。")}/><SolutionsGrid/></Container></section>
 <section className="bg-white border-y"><Container className="section-space"><SectionHeader eyebrow="MILESTONES" title={t("一步一步，累積工程的可能。")}/><ol className="grid md:grid-cols-3 gap-6"><li className="feature-card"><p className="eyebrow">2025</p><h3>{t("公司創立與技術研究")}</h3><p>{t("從校園工程研究出發，累積原型開發、模擬分析與系統整合經驗。")}</p></li><li className="feature-card"><p className="eyebrow">2026</p><h3>{t("交流與合作拓展")}</h3><p>{t("參與 SusHi Tech Tokyo、COMPUTEX / InnoVEX，並通過鴻海專利扶植新創計畫審核。")}</p><Link className="text-link" href="/news">{t("閱讀原始新聞紀錄 ↗")}</Link></li><li className="feature-card"><p className="eyebrow">CURRENT DIRECTION</p><h3>{t("複合材料工程與數位研發")}</h3><p>{t("Composita 提供複合材料設計、分析與打樣對接；Composita OS 為開發中的複合材料工程 Agent 平台，目標是串聯工程資料、分析流程與交付。")}</p></li></ol></Container></section><LogoMarquee/><CTASection title="Let’s Work Together." description={t("歡迎工程師、研發團隊與產業夥伴，一起討論值得解決的工程問題.")}/>
 </>; }
