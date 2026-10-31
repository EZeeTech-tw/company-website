import { getText } from "@/i18n/server";
import { getLocale } from 'next-intl/server';
import { Container } from "@/components/Container";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { pageMetadata } from "@/lib/metadata";
import { isInquiryType } from "@/lib/inquiry";

export async function generateMetadata() { return pageMetadata("聯絡我們｜工程需求與合作詢問", "無論您正在開發複合材料零件、尋找專業工程研發資源，或希望探索懸吊能量回收技術的合作可能，歡迎與宜智科技聯繫。", "/contact"); }

export default async function ContactPage({ searchParams }: { searchParams: Promise<{type?:string}> }) {
 const t = await getText();
 const locale = await getLocale();
 const {type}=await searchParams;
  return (
    <>
      <PageHero eyebrow="CONTACT US" title="Let’s Start with Your Challenge." description={t("選擇您關注的產品線或合作方向，讓我們了解您的工程需求。")} breadcrumb={[{label:t("聯絡我們")}]}/>

      {/* Contact Form */}
      <section className="w-full bg-white border-t border-slate-200">
        <Container className="section-space">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 min-w-0">
            <div className="lg:col-span-2 feature-card">
              <AnimateOnScroll animation="fade-up">
                <ContactForm initialType={isInquiryType(type)?type:"composita"} />
              </AnimateOnScroll>
            </div>

            <div className="border-t lg:border-t-0 lg:border-l border-slate-200 pt-8 lg:pt-0 lg:pl-8 space-y-8">
              <AnimateOnScroll animation="fade-up">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">{t("聯絡信箱")}</h3>
                  <a
                    href="mailto:info@ezeetech.tw"
                    className="text-blue-600 hover:underline font-medium break-all"
                  >
                    info@ezeetech.tw
                  </a>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{t("台北辦公室")}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{t("11010 臺北市信義區基隆路1段143號11樓之3")}</p>
                  {locale === 'zh' && <p className="text-slate-500 text-xs mt-1">
                    11F-3, No. 143, Sec. 1, Keelung Rd., Xinyi Dist., Taipei City 11010, Taiwan (R.O.C.)
                  </p>}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{t("桃園辦公室")}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{t("320071 桃園市中壢區新中北路499號324室")}</p>
                  {locale === 'zh' && <p className="text-slate-500 text-xs mt-1">
                    Room 324, No 499 Xingzhong N. Rd., Zhongli Dist., Taoyuan City, 320071, Taiwan (R.O.C.)
                  </p>}
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
