"use client";
import { useText } from "@/i18n/useText";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/PageHero";
export default function NotFound(){
 const t = useText();return <PageHero eyebrow="404 / PAGE NOT FOUND" title={t("找不到這個頁面。")} description={t("頁面可能已搬移，或網址輸入有誤。您可以回到首頁，或探索我們的產品與服務。")}><div className="button-row"><Link className="btn btn-primary" href="/">{t("返回首頁")}</Link><Link className="btn btn-ghost" href="/services">{t("服務與交付")}</Link></div></PageHero>;}
