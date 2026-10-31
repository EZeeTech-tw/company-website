import type { Metadata } from "next";
import PublicLayout from '../[locale]/layout';
import { siteUrl } from '@/lib/site';
export const metadata:Metadata={metadataBase:new URL(siteUrl),title:"管理後台",robots:{index:false,follow:false}};
export default function AdminLayout({children}:{children:React.ReactNode}){return <PublicLayout params={Promise.resolve({locale:'zh'})}>{children}</PublicLayout>;}
