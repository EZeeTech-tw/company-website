import Image from 'next/image';
import {setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Container} from '@/components/Container';
import {PageHero} from '@/components/PageHero';
import {insights,insightCopy} from '@/lib/insights';
import {pageMetadata} from '@/lib/metadata';
type Props={params:Promise<{locale:string}>};
export async function generateMetadata({params}:Props){const {locale}=await params;setRequestLocale(locale);return pageMetadata(locale==='en'?'Engineering Insights | Composite Design & Analysis':'工程知識｜複合材料設計與分析',locale==='en'?'Practical guides to composite materials, layup design, FEA, UAV and robotic structures, and engineering automation.':'從碳纖維選材、鋪層與 FEA，到無人機、機器人與分析自動化，探索複合材料工程的設計方法。','/insights');}
export default async function InsightsPage({params}:Props){const {locale}=await params;setRequestLocale(locale);const en=locale==='en';return <>
<PageHero eyebrow="ENGINEERING INSIGHTS" title={en?'Better questions. Better engineering.':'從工程問題，找到設計方向。'} description={en?'Practical guides to materials, structural analysis and composite development.':'從選材到驗證，拆解複合材料研發的關鍵問題。'} breadcrumb={[{label:en?'Engineering Insights':'工程知識'}]}/>
<Container className="section-space"><p className="eyebrow mb-8">{en?'8 GUIDES / MATERIALS · SIMULATION · APPLICATIONS':'8 篇指南 / 材料 · 模擬 · 應用'}</p><div className="grid md:grid-cols-2 gap-6">{insights.map((article,index)=>{const copy=insightCopy(article,locale);return <Link href={`/insights/${article.slug}`} key={article.slug} className="feature-card insight-card"><Image className="insight-thumbnail" src={`/insights/${article.slug}.svg`} alt="" width={1200} height={640} unoptimized/><div className="flex items-center justify-between gap-4"><span className="eyebrow">{article.category}</span><span className="text-slate-400" aria-hidden="true">{String(index+1).padStart(2,'0')}</span></div><h2 className="mt-5 text-2xl font-semibold leading-snug">{copy.title}</h2><p className="mt-4 text-slate-600 leading-relaxed">{copy.summary}</p><span className="text-link mt-6 inline-block">{en?'Read guide ↗':'閱讀指南 ↗'}</span></Link>;})}</div></Container>
</>;}
