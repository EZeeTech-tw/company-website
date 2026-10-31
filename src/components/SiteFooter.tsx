import { useText } from "@/i18n/useText";
import { Link } from "@/i18n/navigation";
import { Container } from "./Container";
import { brandName, solutions } from "@/lib/site";
export function SiteFooter() {
 const t = useText();
 return <footer className="site-footer"><Container className="section-space"><div className="footer-grid">
 <div><p className="footer-brand">{t(brandName)}</p><p>Advanced Engineering Technology Company</p><p className="mt-4">Engineering Ideas. Delivering Impact.</p><p>{t("工程驅動創新，技術創造價值。")}</p></div>
 <nav aria-label={t("頁尾網站導覽")}><h2>{t("探索宜智")}</h2><Link href="/about">{t("關於我們")}</Link><Link href="/technology">{t("工程能力")}</Link><Link href="/insights">{t("工程知識")}</Link><Link href="/news">{t("最新消息")}</Link><Link href="/contact">{t("聯絡我們")}</Link></nav>
 <nav aria-label={t("產品線導覽")}><h2>{t("兩大產品線")}</h2>{solutions.map(s => <Link href={`/solutions/${s.id}`} key={s.id}>{s.name}</Link>)}<a href="mailto:info@ezeetech.tw">info@ezeetech.tw</a></nav>
 </div><div className="footer-bottom"><span>© {new Date().getFullYear()} EZeeTech Co., Ltd. All rights reserved.</span><span>Advanced Engineering Technologies</span></div></Container></footer>;
}
