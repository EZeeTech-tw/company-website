import { useText } from "@/i18n/useText";
import Image from "next/image";

// Visual bounds remove transparent canvas padding in layout only. Each mark has
// an individual optical size; original artwork and proportions stay intact.
const logos = [
  { src: "/partners/grok-startups.svg", alt: "Grok for Startups", natural: [240,92], bounds: [0,0,240,92], visualWidth: 108, caption: "Startup program" },
  { src: "/news/logo牆/mighty-net-transparent.png", alt: "Mighty Net", natural: [551,453], bounds: [0,0,551,453], visualWidth: 72 },
  { src: "/news/logo牆/4ac45dc8ea1cfe5be7abb4e55fcf9b5a.png", alt: "Foxconn", natural: [1750,402], bounds: [0,0,1750,402], visualWidth: 150 },
  { src: "/news/logo牆/NV_Inception_Program_Logo_NV_Inception_Logo_H_CMYK-1080x662-1-e1724183249153.webp", alt: "NVIDIA Inception Program", natural: [1080,458], bounds: [91,75,926,322], visualWidth: 140 },
  { src: "/news/logo牆/channels4_profile-removebg-preview.png", alt: "Partner logo", natural: [500,500], bounds: [134,87,253,331], visualWidth: 45 },
  { src: "/news/logo牆/images-removebg-preview.png", alt: "Tamsui River Ferry", natural: [637,276], bounds: [200,38,236,188], visualWidth: 70 },
  { src: "/news/logo牆/images-removebg-preview (1).png", alt: "StarFab", natural: [569,351], bounds: [76,81,413,190], visualWidth: 125 },
  { src: "/news/logo牆/images2-removebg-preview.png", alt: "Southern Taiwan Science Park", natural: [525,96], bounds: [0,0,525,96], visualWidth: 180 },
];

export function LogoMarquee() {
 const t = useText();
  return (
    <section className="w-full bg-slate-950 overflow-hidden" aria-labelledby="partners-heading">
      <div className="py-8 md:py-12">
        <h2 id="partners-heading" className="text-center text-white text-xl md:text-2xl font-bold mb-8">{t("合作夥伴與戰略聯盟")}</h2>
        <div className="logo-track flex items-center whitespace-nowrap" aria-label={t("合作夥伴列表")}>
          {[...logos, ...logos].map((logo, index) => {
            const scale = logo.visualWidth / logo.bounds[2];
            return <div key={`${logo.src}-${index}`} className="partner-item" aria-hidden={index >= logos.length}>
              <span className="partner-mark" style={{ width: logo.visualWidth, height: logo.bounds[3] * scale }}>
                <Image src={logo.src} alt={index < logos.length ? logo.alt : ""}
                  width={logo.natural[0]} height={logo.natural[1]} unoptimized
                  style={{ width: logo.natural[0] * scale, height: logo.natural[1] * scale, left: -logo.bounds[0] * scale, top: -logo.bounds[1] * scale }} />
              </span>
              {logo.caption && <span className="text-xs font-medium leading-relaxed text-slate-300"><span className="block text-[10px] text-slate-400">for</span><span className="block">{logo.caption}</span></span>}
            </div>;
          })}
        </div>
      </div>
    </section>
  );
}
