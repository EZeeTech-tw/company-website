import Link from "next/link";
import { Container } from "@/components/Container";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { PageHero } from "@/components/PageHero";
import { SectionHeader, CTASection } from "@/components/SiteSections";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("SSERS｜懸吊式振動能量回收系統", "SSERS 是宜智科技自主研發的懸吊式振動能量回收系統，透過電磁能量轉換與電力管理技術，探索車輛懸吊運動的能源利用方式，提供技術交流、車輛適配評估與 PoC 場域驗證合作。", "/solutions/ssers");

export default function SSERSPage() {
  return (
    <>
      <PageHero variant="energy-hero" eyebrow="SUSPENSION ENERGY RECOVERY SYSTEM" title="SSERS — From Motion to Electricity." description="SSERS 是 EZeeTech 自主研發的懸吊式振動能量回收系統，透過電磁能量轉換、電力電子與系統整合，探索車輛懸吊相對運動中部分機械能的利用方式。" breadcrumb={[{label:"產品與解決方案",href:"/solutions"},{label:"SSERS"}]}>
        <div className="button-row"><Link href="/contact?type=ssers" className="btn btn-primary">洽詢 SSERS 合作 ↗</Link><Link href="#how-it-works" className="btn btn-ghost">了解技術原理</Link></div>
      </PageHero>

      {/* The Opportunity */}
      <section className="w-full bg-white border-t border-slate-200">
        <Container className="section-space">
          <SectionHeader eyebrow="THE OPPORTUNITY" title="Energy Exists Beyond the Battery." description="車輛運行中的振動，也具有能源利用的可能。" />
          <div className="max-w-3xl mx-auto">
            <AnimateOnScroll animation="fade-up">
              <div className="text-slate-600 space-y-4 leading-relaxed">
                <p>
                  當車輛行經不平整路面時，懸吊系統會持續產生相對運動。
                </p>
                <p>
                  傳統避震系統主要透過阻尼作用消散部分機械能，以控制車身振動並維持行駛穩定性。
                </p>
                <p>
                  SSERS 從能源回收的角度重新思考懸吊系統，探索在符合車輛功能與安全需求的前提下，將部分振動機械能轉換為可利用電力的可能。
                </p>
                <p className="text-slate-700 font-medium">
                  我們希望讓能源效率的提升，不只侷限於電池與驅動系統，也能延伸至車輛運行中的其他機械系統。
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="w-full bg-slate-50 border-t border-slate-200">
        <Container className="section-space">
          <SectionHeader eyebrow="HOW IT WORKS" title="From Motion to Electricity." description="從機械運動到電能輸出。" />
          <div className="max-w-4xl mx-auto space-y-6">
            <AnimateOnScroll animation="fade-up" delay={0}>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  01
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">懸吊運動</h3>
                  <p className="text-slate-600 text-sm">
                    車輛行駛過程中，路面激振使車身與車輪之間產生懸吊相對位移與速度。
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={100}>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  02
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">電磁能量轉換</h3>
                  <p className="text-slate-600 text-sm">
                    透過電磁感應機制，將相對機械運動中的部分能量轉換為電能。
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={200}>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  03
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">電力調節</h3>
                  <p className="text-slate-600 text-sm">
                    利用整流及電力轉換電路，調整發電端輸出，使其符合後續負載或儲能系統的需求。
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={300}>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  04
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">能源利用</h3>
                  <p className="text-slate-600 text-sm">
                    依據系統配置，評估將回收電力導入輔助用電、儲能設備或其他合適負載的可行性。
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
          <p className="text-slate-500 text-sm text-center mt-8 italic">
            *實際可回收能量將受車輛類型、道路激振、懸吊參數、安裝配置及電力轉換效率等因素影響。
          </p>
        </Container>
      </section>

      {/* System Development */}
      <section className="w-full bg-white border-t border-slate-200">
        <Container className="section-space">
          <SectionHeader eyebrow="SYSTEM ARCHITECTURE" title="Designed for Real-World Integration." description="以模組化工程思維，探索不同車輛的整合方式。" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <AnimateOnScroll animation="fade-up" delay={0}>
              <div className="feature-card">
                <h3 className="font-semibold text-slate-900 mb-3">外掛式能量回收模組</h3>
                <p className="text-slate-600 text-sm">
                  以獨立模組方式整合於適合的懸吊機構，探索既有車輛導入能量回收功能的可行性。
                </p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={100}>
              <div className="feature-card">
                <h3 className="font-semibold text-slate-900 mb-3">整合式懸吊架構</h3>
                <p className="text-slate-600 text-sm">
                  研究能量轉換機構與懸吊系統整合的設計方式，評估機構配置、安裝空間及系統性能。
                </p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={200}>
              <div className="feature-card">
                <h3 className="font-semibold text-slate-900 mb-3">電力電子整合</h3>
                <p className="text-slate-600 text-sm">
                  針對發電輸出特性，規劃整流、電壓轉換及後端電力管理架構。
                </p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={300}>
              <div className="feature-card">
                <h3 className="font-semibold text-slate-900 mb-3">場域適配設計</h3>
                <p className="text-slate-600 text-sm">
                  依據車輛懸吊結構、行駛條件及電力需求，評估機構安裝、系統配置與驗證方法。
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* Applications */}
      <section className="w-full bg-slate-50 border-t border-slate-200">
        <Container className="section-space">
          <SectionHeader eyebrow="POTENTIAL APPLICATIONS" title="Exploring New Possibilities in Mobility." description="為不同移動載具探索能源回收應用。" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimateOnScroll animation="fade-up" delay={0}>
              <div className="feature-card">
                <h3 className="font-semibold text-slate-900 mb-2">商用車輛</h3>
                <p className="text-slate-600 text-sm">
                  針對巴士及其他商用車的使用條件，評估懸吊運動特性與能源回收模組的整合可能。
                </p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={100}>
              <div className="feature-card">
                <h3 className="font-semibold text-slate-900 mb-2">電動載具</h3>
                <p className="text-slate-600 text-sm">
                  探索能量回收技術與車載電力系統之間的整合方式，作為輔助能源技術的研究方向。
                </p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={200}>
              <div className="feature-card">
                <h3 className="font-semibold text-slate-900 mb-2">車隊營運</h3>
                <p className="text-slate-600 text-sm">
                  透過實際行駛數據與測試分析，評估不同運行場景下的發電表現、技術適用性及維護需求。
                </p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={300}>
              <div className="feature-card">
                <h3 className="font-semibold text-slate-900 mb-2">研發與場域驗證</h3>
                <p className="text-slate-600 text-sm">
                  與產業及研究夥伴合作，建立測試條件、進行技術驗證並持續改良系統設計。
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* Testing & Validation */}
      <section className="w-full bg-white border-t border-slate-200">
        <Container className="section-space">
          <SectionHeader eyebrow="TESTING & VALIDATION" title="Engineering Based on Measurable Results." description="讓技術性能透過數據接受驗證。" />
          <div className="max-w-3xl mx-auto">
            <AnimateOnScroll animation="fade-up">
              <p className="text-slate-600 mb-8 leading-relaxed">
                SSERS 的研發重視工程測試及可量測的技術成果。
                我們透過原型測試、電力輸出量測與場域數據分析，逐步評估系統在不同條件下的性能與整合可行性。
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="feature-card">
                  <h3 className="font-semibold text-slate-900 mb-2">原型測試</h3>
                  <p className="text-slate-600 text-sm">
                    進行機構運作、發電特性與電路功能的初步測試。
                  </p>
                </div>
                <div className="feature-card">
                  <h3 className="font-semibold text-slate-900 mb-2">性能量測</h3>
                  <p className="text-slate-600 text-sm">
                    觀察不同運動條件與電氣負載下的電壓、電流及輸出功率。
                  </p>
                </div>
                <div className="feature-card">
                  <h3 className="font-semibold text-slate-900 mb-2">場域評估</h3>
                  <p className="text-slate-600 text-sm">
                    針對實際車輛或特定運行場景，蒐集數據並分析技術應用條件。
                  </p>
                </div>
                <div className="feature-card">
                  <h3 className="font-semibold text-slate-900 mb-2">系統優化</h3>
                  <p className="text-slate-600 text-sm">
                    根據測試結果持續調整機構、電磁設計與電力轉換架構。
                  </p>
                </div>
              </div>
              <div className="text-center">
                <Link
                  href="/contact?type=ssers"
                  className="btn btn-primary"
                >
                  洽詢技術資料與合作評估
                </Link>
              </div>
              <p className="text-slate-500 text-sm text-center mt-6 italic">
                *部分測試成果及工程資料可依合作需求提供，詳細數據以相應測試條件與正式技術文件為準。
              </p>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* Partnership */}
      <section className="w-full bg-slate-50 border-t border-slate-200">
        <Container className="section-space">
          <SectionHeader eyebrow="PARTNER WITH US" title="Bringing Energy Recovery into Practice." description="與產業夥伴共同推進技術驗證。" />
          <div className="max-w-3xl mx-auto">
            <AnimateOnScroll animation="fade-up">
              <p className="text-slate-600 mb-8 leading-relaxed">
                我們歡迎車輛製造商、商用車營運業者、系統整合商及研究機構共同探索 SSERS 的應用。
                合作形式可包含：
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">技術交流</h3>
                    <p className="text-slate-600 text-sm">
                      了解技術架構、系統限制及潛在應用情境。
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">適配可行性評估</h3>
                    <p className="text-slate-600 text-sm">
                      針對目標車型、懸吊架構與使用需求，討論模組整合條件。
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">概念驗證</h3>
                    <p className="text-slate-600 text-sm">
                      依照雙方確認的測試目標，規劃原型驗證、資料蒐集與性能分析。
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">共同開發</h3>
                    <p className="text-slate-600 text-sm">
                      探索針對特定應用場景的工程優化、系統配置及產業合作機會。
                    </p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      <CTASection title="Let’s Engineer More Efficient Mobility." description="從技術交流到適配評估與概念驗證，探索新的能源應用。" href="/contact?type=ssers" label="洽詢 SSERS 合作" />
    </>
  );
}
