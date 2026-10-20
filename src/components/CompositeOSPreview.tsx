"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";

const stages = [
  { id:"A", title:"CAD 準備", group:"準備", action:"理解幾何與工程需求", detail:"上傳 CAD、檢查單位與幾何、確認零件屬性與需求表。", output:"CAD 準備檢查 / 零件屬性 / 需求定義" },
  { id:"B", title:"幾何前處理", group:"準備", action:"整理可分析的幾何", detail:"規劃幾何簡化與前處理，銜接後續模型建立。", output:"幾何處理規劃 / 模型準備" },
  { id:"C", title:"力模擬（等效材料）", group:"分析", action:"探索初步結構反應", detail:"以等效材料進行初步力學評估；此階段可依專案需要跳過。", output:"初步力學評估 / 分析假設" },
  { id:"D", title:"複材建模", group:"分析", action:"建立材料與鋪層", detail:"定義複合材料、鋪層與纖維方向，串聯模型中的工程設定。", output:"材料配置 / 鋪層規劃 / 纖維方向" },
  { id:"E", title:"複材模擬", group:"分析", action:"執行複合材料分析流程", detail:"將複材模型、載荷與邊界條件銜接至分析工作流程。", output:"分析設定 / 結果檢視" },
  { id:"F", title:"失效評估", group:"分析", action:"檢視結構失效風險", detail:"依選定的失效評估方法檢視分析結果，支援設計判斷。", output:"失效評估 / 設計檢視" },
  { id:"G", title:"迭代優化", group:"分析", action:"讓結果回到設計", detail:"根據分析與評估結果調整設計，規劃下一次迭代。", output:"方案比較 / 參數調整 / 迭代紀錄" },
  { id:"H", title:"製造輸出", group:"交付", action:"銜接工程與製造", detail:"整理設計與製造所需資料，讓工程成果可銜接後續流程。", output:"製造資料 / 工程輸出" },
  { id:"I", title:"交付與驗證", group:"交付", action:"整理成果與驗證依據", detail:"彙整交付項目及驗證需求，保留可追溯的工程脈絡。", output:"交付紀錄 / 驗證規劃" },
];

const parameters = [
  { label:"幾何檢查", from:0, to:128, unit:" 個特徵", context:"單位 mm · 公差 0.01 mm" },
  { label:"網格準備", from:0, to:24000, unit:" nodes", context:"目標尺寸 2.0 mm · 品質檢查" },
  { label:"載荷漸增", from:0, to:1500, unit:" N", context:"等效材料 · 固定端約束" },
  { label:"鋪層配置", from:0, to:16, unit:" plies", context:"[0 / +45 / −45 / 90]s · CFRP" },
  { label:"求解步進", from:0, to:100, unit:" %", context:"載荷 1500 N · 16 層複材" },
  { label:"失效檢查", from:0, to:16, unit:" / 16 層", context:"逐層檢視 · 失效準則" },
  { label:"方案迭代", from:0, to:8, unit:" / 8 組", context:"鋪層角度 · 厚度 · 質量" },
  { label:"輸出整理", from:0, to:6, unit:" / 6 項", context:"鋪層表 · 材料清單 · 工程資料" },
  { label:"交付彙整", from:0, to:9, unit:" / 9 項", context:"分析報告 · 版本紀錄 · 驗證規劃" },
];

export function CompositeOSPreview() {
  const [{sequence,phase},setTimeline]=useState({sequence:0,phase:0});
  const progress=phase===2?1:0;
  const root=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const element=root.current;
    if(!element)return;
    const motion=window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible=false;
    let frame=0;
    let elapsed=0;
    let last=0;
    let previousSequence=0;
    let previousPhase=0;
    let previousValue="";
    function animate(now:number) {
      elapsed+=last?now-last:0;
      last=now;
      const sequence=Math.floor(elapsed/6800);
      const local=elapsed%6800;
      const phase=local<1200?0:local<5200?1:2;
      if(sequence!==previousSequence || phase!==previousPhase) {
        previousSequence=sequence;
        previousPhase=phase;
        previousValue="";
        setTimeline({sequence,phase});
      }
      const progress=Math.min(1,Math.max(0,(local-1200)/4000));
      const parameter=parameters[sequence%parameters.length];
      const row=element?.querySelector<HTMLElement>(`[data-job="${sequence}"]`);
      const bar=row?.querySelector<HTMLElement>(".auto-progress>span");
      if(bar)bar.style.transform=`scaleX(${progress})`;
      const value=Math.round(parameter.from+(parameter.to-parameter.from)*progress).toLocaleString("en-US")+parameter.unit;
      if(value!==previousValue) {
        const label=row?.querySelector<HTMLElement>(".auto-parameter b");
        if(label){label.textContent=value;previousValue=value;}
      }
      frame=requestAnimationFrame(animate);
    }
    function sync() {
      cancelAnimationFrame(frame);
      last=0;
      element?.style.setProperty("--agent-play",visible && !document.hidden && !motion.matches?"running":"paused");
      if(visible && !motion.matches && !document.hidden) {
        frame=requestAnimationFrame(animate);
      }
    }
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();},{threshold:.2});
    observer.observe(element);
    motion.addEventListener("change",sync);
    document.addEventListener("visibilitychange",sync);
    return ()=>{observer.disconnect();cancelAnimationFrame(frame);motion.removeEventListener("change",sync);document.removeEventListener("visibilitychange",sync);};
  },[]);
  return <div className="agent-showcase agent-autoplay" ref={root}>
    <div className="agent-intro"><div><p className="eyebrow">COMPOSITEOS / AGENT PLATFORM</p><h3>專注工程設計。<br/>把複材分析流程交給 <strong>Composite OS</strong></h3></div></div>
    <div className="auto-agent-layout">
      <div className="auto-feed" aria-hidden="true">
        {[0,1,2,3,4,5].map(offset=>{
          const job=sequence-offset;
          const index=((job%stages.length)+stages.length)%stages.length;
          const stage=stages[index];
          const parameter=parameters[index];
          const jobPhase=offset===0?phase:2;
          const jobProgress=offset===0?progress:1;
          return <div key={job} data-job={job} className={`auto-job ${offset===0?"current":""}`} style={{"--row":offset} as CSSProperties}>
            <span className="auto-branch">⑂</span>
            <span className="auto-job-title"><strong>{stage.id} / {stage.title}</strong><span>{stage.action}</span>
              <span className="auto-parameter">{parameter.label} <b>{Math.round(parameter.from+(parameter.to-parameter.from)*jobProgress).toLocaleString("en-US")}{parameter.unit}</b><span className="auto-context"> · {parameter.context}</span></span>
            </span>
            <span className="auto-statuses">{["接收","運算","完成"].map((label,step)=><span key={label} className={`auto-job-status ${step===jobPhase?"is-active":""} ${step>jobPhase?"is-pending":""}`}>{step===1 && jobPhase===1?<i/>:<span>{step===2?"✓":step===0?"↑":"↻"}</span>}{label}</span>)}</span>
            <span className="auto-progress"><span style={{transform:`scaleX(${jobProgress})`}}/></span>
          </div>;
        })}
      </div>
    </div>
    <p className="sr-only">規劃流程：{stages.map(stage=>stage.title).join("、")}。</p>
    <p className="agent-positioning">以 Agent 串聯 CAD 準備、複材建模、模擬、失效評估與交付。CompositeOS 是 CompositERA 旗下開發中的平台。</p>
  </div>;
}
