"use client";
import { useState } from 'react';
import { ProductVideoPreview } from './ProductVideoPreview';
import { useLocale } from 'next-intl';

const stages = [
  { clip: 'composita-layup' as const, label: 'LAYUP', title: ['From geometry to layup.', '從幾何到鋪層。'], detail: ['Explore a workflow for checking geometry and defining engineering inputs before composite modeling.', '探索幾何檢查與工程輸入整理，為複材建模做好準備。'], tags: ['Geometry', 'Load cases', 'Interfaces'] },
  { clip: 'composita-analysis' as const, label: 'ANALYSIS', title: ['Inspect the analysis workflow.', '檢視分析流程。'], detail: ['Our development focus includes material definitions, layup modeling and coordinated simulation steps.', '開發重點包含材料定義、鋪層建模，以及模擬步驟的串聯。'], tags: ['Materials', 'Layup', 'Simulation'] },
  { clip: 'composita-manufacturing' as const, label: 'HANDOFF', title: ['Connect the next stage.', '串聯下一階段。'], detail: ['Bring assumptions, results and failure assessments into a workflow engineers can review.', '將分析假設、結果與失效評估，整理成工程師可檢閱的流程。'], tags: ['Assumptions', 'Results', 'Assessment'] },
];
export function WaitlistWorkflow() {
  const [active, setActive] = useState(0);
  const language = useLocale() === 'en' ? 0 : 1;
  const stage = stages[active];
  return <div className="waitlist-workflow waitlist-workflow-console">
    <div className="waitlist-console-bar"><span><i aria-hidden="true"/> COMPOSITA OS</span><span>{language === 0 ? 'PRODUCT FILM / PREVIEW' : '產品影片 / 預覽'}</span></div>
    <div className="waitlist-workflow-controls" role="group" aria-label={language === 0 ? 'Explore the planned workflow' : '探索規劃中的流程'}>{stages.map((item, index) => <button key={item.label} type="button" aria-pressed={active === index} aria-controls="waitlist-workflow-detail" onClick={() => setActive(index)}><span>0{index + 1}</span>{item.label}</button>)}</div>
    <div className="waitlist-console-video"><ProductVideoPreview key={stage.clip} clip={stage.clip} label={stage.title[language]}/><span className="waitlist-console-index" aria-hidden="true">0{active+1} / 03</span></div>
    <div id="waitlist-workflow-detail" className="waitlist-workflow-detail" aria-live="polite"><h2>{stage.title[language]}</h2><p>{stage.detail[language]}</p><div>{stage.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
  </div>;
}
