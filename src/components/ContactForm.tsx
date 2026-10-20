"use client";
import { useState, type FormEvent } from "react";
import { inquiryTypes, isInquiryType, services, stages, validateInquiry, type InquiryType } from "@/lib/inquiry";
function Field({ name, label, required = false, multiline = false, type = "text", autoComplete }: { name: string; label: string; required?: boolean; multiline?: boolean; type?: string; autoComplete?: string }) {
 return <div><label htmlFor={name}>{label}{required?" *":""}</label>{multiline?<textarea id={name} name={name} rows={4} required={required} maxLength={5000}/>:<input id={name} name={name} type={type} required={required} maxLength={type==="email"?254:200} autoComplete={autoComplete}/>}</div>;
}
export function ContactForm({ initialType = "compositera" }: { initialType?: InquiryType }) {
 const [inquiryType,setInquiryType]=useState<InquiryType>(initialType);
 const [busy,setBusy]=useState(false);
 const [status,setStatus]=useState<{success:boolean;text:string}|null>(null);
 async function submit(event:FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const form=event.currentTarget, fields=new FormData(form);
  const payload={...Object.fromEntries(fields),services:fields.getAll("services")};
  const validation=validateInquiry(payload);
  if(validation){setStatus({success:false,text:validation});return;}
  setBusy(true);setStatus(null);
  try {
   const response=await fetch("/api/send-email",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
   const result=await response.json();
   if(!response.ok || !result.success) throw new Error(result.error || "目前無法送出，請稍後重試或寄信至 info@ezeetech.tw。");
   setStatus({success:true,text:"您的詢問已交由郵件服務送出，我們將透過您提供的 Email 聯繫。"});
   form.reset();
  } catch(error){setStatus({success:false,text:error instanceof Error?error.message:"目前無法送出，請稍後重試。"});}
  finally{setBusy(false);}
 }
 return <form className="contact-form" onSubmit={submit} aria-busy={busy}>
 <p className="text-sm text-slate-600">* 為必填欄位。請先提供非機密的需求摘要；送出資料僅供回覆本次詢問。</p>
 <div><label htmlFor="inquiryType">Inquiry Type / 詢問類型 *</label><select id="inquiryType" name="inquiryType" value={inquiryType} onChange={e=>{if(isInquiryType(e.target.value)){setInquiryType(e.target.value);setStatus(null);}}}>{Object.entries(inquiryTypes).map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></div>
 <div className="grid sm:grid-cols-2 gap-6"><Field name="name" label="姓名" required autoComplete="name"/><Field name="company" label="公司 / 組織" autoComplete="organization"/></div>
 <Field name="email" label="Email" type="email" required autoComplete="email"/>
 <div className="form-details" key={inquiryType}>
 <Field name="projectDescription" label={inquiryType==="compositera"?"Project Description / 專案描述":"詢問內容 / Project Description"} required multiline/>
 {inquiryType==="compositera" && <>
 <Field name="componentType" label="Component Type / 零件類型" required/>
 <fieldset><legend>Required Services / 需求服務 *</legend>{services.map(service=><label className="checkbox-label" key={service}><input type="checkbox" name="services" value={service}/>{service}</label>)}</fieldset>
 <div><label htmlFor="developmentStage">Development Stage / 開發階段 *</label><select id="developmentStage" name="developmentStage" required defaultValue=""><option value="" disabled>請選擇開發階段</option>{stages.map(stage=><option key={stage}>{stage}</option>)}</select></div>
 </>}
 {inquiryType==="ssers" && <><Field name="applicationType" label="Vehicle / Application Type / 車輛或應用類型" required/><Field name="partnershipObjective" label="Partnership Objective / 合作目標" required multiline/><Field name="technicalRequirements" label="Technical Requirements / 技術需求" required multiline/></>}
 </div>
 <Field name="additionalInfo" label="其他資訊" multiline/>
 <div className="hidden" aria-hidden="true"><label htmlFor="website">Website</label><input name="website" id="website" tabIndex={-1} autoComplete="off"/></div>
 <button type="submit" className="btn btn-primary" disabled={busy}>{busy?"送出中…":"送出詢問 ↗"}</button>
 <p className="text-sm text-slate-600">也可直接來信 <a className="text-link" href="mailto:info@ezeetech.tw">info@ezeetech.tw</a>。</p>
 {status && <div role={status.success?"status":"alert"} className={status.success?"status-success":"status-error"}>{status.text}</div>}
 </form>;
}
