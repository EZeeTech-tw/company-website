"use client";
import { useState } from 'react';
import { useLocale } from 'next-intl';

const stages = [
  { label: 'CAD', title: ['Prepare the geometry.', '準備幾何模型。'], detail: ['Explore a workflow for checking geometry and defining engineering inputs before composite modeling.', '探索幾何檢查與工程輸入整理，為複材建模做好準備。'], tags: ['Geometry', 'Load cases', 'Interfaces'] },
  { label: 'ANALYSIS', title: ['Build the composite model.', '建立複材模型。'], detail: ['Our development focus includes material definitions, layup modeling and coordinated simulation steps.', '開發重點包含材料定義、鋪層建模，以及模擬步驟的串聯。'], tags: ['Materials', 'Layup', 'Simulation'] },
  { label: 'REVIEW', title: ['Review engineering results.', '檢閱工程結果。'], detail: ['Bring assumptions, results and failure assessments into a workflow engineers can review.', '將分析假設、結果與失效評估，整理成工程師可檢閱的流程。'], tags: ['Assumptions', 'Results', 'Assessment'] },
];
export function WaitlistWorkflow() {
  const [active, setActive] = useState(0);
  const language = useLocale() === 'en' ? 0 : 1;
  const stage = stages[active];
  return <div className="waitlist-workflow">
    <div className="waitlist-workflow-controls" role="group" aria-label={language === 0 ? 'Explore the planned workflow' : '探索規劃中的流程'}>{stages.map((item, index) => <button key={item.label} type="button" aria-pressed={active === index} aria-controls="waitlist-workflow-detail" onClick={() => setActive(index)}><span>0{index + 1}</span>{item.label}</button>)}</div>
    <div id="waitlist-workflow-detail" className="waitlist-workflow-detail" aria-live="polite"><h2>{stage.title[language]}</h2><p>{stage.detail[language]}</p><div>{stage.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
  </div>;
}
