import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { brandName, defaultDescription, siteUrl } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-sans-tc",
  display: "swap",
  preload: false,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "宜智科技 EZeeTech｜先進工程技術與創新研發",
    template: "%s｜宜智科技 EZeeTech",
  },
  description: defaultDescription,
  icons: {
    icon: "/news/EZeeTech.png",
    apple: "/news/EZeeTech.png",
  },
  openGraph: {
    type: "website",
    locale: "zh_TW",
    siteName: "宜智科技 EZeeTech",
    title: "宜智科技 EZeeTech｜先進工程技術與創新研發",
    description:
      "整合複合材料工程、數位模擬、快速打樣與振動能量回收技術，讓創新構想更快走向真實應用。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant-TW">
      <body className={`${inter.variable} ${notoSansTC.variable} min-h-screen flex flex-col w-full min-w-0`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "Organization",
          name: brandName, url: siteUrl, description: defaultDescription,
          logo: `${siteUrl}/news/EZeeTech.png`, email: "info@ezeetech.tw",
          foundingDate: "2025",
          brand: [{ "@type": "Brand", name: "Composita" }, { "@type": "Brand", name: "SSERS" }],
        }).replace(/</g, "\\u003c") }} />
        <a href="#main-content" className="skip-link">
          跳至主要內容
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1 w-full min-w-0" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
