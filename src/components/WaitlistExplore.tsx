"use client";
import { useState } from 'react';
import { useLocale } from 'next-intl';
const paths = [
  { name:['UAV & hardware teams','無人機與硬體團隊'], title:['Less time reconnecting engineering inputs.','少一點重複整理工程輸入。'], input:['Part geometry, interfaces and load cases','零件幾何、裝配介面與載荷工況'], focus:['Keep material, layup and simulation assumptions connected as a design evolves.','在設計迭代時，讓材料、鋪層與模擬假設保持連貫。'], output:['A traceable workflow to review with your engineering team.','可與工程團隊共同檢閱、追蹤的工作流程。'] },
  { name:['Composite engineers','複材工程師'], title:['Keep the layup definition in view.','讓鋪層定義清楚可見。'], input:['Material data, ply directions and modeling conventions','材料資料、纖維方向與建模慣例'], focus:['Explore connected ply definitions, simulation setup and result review.','探索鋪層定義、模擬設定與結果檢閱的串聯。'], output:['Clearer context for checking inputs and discussing design changes.','更清楚地查核輸入與討論設計修改。'] },
  { name:['R&D leads','研發負責人'], title:['Make the handoff easier to follow.','讓工程交接更容易追蹤。'], input:['Project scope, revisions and review requirements','專案範圍、版本與審查需求'], focus:['Follow how assumptions and engineering information move between stages.','追蹤不同階段之間的假設與工程資訊。'], output:['A shared basis for review and the next development step.','建立共同審查依據，規劃下一個開發步驟。'] },
];
export function WaitlistExplore() {
 const l=useLocale()==='en'?0:1;
 const [selected,setSelected]=useState(0);
 const item=paths[selected];
 const faqs=l===0?[
  ['Is Composita OS available now?','The platform is in development. The waitlist is for product progress and early access announcements; available features and timing will be confirmed as development progresses.'],
  ['What happens after I join?','Your registration is sent to the EZeeTech team. We will contact your registered Gmail with product and access updates. Joining does not guarantee an invitation or a launch date.'],
  ['Do I need to upload CAD or material data?','No. This form only asks for Gmail and notification consent. No files, account or password are required.'],
  ['Can I discuss an engineering project today?','Yes. Composita engineering services cover project-specific design, analysis and manufacturing coordination. Contact the team to agree the scope and deliverables.'],
 ]:[
  ['Composita OS 現在可以使用嗎？','平台正在開發中。候補名單用於產品進展與搶先體驗通知，可體驗功能與時間將隨研發進度確認。'],
  ['登記後會發生什麼事？','登記會送至 EZeeTech 團隊，我們會透過你留下的 Gmail 發送產品與體驗通知。登記不代表保證取得邀請或特定上線日期。'],
  ['需要上傳 CAD 或材料資料嗎？','不需要。此表單只需要 Gmail 與通知同意，不需要檔案、帳號或密碼。'],
  ['現在有工程專案，可以先討論嗎？','可以。Composita 工程服務支援專案所需的設計、分析與製造對接，可與團隊討論範圍及交付內容。'],
 ];
 return <div className="waitlist-explore">
  <section className="waitlist-fit" aria-labelledby="waitlist-fit-heading"><p className="eyebrow">BUILT AROUND YOUR WORKFLOW</p><h2 id="waitlist-fit-heading">{l===0?'Where would you start?':'你想從哪裡開始？'}</h2><p>{l===0?'Choose your perspective to explore the product direction.':'選擇你的工作角色，看看產品開發方向。'}</p>
   <div className="waitlist-personas" role="group" aria-label={l===0?'Your engineering role':'你的工程角色'}>{paths.map((p,i)=><button type="button" key={i} aria-pressed={selected===i} aria-controls="waitlist-fit-detail" onClick={()=>setSelected(i)}>{p.name[l]}<span aria-hidden="true">↗</span></button>)}</div>
   <div className="waitlist-fit-detail" id="waitlist-fit-detail" aria-live="polite"><div><span className="waitlist-fit-number" aria-hidden="true">0{selected+1}</span><h3>{item.title[l]}</h3><p>{item.focus[l]}</p><a href="#waitlist-signup" className="text-link">{l===0?'Join the waitlist ↑':'加入候補名單 ↑'}</a></div><dl><div><dt>{l===0?'YOUR STARTING POINT':'你的起點'}</dt><dd>{item.input[l]}</dd></div><div><dt>{l===0?'THE DEVELOPMENT GOAL':'開發目標'}</dt><dd>{item.output[l]}</dd></div></dl></div>
  </section>
  <section className="waitlist-next" aria-labelledby="waitlist-next-heading"><p className="eyebrow">AFTER YOU JOIN</p><h2 id="waitlist-next-heading">{l===0?'A simple next step.':'下一步，很簡單。'}</h2><ol>{(l===0?[
   ['Leave your Gmail','One email address and your permission to receive updates.'],['Follow the progress','Receive product development and early access announcements.'],['Explore access when announced','Review the available scope and invitation details when we share them.'],
  ]:[['留下 Gmail','一個信箱，加上你同意接收通知。'],['關注產品進展','接收研發進度與搶先體驗公告。'],['開放時了解體驗內容','收到通知後，檢視可用功能與邀請資訊。']]).map(([title,description],i)=><li key={title}><span aria-hidden="true">0{i+1}</span><h3>{title}</h3><p>{description}</p></li>)}</ol></section>
  <section className="waitlist-faq" aria-labelledby="waitlist-faq-heading"><div><p className="eyebrow">A FEW ANSWERS</p><h2 id="waitlist-faq-heading">{l===0?'Before you join.':'登記前，你可能想知道。'}</h2></div><div>{faqs.map(([q,a])=><details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></section>
 </div>;
}
