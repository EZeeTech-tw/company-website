import { setRequestLocale } from "next-intl/server";
import { getText } from "@/i18n/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { TwoPhotoGrid } from "@/components/TwoPhotoGrid";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { getNewsBySlug, getNewsSlugs } from "@/lib/news";
import { pageMetadata } from "@/lib/metadata";
import { siteUrl } from "@/lib/site";
import { getLocale } from 'next-intl/server';
import { localizeNews } from '@/i18n/news';

const mdxComponents = {
  TwoPhotoGrid,
};

interface NewsSlugPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  const slugs = getNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: NewsSlugPageProps) {
 setRequestLocale((await params).locale);
  const { slug } = await params;
  const post = getNewsBySlug(slug);
  if (!post) return { title: "找不到新聞", robots: { index: false } };
  post.meta = localizeNews(post, await getLocale());
  const metadata = await pageMetadata(post.meta.title, post.meta.excerpt ?? post.meta.title, `/news/${slug}`);
  return { ...metadata, robots: post.meta.hidden ? { index: false, follow: true } : undefined,
    openGraph: { ...metadata.openGraph, type: "article", publishedTime: post.meta.date } };
}

export default async function NewsSlugPage({ params }: NewsSlugPageProps) {
 setRequestLocale((await params).locale);
 const t = await getText();
  const { slug } = await params;
  const post = getNewsBySlug(slug);
  if (!post) notFound();
  const locale = await getLocale();
  post.meta = localizeNews(post, locale);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "NewsArticle", headline: post.meta.title,
        datePublished: post.meta.date, description: post.meta.excerpt,
        mainEntityOfPage: `${siteUrl}${locale === 'en' ? '/en' : ''}/news/${slug}`,
        inLanguage: 'zh-Hant',
        author: { "@type": "Organization", name: "EZeeTech", url: siteUrl },
        publisher: { "@type": "Organization", name: "EZeeTech", url: siteUrl },
        image: post.meta.image ? new URL(post.meta.image, siteUrl).href : `${siteUrl}/opengraph-image`,
      }).replace(/</g, "\\u003c") }} />
      <PageHero
        eyebrow={post.meta.category}
        breadcrumb={[{ label: t("最新消息"), href: "/news" }, { label: post.meta.title }]}
        title={post.meta.title}
        description={
          post.meta.date ? (
            <time dateTime={post.meta.date} className="text-slate-300 text-base font-normal">
              {post.meta.date}
            </time>
          ) : undefined
        }
      />
      <section className="w-full bg-white">
        <Container className="section-space">
          <AnimateOnScroll animation="fade-up">
          <Link
            href="/news"
            className="text-link mb-8 inline-block"
          >{t("← 返回最新消息")}</Link>
          {locale === 'en' && <aside className="feature-card mb-8"><h2 className="font-semibold">English summary</h2><p className="mt-3">{post.meta.excerpt || post.meta.title}</p><p className="text-sm text-slate-500 mt-4">The original article below is in Traditional Chinese. Its publication date and historical content are preserved.</p></aside>}
          <article lang="zh-Hant" className="w-full min-w-0 overflow-hidden">
            <div className="prose prose-slate prose-img:rounded-lg max-w-4xl">
              <MDXRemote source={post.content} components={mdxComponents} />
            </div>
          </article>
          </AnimateOnScroll>
        </Container>
      </section>
    </>
  );
}

export const dynamic = 'error';
