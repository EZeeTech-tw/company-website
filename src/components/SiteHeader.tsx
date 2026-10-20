"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Container } from "./Container";
const links = [["/", "首頁"], ["/solutions", "產品與解決方案"], ["/about", "關於我們"], ["/news", "最新消息"], ["/contact", "聯絡我們"]] as const;
export function SiteHeader() {
 const pathname = usePathname();
 const [openFor, setOpenFor] = useState<string | null>(null);
 const isOpen = openFor === pathname;
 const toggleRef = useRef<HTMLButtonElement>(null);
 return <header className="site-header" onKeyDown={e => { if (e.key === "Escape") { setOpenFor(null); toggleRef.current?.focus(); } }}>
 <Container><nav className="main-nav" aria-label="主要導覽">
 <Link href="/" aria-label="EZeeTech 宜智科技首頁" onClick={() => setOpenFor(null)} className="brand-logo"><Image src="/news/EZeeTech logo_未去背 (1).png" alt="EZeeTech" width={210} height={40} priority unoptimized /></Link>
 <button ref={toggleRef} className="menu-toggle" aria-expanded={isOpen} aria-controls="site-navigation" aria-label={isOpen ? "關閉導覽選單" : "開啟導覽選單"} onClick={() => setOpenFor(isOpen ? null : pathname)}><span aria-hidden="true">{isOpen ? "✕" : "☰"}</span><span>選單</span></button>
 <ul id="site-navigation" className={`nav-links ${isOpen ? "is-open" : ""}`}>{links.map(([href, label]) => <li key={href}><Link href={href} onClick={() => setOpenFor(null)} aria-current={(href === "/" ? pathname === "/" : pathname.startsWith(href)) ? "page" : undefined}>{label}</Link></li>)}</ul>
 </nav></Container></header>;
}
