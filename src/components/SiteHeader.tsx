"use client";
import { useText } from "@/i18n/useText";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from './LanguageSwitcher';
import { useRef, useState } from "react";
import { Container } from "./Container";
const links = [["/", "首頁"], ["/solutions", "產品與解決方案"], ["/about", "關於我們"], ["/news", "最新消息"], ["/contact", "聯絡我們"]] as const;
export function SiteHeader() {
 const t = useText();
 const pathname = usePathname();
 const [openFor, setOpenFor] = useState<string | null>(null);
 const isOpen = openFor === pathname;
 const toggleRef = useRef<HTMLButtonElement>(null);
 return <header className="site-header" onKeyDown={e => { if (e.key === "Escape") { setOpenFor(null); toggleRef.current?.focus(); } }}>
 <Container><nav className="main-nav" aria-label={t("主要導覽")}>
 <Link href="/" aria-label={t("EZeeTech 宜智科技首頁")} onClick={() => setOpenFor(null)} className="brand-logo"><Image src="/news/EZeeTech logo_未去背 (1).png" alt="EZeeTech" width={210} height={40} priority unoptimized /></Link>
 <button ref={toggleRef} className="menu-toggle" aria-expanded={isOpen} aria-controls="site-navigation" aria-label={isOpen ? t("關閉導覽選單") : t("開啟導覽選單")} onClick={() => setOpenFor(isOpen ? null : pathname)}><span aria-hidden="true">{isOpen ? "✕" : "☰"}</span><span>{t("選單")}</span></button>
 <ul id="site-navigation" className={`nav-links ${isOpen ? "is-open" : ""}`}>{links.map(([href, label]) => <li key={href}><Link href={href} onClick={() => setOpenFor(null)} aria-current={(href === "/" ? pathname === "/" : pathname.startsWith(href)) ? "page" : undefined}>{t(label)}</Link></li>)}</ul>
 <LanguageSwitcher />
 </nav></Container></header>;
}
