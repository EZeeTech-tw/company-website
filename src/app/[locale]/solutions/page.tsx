import { setRequestLocale } from "next-intl/server";
import { getText } from "@/i18n/server";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { SolutionsGrid, CTASection, SectionHeader } from "@/components/SiteSections";
import { pageMetadata } from "@/lib/metadata";
export async function generateMetadata({params}: {params: Promise<{locale:string}>}) { setRequestLocale((await params).locale); return pageMetadata("產品與解決方案", "探索 Composita 複合材料工程，從需求釐清、結構設計、分析到打樣對接，建立清楚的工程開發與交付路徑。", "/solutions"); }
export default async function SolutionsPage({params}: {params: Promise<{locale:string}>}) {
 setRequestLocale((await params).locale);
 const t = await getText(); return <><PageHero eyebrow="OUR SOLUTIONS" title="Composite Engineering. From Concept to Delivery." description={t("以複合材料結構設計、分析與製造銜接，協助研發團隊推進輕量化零件開發。")} breadcrumb={[{label:t("產品與解決方案")}]}/><section><Container className="section-space"><SectionHeader eyebrow="ENGINEERING PORTFOLIO" title={t("找到適合您的工程方案。")} description={t("Composita 串聯材料選擇、結構設計、FEA、DFM 與打樣對接；Composita OS 持續探索工程流程自動化。")}/><SolutionsGrid/></Container></section><CTASection/></>; }
