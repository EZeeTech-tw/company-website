import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { SolutionsGrid, CTASection, SectionHeader } from "@/components/SiteSections";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata("產品與解決方案", "探索 CompositERA 複合材料工程與 SSERS 懸吊式振動能量回收兩條平行產品線，從設計、分析到驗證，提供不同的工程技術方案。", "/solutions");
export default function SolutionsPage() { return <><PageHero eyebrow="OUR SOLUTIONS" title="Two Technologies. One Vision." description="先進複合材料與振動能量回收。不同的技術方向，共同的工程精神。" breadcrumb={[{label:"產品與解決方案"}]}/><section><Container className="section-space"><SectionHeader eyebrow="ENGINEERING PORTFOLIO" title="找到適合您的工程方案。" description="CompositERA 聚焦材料與結構開發；SSERS 聚焦機電能源系統。兩條產品線共享設計、模擬與驗證能力。"/><SolutionsGrid/></Container></section><CTASection/></>; }
