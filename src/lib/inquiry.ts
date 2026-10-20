export const inquiryTypes = {
  compositera: "CompositeERA — Composite Engineering",
  ssers: "SSERS — Energy Recovery",
  partnership: "Corporate Partnership",
  other: "Other Inquiry",
} as const;
export type InquiryType = keyof typeof inquiryTypes;
export const services = ["複合材料結構設計", "有限元素分析 FEA", "可製造性設計 DFM", "快速打樣"] as const;
export const stages = ["概念階段", "設計階段", "原型開發", "測試驗證", "量產準備"] as const;
export function isInquiryType(value: unknown): value is InquiryType { return typeof value === "string" && Object.hasOwn(inquiryTypes, value); }
export function validateInquiry(value: unknown): string | null {
 if (!value || typeof value !== "object" || Array.isArray(value)) return "請提供有效的詢問資料。";
 const data = value as Record<string, unknown>;
 if (!isInquiryType(data.inquiryType)) return "請選擇詢問類型。";
 const required = ["name","email","projectDescription",...(data.inquiryType==="compositera"?["componentType","developmentStage"]:data.inquiryType==="ssers"?["applicationType","partnershipObjective","technicalRequirements"]:[])];
 if (required.some(key=>typeof data[key]!=="string" || !(data[key] as string).trim())) return "請填寫所有必填欄位。";
 if (typeof data.email!=="string" || data.email.length>254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return "請輸入有效的電子郵件地址。";
 if (Object.values(data).some(v=>typeof v==="string" && v.length>5000)) return "單一欄位請勿超過 5,000 字。";
 if (data.inquiryType==="compositera") {
   if (!stages.includes(data.developmentStage as typeof stages[number])) return "請選擇有效的開發階段。";
   if (!Array.isArray(data.services) || !data.services.length || !data.services.every(v=>services.includes(v))) return "請選擇至少一項需求服務。";
 }
 return null;
}
