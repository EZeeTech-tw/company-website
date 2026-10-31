import { setRequestLocale } from "next-intl/server";
import { getText } from "@/i18n/server";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { SectionHeader, FeatureCard, SolutionsGrid, CTASection } from "@/components/SiteSections";
import { pageMetadata } from "@/lib/metadata";
export async function generateMetadata({params}: {params: Promise<{locale:string}>}) { setRequestLocale((await params).locale); return pageMetadata("工程能力｜設計、模擬與驗證", "宜智科技整合工程設計、數位模擬、原型測試與系統整合，支援 Composita 複合材料開發與 SSERS 懸吊能量回收研發。", "/technology"); }
export default async function TechnologyPage({params}: {params: Promise<{locale:string}>}) {
 setRequestLocale((await params).locale);
 const t = await getText();return <><PageHero title="Engineering with Evidence." eyebrow="OUR ENGINEERING CAPABILITIES" description={t("以需求為起點、以可量測的結果為依據，建立能從構想走向應用的工程流程。")} breadcrumb={[{label:t("工程能力")}]}/><section><Container className="section-space"><SectionHeader eyebrow="DESIGN · SIMULATE · VALIDATE" title={t("讓設計、製造與驗證相互銜接。")}/><div className="grid md:grid-cols-2 gap-6">{[[t("系統級設計"),t("從實際使用條件定義功能、介面與限制，建立可分階段驗證的工程方案。")],[t("數位模擬與分析"),t("依據材料、載荷與邊界條件分析結構或系統反應，支援不同方案的比較。")],[t("原型測試與數據驗證"),t("規劃測試條件、蒐集運作數據，區分模擬預測與實際量測結果。")],[t("協作與整合"),t("從概念驗證階段與合作夥伴討論整合條件，以模組化思維支援後續調整。")]].map(([title,description])=><FeatureCard key={title} title={title}><p>{description}</p></FeatureCard>)}</div></Container></section><section className="bg-white border-y"><Container className="section-space"><SectionHeader eyebrow="APPLIED ENGINEERING" title={t("共同能力，不同技術方向。")}/><SolutionsGrid/></Container></section><CTASection/></>;}
