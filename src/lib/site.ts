import type { Metadata } from "next";
export const siteUrl = "https://www.ezeetech.tw";
export const brandName = "EZeeTech｜宜智科技股份有限公司";
export const defaultDescription = "EZeeTech 宜智科技為先進工程技術公司，以 CompositERA 提供複合材料設計、FEA、DFM 與快速打樣，以 SSERS 研發懸吊式振動能量回收技術。";
export function pageMetadata(title: string, description: string, path: string): Metadata {
  return { title: { absolute: `${title}｜EZeeTech 宜智科技` }, description, alternates: { canonical: path },
    openGraph: { title, description, url: path, type: "website", siteName: brandName, locale: "zh_TW", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "EZeeTech — Advanced Engineering Technologies" }] },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] } };
}
export const solutions = [
  { id: "compositera", name: "CompositERA", english: "Advanced Composite Engineering", title: "從構想到製造，加速複合材料研發。", description: "結合複合材料結構設計、有限元素分析（FEA）、可製造性設計（DFM）與快速打樣，協助無人機、機器人及硬體研發團隊開發輕量化結構。", tags: ["Carbon Fiber", "CAD / FEA", "UAV & Robotics"] },
  { id: "ssers", name: "SSERS", english: "Suspension Energy Recovery System", title: "重新思考振動能量的利用方式。", description: "透過電磁能量轉換、電力電子與系統整合，研究將懸吊運動中的部分機械能轉換為電能，探索車輛與其他移動載具的能源應用。", tags: ["Suspension", "Power Electronics", "Prototype Testing"] },
] as const;
