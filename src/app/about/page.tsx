import Link from "next/link";
import { LogoMarquee } from "@/components/LogoMarquee";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { SectionHeader, FeatureCard, SolutionsGrid, CTASection } from "@/components/SiteSections";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata("關於宜智科技", "宜智科技創立於 2025 年，從校園工程研究與 SSERS 能量回收技術出發，發展 Composita 複合材料工程，以兩大產品線推進先進工程應用。", "/about");
export default function AboutPage() { return <>
 <PageHero eyebrow="WHO WE ARE" title="Built by Engineers. Driven by Curiosity." description="EZeeTech｜宜智科技股份有限公司 — Advanced Engineering Technology Company" breadcrumb={[{label:"關於我們"}]}/>
 <section><Container className="section-space grid md:grid-cols-2 gap-12"><SectionHeader eyebrow="OUR STORY" title="始於工程研究，持續走向產業應用。"/><div className="space-y-5 text-slate-600"><p>宜智科技於 2025 年創立，起源於校園實驗室的工程研究與技術開發。我們從振動能量回收問題出發，將 SSERS 作為早期核心技術，持續探索機構、電磁轉換與電力管理的整合。</p><p>從研究到原型的過程，讓團隊累積設計、模擬、測試與系統整合能力。隨著工程能力與產業需求拓展，我們進一步發展 Composita，將這些能力延伸至先進複合材料、輕量化結構與數位化研發。</p><p>今天，我們以 Composita 與 SSERS 兩條平行產品線，回應不同的工程技術需求。創業的起點仍是我們的根基，而讓技術在真實環境中創造價值，是持續前進的方向。</p></div></Container></section>
 <section className="bg-white border-y"><Container className="section-space"><SectionHeader eyebrow="WHO WE ARE" title="Engineering Ideas. Delivering Impact." description="工程驅動創新，技術創造價值。我們結合跨領域工程設計、數位模擬與實際場域驗證，將創新構想轉化為具有應用價值的技術與產品。"/><SectionHeader eyebrow="OUR ENGINEERING PHILOSOPHY" title="以問題為起點，以驗證為依據。"/><div className="grid md:grid-cols-3 gap-6">{[["理解需求","先釐清使用情境、功能限制與驗收條件，再選擇合適的工程路徑。"],["整合專業","串聯材料、機構、電機與電子工程，讓設計能銜接製造與系統整合。"],["持續驗證","尊重測試條件與數據邊界，透過原型、量測與迭代持續改良。"]].map(([title,description])=><FeatureCard key={title} title={title}><p>{description}</p></FeatureCard>)}</div></Container></section>
 <section><Container className="section-space"><SectionHeader eyebrow="OUR SOLUTIONS" title="兩條產品線，一致的工程承諾。"/><SolutionsGrid/></Container></section>
 <section className="bg-white border-y"><Container className="section-space"><SectionHeader eyebrow="MILESTONES" title="一步一步，累積工程的可能。"/><ol className="grid md:grid-cols-3 gap-6"><li className="feature-card"><p className="eyebrow">2025</p><h3>公司創立與技術研究</h3><p>從校園工程研究出發，以 SSERS 為早期核心技術，推動原型與應用探索。</p></li><li className="feature-card"><p className="eyebrow">2026</p><h3>交流與合作拓展</h3><p>參與 SusHi Tech Tokyo、COMPUTEX / InnoVEX，並通過鴻海專利扶植新創計畫審核。</p><Link className="text-link" href="/news">閱讀原始新聞紀錄 ↗</Link></li><li className="feature-card"><p className="eyebrow">CURRENT DIRECTION</p><h3>平行產品線發展</h3><p>Composita 與 SSERS 分別服務材料與機電能源領域；Composita OS 為開發中的複合材料工程 Agent 平台，以取代 Ansys ACP 工作流程為目標。</p></li></ol></Container></section><LogoMarquee/><CTASection title="Let’s Work Together." description="歡迎工程師、研發團隊與產業夥伴，一起討論值得解決的工程問題."/>
 </>; }
