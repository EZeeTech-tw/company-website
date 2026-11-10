import { setRequestLocale } from "next-intl/server";
import { getText } from "@/i18n/server";
import { Link } from "@/i18n/navigation";
import { ProductVideoPreview } from "@/components/ProductVideoPreview";
import { ApplicationPhoto } from "@/components/ApplicationPhoto";
import { CompositeOSPreview } from "@/components/CompositeOSPreview";
import { Container } from "@/components/Container";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { PageHero } from "@/components/PageHero";
import { SectionHeader, CTASection } from "@/components/SiteSections";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({params}: {params: Promise<{locale:string}>}) { setRequestLocale((await params).locale); return pageMetadata("Composita｜複合材料設計、FEA 分析與快速打樣", "Composita 提供複合材料結構設計、有限元素分析 FEA、可製造性設計 DFM 及快速打樣對接服務，協助無人機、機器人及硬體新創進行輕量化零件開發，並持續開發 Composita OS 數位化研發平台。", "/solutions/composita"); }

export default async function ProductPage({params}: {params: Promise<{locale:string}>}) {
 setRequestLocale((await params).locale);
 const t = await getText();
 const en = (await params).locale === "en";
  return (
    <>
      <PageHero variant="hero-carbon" eyebrow="ADVANCED COMPOSITE ENGINEERING" title="Composita — From Concept to Composite." description={t("Composita 是 EZeeTech 旗下的先進複合材料工程產品線，結合結構設計、FEA、DFM 與快速打樣資源，協助無人機、機器人及硬體研發團隊開發可分析、可製造、可驗證的輕量化零件。")} breadcrumb={[{label:"Composita"}]}>
        <div className="button-row"><Link href="/contact?type=composita" className="btn btn-primary">{t("討論您的開發需求 ↗")}</Link><Link href="/services" className="btn btn-ghost">{t("了解服務內容")}</Link></div>
      </PageHero>

      <section className="composita-film-section" aria-labelledby="composita-film-heading"><Container className="section-space">
        <div className="section-heading"><p className="eyebrow">COMPOSITA OS / WORKFLOW IN MOTION</p><h2 id="composita-film-heading">{en ? 'See composite engineering take shape.' : '看見複材工程的每一步。'}</h2><p className="section-description">{en ? 'Three moments from our product film: layup modeling, analysis review and manufacturing planning.' : '從產品影片看三個環節：鋪層建模、分析檢閱與製造規劃。'}</p></div>
        <div className="composita-film-grid">{([
          { clip:'composita-layup', title:en?'Define the layup.':'定義鋪層。', description:en?'See the geometry and ply definitions together in the composite modeling interface.':'在複材建模介面中，同時檢視零件幾何與鋪層定義。', tag:'01 / LAYUP MODELING' },
          { clip:'composita-analysis', title:en?'Inspect the response.':'檢閱結構反應。', description:en?'Explore the film’s analysis visualization and result review interface.':'觀看影片中的分析視覺化與結果檢閱介面。', tag:'02 / ANALYSIS REVIEW' },
          { clip:'composita-manufacturing', title:en?'Plan the next step.':'規劃下一步。', description:en?'Connect the design conversation with manufacturing considerations and planning.':'將設計討論延伸至製造考量與後續規劃。', tag:'03 / MANUFACTURING' },
        ] as const).map(item=><article className="composita-film-card" key={item.clip}><ProductVideoPreview clip={item.clip} label={item.title}/><div className="composita-film-copy"><p className="eyebrow">{item.tag}</p><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</div>
        <div className="composita-film-footer"><p>{en?'From the Composita OS product film · Platform in development.':'擷取自 Composita OS 產品影片 · 平台持續開發中。'}</p><Link className="text-link" href="/waitlist">{en?'Join the early access waitlist ↗':'加入搶先體驗候補名單 ↗'}</Link></div>
      </Container></section>

      {/* The Challenge */}
      <section className="w-full bg-white border-t border-slate-200">
        <Container className="section-space">
          <SectionHeader eyebrow="THE CHALLENGE" title="Advanced Materials. Complex Development." description={t("複合材料帶來設計自由，也帶來工程挑戰。")} />
          <div className="max-w-3xl mx-auto">
            <AnimateOnScroll animation="fade-up">
              <p className="text-slate-600 mb-8 leading-relaxed">{t("在無人機、機器人與新世代硬體產品中，重量、剛性與結構可靠性直接影響產品性能。 然而，對仍處於研發與快速迭代階段的團隊而言，導入複合材料往往面臨多項挑戰。")}</p>
              <div className="space-y-6">
                <div className="feature-card">
                  <h3 className="font-semibold text-slate-900 mb-2">{t("缺乏專業工程資源")}</h3>
                  <p className="text-slate-600 text-sm">{t("複合材料設計涉及材料方向性、鋪層規劃、結構分析及製程條件，可能超出一般機構設計團隊的專業範圍。")}</p>
                </div>
                <div className="feature-card">
                  <h3 className="font-semibold text-slate-900 mb-2">{t("設計與製造難以銜接")}</h3>
                  <p className="text-slate-600 text-sm">{t("即使完成初步 CAD 設計，也需要進一步評估材料、鋪層與製程限制，才能推進實際製造。")}</p>
                </div>
                <div className="feature-card">
                  <h3 className="font-semibold text-slate-900 mb-2">{t("開發與驗證需要反覆迭代")}</h3>
                  <p className="text-slate-600 text-sm">{t("從設計、分析、打樣到測試，每一次修改都可能涉及不同工程資源，增加專案溝通與協調成本。")}</p>
                </div>
                <div className="feature-card">
                  <h3 className="font-semibold text-slate-900 mb-2">{t("開發需求尚未形成大量訂單")}</h3>
                  <p className="text-slate-600 text-sm">{t("對早期新創而言，可能只需要少量原型或單一結構件，卻仍需要完整的工程支援。")}</p>
                </div>
              </div>
              <p className="text-slate-700 font-medium mt-8 text-center">{t("Composita 致力於讓專業複合材料工程資源更容易被新創與硬體研發團隊取得。")}</p>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* Our Services */}
      <section id="services" className="w-full bg-slate-50 border-t border-slate-200">
        <Container className="section-space">
          <SectionHeader eyebrow="OUR CAPABILITIES" title="One Partner. From Design to Prototype." description={t("一站式複合材料開發服務。")} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <AnimateOnScroll animation="fade-up" delay={0}>
              <div className="feature-card">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">{t("複合材料結構設計")}</h3>
                <p className="text-slate-600 text-sm mb-4">{t("依據零件功能、載荷條件、幾何限制及重量目標，提供複合材料結構設計與初步材料配置建議。")}</p>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li>{t("• 複合材料零件結構設計")}</li>
                  <li>{t("• CAD 幾何建模與修改")}</li>
                  <li>{t("• 材料及鋪層方案評估")}</li>
                  <li>{t("• 輕量化結構設計建議")}</li>
                </ul>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={100}>
              <div className="feature-card">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">{t("有限元素與結構分析")}</h3>
                <p className="text-slate-600 text-sm mb-4">{t("運用有限元素分析工具，評估設計方案在指定載荷與邊界條件下的結構反應，支援設計比較及優化決策。")}</p>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li>{t("• 有限元素模型建立")}</li>
                  <li>{t("• 應力與變形分析")}</li>
                  <li>{t("• 複合材料鋪層設計評估")}</li>
                  <li>{t("• 不同結構方案比較")}</li>
                </ul>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={200}>
              <div className="feature-card">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">{t("可製造性設計")}</h3>
                <p className="text-slate-600 text-sm mb-4">{t("在開發階段考量複合材料製程、幾何特徵、裝配需求與材料限制，降低設計與製造之間的落差。")}</p>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li>{t("• DFM 可製造性評估")}</li>
                  <li>{t("• 零件幾何與結構調整")}</li>
                  <li>{t("• 製程選擇與限制評估")}</li>
                  <li>{t("• 裝配介面及固定方式建議")}</li>
                </ul>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={300}>
              <div className="feature-card">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">{t("打樣與製造對接")}</h3>
                <p className="text-slate-600 text-sm mb-4">{t("依據產品開發階段與零件需求，協助規劃打樣方案，並對接合適的製造資源。")}</p>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li>{t("• 原型打樣需求評估")}</li>
                  <li>{t("• 製造資源協調與對接")}</li>
                  <li>{t("• 零件規格與圖面整理")}</li>
                  <li>{t("• 原型修改與設計迭代支援")}</li>
                </ul>
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* Applications */}
      <section className="w-full bg-white border-t border-slate-200">
        <Container className="section-space">
          <SectionHeader eyebrow="BUILT FOR DEVELOPERS" title="Designed for the Next Generation of Hardware." description={t("為不斷迭代的硬體團隊而設計。")} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimateOnScroll animation="fade-up" delay={0}>
              <div className="feature-card application-card">
                <ApplicationPhoto kind="drone"/>
                <h3 className="font-semibold text-slate-900 mb-2">{t("無人機與無人載具")}</h3>
                <p className="text-slate-600 text-sm">{t("針對機體結構、設備托架、背板及其他承載零件，探索重量、結構剛性與製造可行性之間的平衡。")}</p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={100}>
              <div className="feature-card application-card">
                <ApplicationPhoto kind="robotics"/>
                <h3 className="font-semibold text-slate-900 mb-2">{t("機器人")}</h3>
                <p className="text-slate-600 text-sm">{t("支援機器人機構支架、外殼、承載零件及其他結構件的材料選擇、設計與分析。")}</p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={200}>
              <div className="feature-card application-card">
                <ApplicationPhoto kind="autonomous"/>
                <h3 className="font-semibold text-slate-900 mb-2">{t("自主系統")}</h3>
                <p className="text-slate-600 text-sm">{t("協助自主移動平台及相關硬體設備，評估複合材料在輕量化與結構設計方面的應用可能。")}</p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={300}>
              <div className="feature-card application-card">
                <ApplicationPhoto kind="research"/>
                <h3 className="font-semibold text-slate-900 mb-2">{t("研發團隊與早期新創")}</h3>
                <p className="text-slate-600 text-sm">{t("適合仍在產品設計、原型開發與功能驗證階段，需要外部複合材料工程資源的團隊。")}</p>
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* How We Work */}
      <section className="w-full bg-slate-50 border-t border-slate-200">
        <Container className="section-space">
          <SectionHeader eyebrow="OUR PROCESS" title="A Simpler Path to Composite Development." description={t("讓複雜的複材工程流程，更容易開始。")} />
          <div className="max-w-4xl mx-auto space-y-6">
            <AnimateOnScroll animation="fade-up" delay={0}>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  01
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">{t("需求確認")}</h3>
                  <p className="text-slate-600 text-sm">{t("了解產品用途、設計限制、載荷需求、重量目標與開發階段。")}</p>
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={100}>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  02
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">{t("工程設計")}</h3>
                  <p className="text-slate-600 text-sm">{t("依據需求規劃結構方案、材料選擇與初步設計方向。")}</p>
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={200}>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  03
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">{t("模擬分析")}</h3>
                  <p className="text-slate-600 text-sm">{t("透過工程分析評估指定工況下的結構表現，提供設計比較與改善建議。")}</p>
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={300}>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  04
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">{t("製造與打樣")}</h3>
                  <p className="text-slate-600 text-sm">{t("依據設計需求與製程可行性，協調原型製造及相關工程資源。")}</p>
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={400}>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  05
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">{t("驗證與迭代")}</h3>
                  <p className="text-slate-600 text-sm">{t("根據原型測試結果與設計回饋，協助調整下一版本的開發方案。")}</p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
          <p className="text-slate-500 text-sm text-center mt-8 italic">{t("*實際服務範圍、交付項目與測試方式，將依專案需求及雙方確認的合作內容而定。")}</p>
        </Container>
      </section>

      <section id="sample-deliverables" className="sample-deliverables" aria-labelledby="sample-deliverables-heading"><Container className="section-space">
        <div className="sample-deliverables-intro"><div className="section-heading"><p className="eyebrow">ENGINEERING / SAMPLE DELIVERABLES</p><h2 id="sample-deliverables-heading">{en?'Know what a handoff can look like.':'先看看，工程交付長什麼樣。'}</h2><p className="section-description">{en?'Explore a worked documentation example: an engineering review, an explicit layup schedule and a delivery checklist.':'從一組文件範例，了解工程審查、完整鋪層定義與交付檢查的呈現方式。'}</p></div><a className="btn btn-primary" href="/downloads/composita-engineering-sample-pack.zip" download>{en?'Download sample pack ↓':'下載整套範例 ↓'}</a></div>
        <div className="sample-download-grid">{([
          {file:'composita-sample-engineering-report.pdf', title:en?'Engineering report':'示範工程報告', description:en?'An illustrative brief, geometry schematic, input-readiness review and the steps required before approval.':'示範需求、幾何示意、輸入資料完整性審查，以及核准前所需的步驟。',meta:en?'PDF · 2 pages · English':'PDF · 2 頁 · 英文'},
          {file:'composita-sample-layup-table.pdf', title:en?'Layup schedule':'示範鋪層表', description:en?'Eight plies with angles, nominal thickness, z coordinates, coverage and an explicit stacking convention.':'8 層鋪層的角度、名義厚度、z 座標、覆蓋範圍與明確的堆疊方向。',meta:en?'PDF · 1 page · English':'PDF · 1 頁 · 英文'},
          {file:'composita-sample-delivery-checklist.pdf', title:en?'Delivery checklist':'示範交付清單', description:en?'Ten handoff items with review evidence and a clear record of what is included, missing or not performed.':'10 項交付內容、審查依據，並標明已包含、未包含或尚未執行的項目。',meta:en?'PDF · 1 page · English':'PDF · 1 頁 · 英文'},
        ]).map((item,index)=><article className="sample-download-card" key={item.file}><div className="sample-download-top"><span aria-hidden="true">0{index+1}</span><span>DEMO / REV A</span></div><h3>{item.title}</h3><p>{item.description}</p><span className="sample-download-meta">{item.meta}</span><a href={`/downloads/${item.file}`} className="text-link" download aria-label={`${en?'Download':'下載'} ${item.title} PDF`}>{en?'Download PDF ↓':'下載 PDF ↓'}</a></article>)}</div>
        <p className="sample-deliverables-note">{en?'Illustrative documents, not a client project or released manufacturing data. No solver results or physical test data are included.':'文件為示範內容，非客戶專案或已核准的製造資料；不包含求解器分析結果或實測數據。'}</p>
      </Container></section>

      <section id="compositeos"><Container className="section-space"><CompositeOSPreview/></Container></section>

      <CTASection title="Let’s Build Your Next Composite." description={t("從零件設計、模擬到打樣驗證，一起討論適合您開發階段的工程方案。")} href="/contact?type=composita" label={t("洽詢 Composita 合作")} />
    </>
  );
}
