import type { ReactNode } from "react";
import { Container } from "./Container";
import { Breadcrumb } from "./SiteSections";
import { HeroGlow } from "./HeroGlow";
export function PageHero({ title, description, eyebrow = "ADVANCED ENGINEERING TECHNOLOGIES", children, breadcrumb, variant = "" }: {
 title: string; description?: ReactNode; eyebrow?: string; children?: ReactNode;
 breadcrumb?: { label: string; href?: string }[]; variant?: string;
}) {
 return <section className={`page-hero ${variant}`}>{variant.split(" ").includes("home-hero") && <HeroGlow/>}<Container className="relative z-10">
 {breadcrumb && <Breadcrumb items={breadcrumb} />}<p className="eyebrow">{eyebrow}</p><h1>{title}</h1>
 {description && <div className="hero-description">{description}</div>}{children}</Container></section>;
}
