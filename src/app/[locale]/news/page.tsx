import { setRequestLocale } from "next-intl/server";
import { getText } from "@/i18n/server";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { NewsExplorer } from "@/components/NewsExplorer";
import { getNewsList } from "@/lib/news";
import { pageMetadata } from "@/lib/metadata";
export async function generateMetadata({params}: {params: Promise<{locale:string}>}) { setRequestLocale((await params).locale); return pageMetadata("最新消息｜企業動態與技術進展","閱讀宜智科技企業動態、產品技術、獎項與合作紀錄，追蹤 Composita 與 SSERS 的研發進展。","/news"); }
export default async function NewsPage({params}: {params: Promise<{locale:string}>}) {
 setRequestLocale((await params).locale);
 const t = await getText(); return <><PageHero eyebrow="NEWS & INSIGHTS" title="Our Journey in Engineering." description={t("記錄每一步研究、合作與成長。歷史文章保留當時的技術敘事與發布日期。")} breadcrumb={[{label:t("最新消息")}]}/><section><Container className="section-space"><NewsExplorer items={getNewsList()}/></Container></section></>;}
