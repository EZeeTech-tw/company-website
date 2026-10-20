import Image from "next/image";

const logos = [
  { src: "/news/logo牆/4ac45dc8ea1cfe5be7abb4e55fcf9b5a.png", alt: "合作夥伴標誌", width: 120, height: 60 },
  { src: "/news/logo牆/NV_Inception_Program_Logo_NV_Inception_Logo_H_CMYK-1080x662-1-e1724183249153.webp", alt: "NVIDIA Inception Program", width: 140, height: 60 },
  { src: "/news/logo牆/channels4_profile-removebg-preview.png", alt: "合作夥伴標誌", width: 100, height: 60 },
  { src: "/news/logo牆/images-removebg-preview.png", alt: "合作夥伴標誌", width: 130, height: 60 },
  { src: "/news/logo牆/images-removebg-preview (1).png", alt: "合作夥伴標誌", width: 110, height: 60 },
  { src: "/news/logo牆/images2-removebg-preview.png", alt: "合作夥伴標誌", width: 125, height: 60 },
];

export function LogoMarquee() {
  return (
    <section className="w-full bg-slate-950 overflow-hidden" aria-labelledby="partners-heading">
      <div className="py-8 md:py-12">
        <h2 id="partners-heading" className="text-center text-white text-xl md:text-2xl font-bold mb-8">
          合作夥伴與戰略聯盟
        </h2>
        <div className="logo-track flex items-center whitespace-nowrap" aria-label="合作夥伴列表">
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={`${logo.src}-${index}`}
              className="flex-shrink-0 flex items-center justify-center"
              style={{ width: `${logo.width}px` }}
              aria-hidden={index >= logos.length}
            >
              <Image
                src={logo.src}
                alt={index < logos.length ? logo.alt : ""}
                width={logo.width}
                height={logo.height}
                sizes={`${logo.width}px`}
                unoptimized
                className="object-contain opacity-80 hover:opacity-100 transition-opacity filter brightness-0 invert"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
