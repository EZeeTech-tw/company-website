import Image from 'next/image';
import {setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Container} from '@/components/Container';
import {PageHero} from '@/components/PageHero';
import {pageMetadata} from '@/lib/metadata';
import {siteUrl} from '@/lib/site';

type Props={params:Promise<{locale:string}>};
export const dynamic='error';
export async function generateMetadata({params}:Props){
 const {locale}=await params;setRequestLocale(locale);
 return pageMetadata(locale==='en'?'Engineering Services & Deliverables | Composita':'工程服務與交付流程｜Composita',locale==='en'?'Understand what you can commission, the information to prepare, agreed engineering deliverables and the review process from inquiry to handoff.':'了解 Composita 的複合材料設計、FEA 與可製造性服務，以及需求準備、範圍確認、分階段審查與工程交付流程。','/services');
}
export default async function ServicesPage({params}:Props){
 const {locale}=await params;setRequestLocale(locale);const en=locale==='en';
 const services=en?[
  {id:'01',title:'Requirements & feasibility',when:'You have a component or concept, but the material choice or next engineering step is still unclear.',work:'Review function, loads, interfaces, candidate materials and available manufacturing routes.',outputs:['Requirements and assumptions summary','Data-gap list and technical risks','Recommended scope for the next stage']},
  {id:'02',title:'Structural design & FEA',when:'You need to compare structural concepts or evaluate a defined component under specified conditions.',work:'Develop geometry and layup concepts, build an appropriate model and compare the agreed load cases.',outputs:['Agreed CAD or geometry revisions','Material, layup and load-case definitions','Analysis report with assumptions, findings and recommendations']},
  {id:'03',title:'DFM & prototype coordination',when:'A design needs to connect with a practical process, supplier or prototype plan.',work:'Review geometry, layup access, interfaces and process constraints, then coordinate the agreed manufacturing resources.',outputs:['Manufacturability review and proposed changes','Agreed drawings, layup or production data','Prototype and inspection plan for the next development stage']}
 ]:[
  {id:'01',title:'需求釐清與可行性評估',when:'已有零件或構想，希望釐清材料選擇、技術限制與下一步開發方向。',work:'盤點功能、載荷、接口、候選材料與可用製程，找出需要先確認的工程問題。',outputs:['需求與假設整理','資料缺口與技術風險清單','下一階段工作範圍建議']},
  {id:'02',title:'結構設計與有限元素分析',when:'需要比較結構方案，或評估指定零件在明確工況下的結構反應。',work:'規劃幾何與鋪層方案、建立適當分析模型，依約定工況進行比較與判讀。',outputs:['約定範圍的 CAD 或幾何修改資料','材料、鋪層與載荷條件定義','包含假設、結果與改善建議的分析報告']},
  {id:'03',title:'可製造性評估與打樣對接',when:'已有設計，需要銜接製程、製造資源或原型製作規劃。',work:'檢查幾何、鋪放空間、裝配接口與製程限制，並協調約定的製造資源。',outputs:['可製造性檢查與設計調整建議','約定的圖面、鋪層或製造資料','下一階段的打樣與檢查規劃']}
 ];
 const steps=en?[
  {title:'Share the requirement',input:'Component purpose, current constraints, available CAD or drawings and target schedule.',output:'A shared understanding of the objective and a list of information still needed.',review:'Confirm the decision the engineering work must support.'},
  {title:'Agree the scope',input:'Confirmed requirements, candidate materials and the planned manufacturing route.',output:'A proposal defining work items, deliverables, file formats, milestones and review rounds.',review:'Confirm the quotation, acceptance criteria, responsibilities and data-use arrangements before work begins.'},
  {title:'Review each stage',input:'The agreed information and feedback on interim designs or analysis.',output:'Stage-specific concepts, models, findings or manufacturing recommendations.',review:'Review assumptions and findings at milestones; record the impact of changes to loads, geometry or scope.'},
  {title:'Deliver & plan the next step',input:'Review decisions and the information needed for the agreed handoff.',output:'The agreed engineering files, reports, revision records and recommended next actions.',review:'Check the handoff against the agreed deliverable list and identify any further prototype or test work.'}
 ]:[
  {title:'提出需求',input:'零件用途、目前限制、現有 CAD 或圖面，以及目標時程。',output:'共同確認的工程目標，以及尚待補充的資料清單。',review:'先確認這次工作需要協助哪一項設計決策。'},
  {title:'確認範圍',input:'已確認的需求、候選材料與預計製造方式。',output:'載明工作項目、交付內容、檔案格式、里程碑與審查次數的合作提案。',review:'開始執行前，確認報價、驗收條件、雙方分工及資料使用約定。'},
  {title:'分階段執行與審查',input:'約定的工程資料，以及對階段設計或分析結果的回饋。',output:'各階段的設計方案、模型、分析結果或製造建議。',review:'在里程碑確認假設與結果；載荷、幾何或範圍變更時，一併記錄影響。'},
  {title:'交付與下一步規劃',input:'審查結論，以及完成約定交付所需的資料。',output:'約定的工程檔案、報告、版本紀錄與下一步建議。',review:'依交付清單逐項確認，並釐清後續打樣或試驗需求。'}
 ];
 const preparation=en?['Component purpose and operating environment','CAD, drawings or key dimensions and revision','Load directions, magnitudes and mounting interfaces','Mass, displacement or functional targets','Candidate materials and manufacturing constraints','Target schedule, quantity and current development stage']:['零件用途與使用環境','CAD、圖面或關鍵尺寸，以及目前版本','載荷方向、大小與安裝接口','重量、變形或功能目標','候選材料與製造限制','目標時程、數量與目前開發階段'];
 const faqs=en?[
  ['Can we start without a complete CAD model?','Yes. An initial discussion can start with the component purpose, dimensions, photographs and the questions you need to resolve. Detailed design or analysis will require the necessary geometry and engineering inputs.'],
  ['Are testing and prototype manufacturing included?','They are scoped separately according to the project. Confirm whether coupons, third-party testing, tooling, materials and prototype production are included in the quotation, along with costs and responsibilities.'],
  ['What file formats and source models will we receive?','Agree these before work begins. The deliverable list should identify reports, CAD, drawings, layup information and any analysis source files, together with formats, revisions and permitted use.'],
  ['How are price and schedule determined?','They depend on geometry, data readiness, load cases, design options, review rounds and manufacturing or testing needs. The proposal establishes the actual scope, milestones and quotation.']
 ]:[
  ['沒有完整 CAD，也能開始討論嗎？','可以先從用途、尺寸、照片與待解決問題開始釐清需求；進入詳細設計或分析時，仍需備齊必要的幾何與工程條件。'],
  ['報價會包含打樣與實體測試嗎？','依專案分別確認。試片、第三方測試、模具、材料與樣品製作是否納入，會在報價中約定費用與雙方分工。'],
  ['會交付哪些檔案？包含原始模型嗎？','開始執行前確認。交付清單會列明報告、CAD、圖面、鋪層資料及是否包含分析原始檔，並確認檔案格式、版本與使用範圍。'],
  ['費用與時程怎麼決定？','依零件複雜度、資料完整度、工況數、設計方案、審查次數，以及製造與測試需求評估，並在合作提案中確認範圍、里程碑與報價。']
 ];
 return <>
 <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'Service',name:en?'Composita composite engineering services':'Composita 複合材料工程服務',serviceType:en?'Composite structural design, finite element analysis and design for manufacturing':'複合材料結構設計、有限元素分析與可製造性評估',url:`${siteUrl}${en?'/en':''}/services`,provider:{'@type':'Organization',name:'EZeeTech',url:siteUrl}}).replace(/</g,'\u003c')}}/>
 <PageHero eyebrow="SERVICES & DELIVERABLES" title={en?'Clear scope. Reviewable deliverables.':'把需求說清楚，讓交付有依據。'} description={en?'Composita connects material selection, structural design, FEA and prototype coordination. Start with the engineering decision you need to make.':'Composita 串聯選材、結構設計、FEA 與打樣對接。從你要解決的工程問題開始，確認適合的工作範圍與交付內容。'} breadcrumb={[{label:en?'Services & Deliverables':'服務與交付'}]}><div className="button-row"><Link href="/contact?type=composita" className="btn btn-primary">{en?'Discuss your requirement ↗':'討論工程需求 ↗'}</Link><a className="btn btn-ghost" href="#deliverables">{en?'Explore deliverables':'查看交付內容'}</a></div></PageHero>
 <nav className="service-anchor-nav" aria-label={en?'Service page sections':'服務頁面章節'}><Container><a href="#deliverables">{en?'What you can commission':'服務與交付'}</a><a href="#process">{en?'How we work':'合作流程'}</a><a href="#prepare">{en?'What to prepare':'需求準備'}</a><a href="#questions">{en?'Common questions':'常見問題'}</a></Container></nav>
 <section id="deliverables"><Container className="section-space"><div className="service-intro"><div><p className="eyebrow">WHAT YOU CAN COMMISSION</p><h2>{en?'Choose the work your project needs.':'依開發階段，選擇需要的工程工作。'}</h2><p>{en?'Commission a defined stage or connect several stages into a development scope. Agree the deliverables and acceptance conditions before execution.':'可針對單一階段委託，也可依需求串聯多個階段。執行前共同確認工作範圍、交付清單與驗收條件。'}</p></div><Image src="/insights/outsourcing-composite-engineering.svg" alt={en?'Project requirements connect to engineering work and deliverables.':'從需求資料、工程處理到交付成果的三段流程。'} width={1200} height={640} unoptimized/></div>
 <div className="service-packages">{services.map(service=><article className="service-package" key={service.id}><div className="service-package-heading"><span className="eyebrow">{service.id}</span><h3>{service.title}</h3></div><dl><div><dt>{en?'When it fits':'適合情境'}</dt><dd>{service.when}</dd></div><div><dt>{en?'What we do':'工作內容'}</dt><dd>{service.work}</dd></div><div><dt>{en?'Deliverables to agree':'約定交付'}</dt><dd><ul>{service.outputs.map(output=><li key={output}>{output}</li>)}</ul></dd></div></dl></article>)}</div></Container></section>
 <section id="process" className="bg-white border-y"><Container className="section-space"><p className="eyebrow">HOW WE WORK</p><h2 className="service-section-title">{en?'Four stages. Clear decisions at each.':'四個階段，每一步都有確認點。'}</h2><ol className="service-steps">{steps.map((step,index)=><li key={step.title}><span className="service-step-number" aria-hidden="true">{String(index+1).padStart(2,'0')}</span><div><h3>{step.title}</h3><dl><div><dt>{en?'You provide':'您提供'}</dt><dd>{step.input}</dd></div><div><dt>{en?'We deliver':'我們交付'}</dt><dd>{step.output}</dd></div><div><dt>{en?'Review point':'確認點'}</dt><dd>{step.review}</dd></div></dl></div></li>)}</ol></Container></section>
 <section id="prepare"><Container className="section-space service-preparation"><div><p className="eyebrow">START WITH A BRIEF</p><h2 className="service-section-title">{en?'Bring what you have. Identify what is missing.':'整理手上的資料，釐清還缺什麼。'}</h2><p className="text-slate-600">{en?'For a first inquiry, describe the component, your biggest constraint and the information available. We can then discuss what is needed to define the scope.':'第一次詢問時，先說明零件用途、目前最大的限制與現有資料，便能開始討論適合的工作範圍。'}</p><div className="button-row"><Link href="/contact?type=composita" className="btn btn-primary">{en?'Send an inquiry':'提出需求'}</Link><Link href="/insights/outsourcing-composite-engineering" className="text-link">{en?'Read the preparation guide ↗':'閱讀委外準備指南 ↗'}</Link></div></div><ul className="service-checklist">{preparation.map(item=><li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul></Container></section>
 <section id="questions" className="bg-white border-y"><Container className="section-space"><p className="eyebrow">BEFORE WE START</p><h2 className="service-section-title">{en?'Agree the essentials first.':'合作前，先確認這些事。'}</h2><div className="service-questions">{faqs.map(([question,answer])=><details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div><div className="mt-10"><Link href="/solutions/composita" className="text-link">{en?'Explore Composita capabilities ↗':'了解 Composita 工程能力 ↗'}</Link></div></Container></section>
 </>;
}
