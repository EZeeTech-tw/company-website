import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "news");

export interface NewsMeta {
  title: string;
  date: string;
  excerpt?: string;
  /** 首頁卡片用精選圖，可選填；未填則從內文擷取第一張圖 */
  image?: string;
  /** 是否在新聞列表中隱藏 */
  hidden?: boolean;
  category: "Company" | "Composita" | "SSERS" | "Awards" | "Partnerships";
}

export interface NewsItem {
  slug: string;
  meta: NewsMeta;
}

export interface NewsPost extends NewsItem {
  content: string;
}

function getSlugFromFilename(filename: string): string {
  return filename.replace(/\.mdx?$/, "");
}

// Categorize original records; never relabel historical energy work as composites.
function categoryFor(data: Record<string, unknown>): NewsMeta["category"] {
  const allowed = ["Company", "Composita", "SSERS", "Awards", "Partnerships"];
  if (typeof data.category === "string" && allowed.includes(data.category)) return data.category as NewsMeta["category"];
  const text = `${data.title ?? ""} ${data.excerpt ?? ""}`;
  if (/產業發展獎勵補助/.test(text)) return "Company";
  if (/冠軍|第三名|獲頒|獎/.test(text)) return "Awards";
  if (/合作|備忘錄/.test(text)) return "Partnerships";
  if (/Composita|Composita OS/i.test(text)) return "Composita";
  if (/SSERS|PESA|能量回收|震動電能|振動/.test(text)) return "SSERS";
  return "Company";
}

/** 從 MDX 內文擷取第一張圖片網址（markdown、img src、TwoPhotoGrid leftSrc/rightSrc） */
function extractFirstImage(content: string): string | undefined {
  const markdownMatch = content.match(/!\[[^\]]*\]\((\/news\/[^)]+)\)/);
  if (markdownMatch) return markdownMatch[1];
  const twoPhotoMatch = content.match(/(?:leftSrc|rightSrc)=["'](\/news\/[^"']+)["']/);
  if (twoPhotoMatch) return twoPhotoMatch[1];
  const srcMatch = content.match(/src=["'](\/news\/[^"']+)["']/);
  if (srcMatch) return srcMatch[1];
  return undefined;
}

export function getNewsList(): NewsItem[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
  const items: NewsItem[] = files.map((filename) => {
    const fullPath = path.join(CONTENT_DIR, filename);
    const raw = fs.readFileSync(fullPath, "utf-8");
    const { data, content } = matter(raw);
    const image = (data.image as string | undefined) ?? extractFirstImage(content);
    return {
      slug: getSlugFromFilename(filename),
      meta: {
        title: (data.title as string) ?? filename,
        date: (data.date as string) ?? "",
        excerpt: data.excerpt as string | undefined,
        image,
        hidden: (data.hidden as boolean) ?? false,
        category: categoryFor(data),
      },
    };
  });
  items.sort((a, b) => (b.meta.date > a.meta.date ? 1 : -1));
  return items.filter((item) => !item.meta.hidden);
}

export function getNewsBySlug(slug: string): NewsPost | null {
  if (!getNewsSlugs().includes(slug)) return null;
  const fullPath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    meta: {
      title: (data.title as string) ?? slug,
      date: (data.date as string) ?? "",
      excerpt: data.excerpt as string | undefined,
      image: (data.image as string | undefined) ?? extractFirstImage(content),
      hidden: (data.hidden as boolean) ?? false,
      category: categoryFor(data),
    },
    content,
  };
}

export function getNewsSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(getSlugFromFilename);
}
