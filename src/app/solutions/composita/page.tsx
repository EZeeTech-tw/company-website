import Link from "next/link";
import { ApplicationPhoto } from "@/components/ApplicationPhoto";
import { CompositeOSPreview } from "@/components/CompositeOSPreview";
import { Container } from "@/components/Container";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { PageHero } from "@/components/PageHero";
import { SectionHeader, CTASection } from "@/components/SiteSections";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Composita｜複合材料設計、FEA 分析與快速打樣", "Composita 提供複合材料結構設計、有限元素分析 FEA、可製造性設計 DFM 及快速打樣對接服務，協助無人機、機器人及硬體新創進行輕量化零件開發，並持續開發 Composita OS 數位化研發平台。", "/solutions/composita");

export default function ProductPage() {
  return (
    <>
      <PageHero variant="hero-carbon" eyebrow="ADVANCED COMPOSITE ENGINEERING" title="Composita — From Concept to Composite." description="Composita 是 EZeeTech 旗下的先進複合材料工程產品線，結合結構設計、FEA、DFM 與快速打樣資源，協助無人機、機器人及硬體研發團隊開發可分析、可製造、可驗證的輕量化零件。" breadcrumb={[{label:"產品與解決方案",href:"/solutions"},{label:"Composita"}]}>
        <div className="button-row"><Link href="/contact?type=composita" className="btn btn-primary">討論您的開發需求 ↗</Link><Link href="#services" className="btn btn-ghost">了解服務內容</Link></div>
      </PageHero>

      {/* The Challenge */}
      <section className="w-full bg-white border-t border-slate-200">
        <Container className="section-space">
          <SectionHeader eyebrow="THE CHALLENGE" title="Advanced Materials. Complex Development." description="複合材料帶來設計自由，也帶來工程挑戰。" />
          <div className="max-w-3xl mx-auto">
            <AnimateOnScroll animation="fade-up">
              <p className="text-slate-600 mb-8 leading-relaxed">
                在無人機、機器人與新世代硬體產品中，重量、剛性與結構可靠性直接影響產品性能。
                然而，對仍處於研發與快速迭代階段的團隊而言，導入複合材料往往面臨多項挑戰。
              </p>
              <div className="space-y-6">
                <div className="feature-card">
                  <h3 className="font-semibold text-slate-900 mb-2">缺乏專業工程資源</h3>
                  <p className="text-slate-600 text-sm">
                    複合材料設計涉及材料方向性、鋪層規劃、結構分析及製程條件，可能超出一般機構設計團隊的專業範圍。
                  </p>
                </div>
                <div className="feature-card">
                  <h3 className="font-semibold text-slate-900 mb-2">設計與製造難以銜接</h3>
                  <p className="text-slate-600 text-sm">
                    即使完成初步 CAD 設計，也需要進一步評估材料、鋪層與製程限制，才能推進實際製造。
                  </p>
                </div>
                <div className="feature-card">
                  <h3 className="font-semibold text-slate-900 mb-2">開發與驗證需要反覆迭代</h3>
                  <p className="text-slate-600 text-sm">
                    從設計、分析、打樣到測試，每一次修改都可能涉及不同工程資源，增加專案溝通與協調成本。
                  </p>
                </div>
                <div className="feature-card">
                  <h3 className="font-semibold text-slate-900 mb-2">開發需求尚未形成大量訂單</h3>
                  <p className="text-slate-600 text-sm">
                    對早期新創而言，可能只需要少量原型或單一結構件，卻仍需要完整的工程支援。
                  </p>
                </div>
              </div>
              <p className="text-slate-700 font-medium mt-8 text-center">
                Composita 致力於讓專業複合材料工程資源更容易被新創與硬體研發團隊取得。
              </p>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* Our Services */}
      <section id="services" className="w-full bg-slate-50 border-t border-slate-200">
        <Container className="section-space">
          <SectionHeader eyebrow="OUR CAPABILITIES" title="One Partner. From Design to Prototype." description="一站式複合材料開發服務。" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <AnimateOnScroll animation="fade-up" delay={0}>
              <div className="feature-card">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">複合材料結構設計</h3>
                <p className="text-slate-600 text-sm mb-4">
                  依據零件功能、載荷條件、幾何限制及重量目標，提供複合材料結構設計與初步材料配置建議。
                </p>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li>• 複合材料零件結構設計</li>
                  <li>• CAD 幾何建模與修改</li>
                  <li>• 材料及鋪層方案評估</li>
                  <li>• 輕量化結構設計建議</li>
                </ul>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={100}>
              <div className="feature-card">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">有限元素與結構分析</h3>
                <p className="text-slate-600 text-sm mb-4">
                  運用有限元素分析工具，評估設計方案在指定載荷與邊界條件下的結構反應，支援設計比較及優化決策。
                </p>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li>• 有限元素模型建立</li>
                  <li>• 應力與變形分析</li>
                  <li>• 複合材料鋪層設計評估</li>
                  <li>• 不同結構方案比較</li>
                </ul>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={200}>
              <div className="feature-card">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">可製造性設計</h3>
                <p className="text-slate-600 text-sm mb-4">
                  在開發階段考量複合材料製程、幾何特徵、裝配需求與材料限制，降低設計與製造之間的落差。
                </p>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li>• DFM 可製造性評估</li>
                  <li>• 零件幾何與結構調整</li>
                  <li>• 製程選擇與限制評估</li>
                  <li>• 裝配介面及固定方式建議</li>
                </ul>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={300}>
              <div className="feature-card">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">打樣與製造對接</h3>
                <p className="text-slate-600 text-sm mb-4">
                  依據產品開發階段與零件需求，協助規劃打樣方案，並對接合適的製造資源。
                </p>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li>• 原型打樣需求評估</li>
                  <li>• 製造資源協調與對接</li>
                  <li>• 零件規格與圖面整理</li>
                  <li>• 原型修改與設計迭代支援</li>
                </ul>
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* Applications */}
      <section className="w-full bg-white border-t border-slate-200">
        <Container className="section-space">
          <SectionHeader eyebrow="BUILT FOR DEVELOPERS" title="Designed for the Next Generation of Hardware." description="為不斷迭代的硬體團隊而設計。" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimateOnScroll animation="fade-up" delay={0}>
              <div className="feature-card application-card">
                <ApplicationPhoto kind="drone"/>
                <h3 className="font-semibold text-slate-900 mb-2">無人機與無人載具</h3>
                <p className="text-slate-600 text-sm">
                  針對機體結構、設備托架、背板及其他承載零件，探索重量、結構剛性與製造可行性之間的平衡。
                </p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={100}>
              <div className="feature-card application-card">
                <ApplicationPhoto kind="robotics"/>
                <h3 className="font-semibold text-slate-900 mb-2">機器人</h3>
                <p className="text-slate-600 text-sm">
                  支援機器人機構支架、外殼、承載零件及其他結構件的材料選擇、設計與分析。
                </p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={200}>
              <div className="feature-card application-card">
                <ApplicationPhoto kind="autonomous"/>
                <h3 className="font-semibold text-slate-900 mb-2">自主系統</h3>
                <p className="text-slate-600 text-sm">
                  協助自主移動平台及相關硬體設備，評估複合材料在輕量化與結構設計方面的應用可能。
                </p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={300}>
              <div className="feature-card application-card">
                <ApplicationPhoto kind="research"/>
                <h3 className="font-semibold text-slate-900 mb-2">研發團隊與早期新創</h3>
                <p className="text-slate-600 text-sm">
                  適合仍在產品設計、原型開發與功能驗證階段，需要外部複合材料工程資源的團隊。
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* How We Work */}
      <section className="w-full bg-slate-50 border-t border-slate-200">
        <Container className="section-space">
          <SectionHeader eyebrow="OUR PROCESS" title="A Simpler Path to Composite Development." description="讓複雜的複材工程流程，更容易開始。" />
          <div className="max-w-4xl mx-auto space-y-6">
            <AnimateOnScroll animation="fade-up" delay={0}>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  01
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">需求確認</h3>
                  <p className="text-slate-600 text-sm">
                    了解產品用途、設計限制、載荷需求、重量目標與開發階段。
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
                  <h3 className="font-semibold text-slate-900 mb-2">工程設計</h3>
                  <p className="text-slate-600 text-sm">
                    依據需求規劃結構方案、材料選擇與初步設計方向。
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
                  <h3 className="font-semibold text-slate-900 mb-2">模擬分析</h3>
                  <p className="text-slate-600 text-sm">
                    透過工程分析評估指定工況下的結構表現，提供設計比較與改善建議。
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
                  <h3 className="font-semibold text-slate-900 mb-2">製造與打樣</h3>
                  <p className="text-slate-600 text-sm">
                    依據設計需求與製程可行性，協調原型製造及相關工程資源。
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={400}>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  05
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">驗證與迭代</h3>
                  <p className="text-slate-600 text-sm">
                    根據原型測試結果與設計回饋，協助調整下一版本的開發方案。
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
          <p className="text-slate-500 text-sm text-center mt-8 italic">
            *實際服務範圍、交付項目與測試方式，將依專案需求及雙方確認的合作內容而定。
          </p>
        </Container>
      </section>

      <section id="compositeos"><Container className="section-space"><CompositeOSPreview/></Container></section>

      <CTASection title="Let’s Build Your Next Composite." description="從零件設計、模擬到打樣驗證，一起討論適合您開發階段的工程方案。" href="/contact?type=composita" label="洽詢 Composita 合作" />
    </>
  );
}
