import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { NewsExplorer } from "@/components/NewsExplorer";
import { getNewsList } from "@/lib/news";
import { pageMetadata } from "@/lib/site";
export const metadata=pageMetadata("最新消息｜企業動態與技術進展","閱讀宜智科技企業動態、產品技術、獎項與合作紀錄，追蹤 CompositERA 與 SSERS 的研發進展。","/news");
export default function NewsPage(){ return <><PageHero eyebrow="NEWS & INSIGHTS" title="Our Journey in Engineering." description="記錄每一步研究、合作與成長。歷史文章保留當時的技術敘事與發布日期。" breadcrumb={[{label:"最新消息"}]}/><section><Container className="section-space"><NewsExplorer items={getNewsList()}/></Container></section></>;}
