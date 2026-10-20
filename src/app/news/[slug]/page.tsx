import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { TwoPhotoGrid } from "@/components/TwoPhotoGrid";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { getNewsBySlug, getNewsSlugs } from "@/lib/news";
import { pageMetadata, siteUrl } from "@/lib/site";

const mdxComponents = {
  TwoPhotoGrid,
};

interface NewsSlugPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: NewsSlugPageProps) {
  const { slug } = await params;
  const post = getNewsBySlug(slug);
  if (!post) return { title: "找不到新聞", robots: { index: false } };
  const metadata = pageMetadata(post.meta.title, post.meta.excerpt ?? post.meta.title, `/news/${slug}`);
  return { ...metadata, robots: post.meta.hidden ? { index: false, follow: true } : undefined,
    openGraph: { ...metadata.openGraph, type: "article", publishedTime: post.meta.date } };
}

export default async function NewsSlugPage({ params }: NewsSlugPageProps) {
  const { slug } = await params;
  const post = getNewsBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "NewsArticle", headline: post.meta.title,
        datePublished: post.meta.date, description: post.meta.excerpt,
        mainEntityOfPage: `${siteUrl}/news/${slug}`,
        author: { "@type": "Organization", name: "EZeeTech", url: siteUrl },
        publisher: { "@type": "Organization", name: "EZeeTech", url: siteUrl },
        image: post.meta.image ? new URL(post.meta.image, siteUrl).href : `${siteUrl}/opengraph-image`,
      }).replace(/</g, "\\u003c") }} />
      <PageHero
        eyebrow={post.meta.category}
        breadcrumb={[{ label: "最新消息", href: "/news" }, { label: post.meta.title }]}
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
          >
            ← 返回最新消息
          </Link>
          <article className="w-full min-w-0 overflow-hidden">
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
