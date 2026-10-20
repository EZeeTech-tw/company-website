import Link from "next/link";
import { PageHero } from "@/components/PageHero";
export default function NotFound(){return <PageHero eyebrow="404 / PAGE NOT FOUND" title="找不到這個頁面。" description="頁面可能已搬移，或網址輸入有誤。您可以回到首頁，或探索我們的兩大產品線。"><div className="button-row"><Link className="btn btn-primary" href="/">返回首頁</Link><Link className="btn btn-ghost" href="/solutions">探索解決方案</Link></div></PageHero>;}
