import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {Link} from '@/i18n/navigation';
import {Container} from '@/components/Container';
import {PageHero} from '@/components/PageHero';
import {insights,getInsight,insightCopy} from '@/lib/insights';
import {pageMetadata} from '@/lib/metadata';
import {siteUrl} from '@/lib/site';
import Image from 'next/image';
type Props={params:Promise<{locale:string;slug:string}>};
export const dynamic='error';
export function generateStaticParams(){return insights.map(({slug})=>({slug}));}
export async function generateMetadata({params}:Props){const {locale,slug}=await params;setRequestLocale(locale);const article=getInsight(slug);if(!article)notFound();const copy=insightCopy(article,locale);const meta=await pageMetadata(copy.title,copy.summary,`/insights/${slug}`);return {...meta,openGraph:{...meta.openGraph,type:'article',publishedTime:article.date}};}
export default async function InsightPage({params}:Props){const {locale,slug}=await params;setRequestLocale(locale);const article=getInsight(slug);if(!article)notFound();const en=locale==='en';const copy=insightCopy(article,locale);const label=en?'Engineering Insights':'工程知識';const url=`${siteUrl}${en?'/en':''}/insights/${slug}`;const related=article.related.map(getInsight).filter(a=>a!==undefined);return <>
<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@graph':[{'@type':'BlogPosting',headline:copy.title,description:copy.summary,datePublished:article.date,inLanguage:en?'en':'zh-Hant',mainEntityOfPage:url,url,author:{'@type':'Organization',name:'EZeeTech',url:siteUrl},publisher:{'@type':'Organization',name:'EZeeTech',url:siteUrl}}, {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:en?'Home':'首頁',item:siteUrl+(en?'/en':'/')},{'@type':'ListItem',position:2,name:label,item:siteUrl+(en?'/en':'')+'/insights'},{'@type':'ListItem',position:3,name:copy.title,item:url}]}]}).replace(/</g,'\\u003c')}}/>
<PageHero eyebrow={article.category} title={copy.title} description={copy.summary} breadcrumb={[{label,href:'/insights'},{label:copy.title}]}/>
<Container className="section-space insight-layout"><aside><nav aria-labelledby="insight-toc-heading" className="insight-toc"><h2 id="insight-toc-heading" className="insight-toc-title">{en?'On this page':'文章目錄'}</h2><ol>{copy.sections.map((section,index)=><li key={section.title}><a href={`#section-${index+1}`}>{section.title}</a></li>)}</ol></nav></aside><article className="insight-body" lang={en?'en':'zh-Hant'}><div className="insight-author"><span className="insight-author-label">{en?'Author':'作者'}</span><span className="insight-author-name">EZeeTech</span></div>
<figure className="insight-figure"><Image src={`/insights/${article.slug}.svg`} alt={en?`Concept diagram: ${copy.title}`:`工程示意圖：${copy.title}`} width={1200} height={640} unoptimized/></figure>
{copy.sections.map((section,index)=><section key={section.title} id={`section-${index+1}`}><h2>{section.title}</h2>{section.paragraphs.map(p=><p key={p}>{p}</p>)}{section.checklist&&<ul>{section.checklist.map(item=><li key={item}>{item}</li>)}</ul>}</section>)}
<section className="insight-references"><h2>{en?'References & further reading':'參考資料與延伸閱讀'}</h2><ul>{article.references.map(ref=><li key={ref.url}><a href={ref.url} target="_blank" rel="noopener noreferrer">{ref.title} ↗</a></li>)}</ul></section>
<section className="feature-card"><h2>{en?'Bring your engineering question.':'把你的工程問題帶給我們。'}</h2><p>{en?'Discuss material selection, structural design and analysis for your component with Composita.':'與 Composita 討論零件的材料選擇、結構設計與分析需求。'}</p><div className="button-row"><Link className="btn btn-primary" href="/contact?type=composita">{en?'Discuss your project':'討論工程需求'}</Link><Link className="text-link" href="/solutions/composita">{en?'Explore Composita ↗':'認識 Composita ↗'}</Link></div></section>
<section><h2>{en?'Related guides':'相關閱讀'}</h2><div className="grid sm:grid-cols-2 gap-4">{related.map(item=><Link className="feature-card text-link" href={`/insights/${item.slug}`} key={item.slug}>{insightCopy(item,locale).title} ↗</Link>)}</div><Link href="/insights" className="text-link mt-8 inline-block">{en?'← All engineering insights':'← 全部工程知識'}</Link></section>
</article></Container></>;}
