// scripts/pre-render.mjs

import fs from "fs/promises";
import path from "path";
import { glob } from "glob";
import matter from "gray-matter";
import { render } from "../src/entry-server.tsx";

// --- Утиліта для створення URL-slug ---
const slugify = (text) => {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Замінити пробіли на -
    .replace(/[^\w\-]+/g, "") // Видалити всі не-словесні символи
    .replace(/\-\-+/g, "-"); // Замінити кілька - на один -
};

// Визначаємо кореневу папку проєкту
const root = process.cwd();

/**
 * Крок 1: Генерація файлу-реєстру статей.
 */
async function generateArticlesData() {
  console.log("📄 Generating articles data file...");
  const articlePaths = await glob(path.resolve(root, "src/articles/*.mdx"));

  if (articlePaths.length === 0) {
    console.warn(
      "⚠️ WARNING: No .mdx files found in src/articles/. The blog will be empty."
    );
  } else {
    console.log(`✅ Found ${articlePaths.length} articles to process.`);
  }

  const articles = await Promise.all(
    articlePaths.map(async (filePath) => {
      const slug = path.basename(filePath, ".mdx");
      const fileContent = await fs.readFile(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      if (!data.title || !data.date || !data.summary) {
        throw new Error(`Missing frontmatter in ${filePath}`);
      }

      return {
        slug,
        title: data.title,
        date: data.date,
        summary: data.summary,
        author: data.author || null,
        category: data.category || null,
        content: content.trim(),
      };
    })
  );

  articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const articlesFileContent = `// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.

export interface Article {
  slug: string;
  title: string;
  date: string;
  summary: string;
  author?: string;
  category?: string;
  content: string;
}

const _articles: Article[] = ${JSON.stringify(articles, null, 2)};

export function getArticles(): Article[] {
  return _articles;
}
`;
  await fs.writeFile(
    path.resolve(root, "src/articles/index.ts"),
    articlesFileContent
  );
  console.log("✅ Articles data file generated at src/articles/index.ts");
  return articles;
}

/**
 * Крок 2: Генерація карти сайту.
 */
async function generateSitemap(routes, outDir) {
  const domain = "https://svitlogics.com";
  const today = new Date().toISOString().split("T")[0];
  const urlEntries = routes
    .map(
      (route) =>
        `<url><loc>${domain}${route}</loc><lastmod>${today}</lastmod></url>`
    )
    .join("");
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlEntries}</urlset>`;
  const sitemapPath = path.join(outDir, "sitemap.xml");
  await fs.writeFile(sitemapPath, sitemapContent);
}

/**
 * Основна функція пре-рендерингу.
 */
async function runPreRender() {
  console.log("🚀 Starting Svitlogics pre-rendering process...");
  const articles = await generateArticlesData();

  const staticRoutes = [
    "/",
    "/about",
    "/how-it-works",
    "/faq",
    "/changelog",
    "/pricing-limits",
    "/contact",
    "/privacy-policy",
    "/terms-of-use",
    "/blog",
  ];

  const articleRoutes = articles.map((article) => `/blog/${article.slug}`);

  // --- ВИПРАВЛЕННЯ ТУТ: Додаємо генерацію маршрутів для категорій ---
  const uniqueCategories = [
    ...new Set(articles.map((article) => article.category).filter(Boolean)),
  ];

  const categoryRoutes = uniqueCategories.map((category) => {
    return `/blog/category/${slugify(category)}`;
  });

  const allRoutes = [...staticRoutes, ...articleRoutes, ...categoryRoutes];
  console.log("Found routes to pre-render:", allRoutes);

  const outDir = path.resolve(root, "dist");
  const templatePath = path.resolve(outDir, "index.html");

  try {
    await fs.access(templatePath);
  } catch (e) {
    console.error(
      `❌ Error: Template file not found at ${templatePath}. Did you run "vite build" first?`
    );
    process.exit(1);
  }

  const template = await fs.readFile(templatePath, "utf-8");
  console.log("\n🛠️  Starting rendering pages...");

  for (const route of allRoutes) {
    const { appHtml, helmet } = render(route);
    const helmetContent = `${helmet?.title?.toString() || ""}${
      helmet?.meta?.toString() || ""
    }${helmet?.link?.toString() || ""}`;
    const finalHtml = template
      .replace(`<!--ssr-outlet-->`, appHtml)
      .replace("</head>", `${helmetContent}</head>`)
      .replace(/\/>/g, ">");

    const filePath = path.join(
      outDir,
      route === "/" ? "index.html" : `${route.substring(1)}/index.html`
    );
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, finalHtml);
    console.log(`  ✓ Rendered ${route}`);
  }

  await generateSitemap(allRoutes, outDir);
  console.log("  ✓ Generated sitemap.xml");

  console.log("\n✅ Pre-rendering complete.");
}

runPreRender().catch((error) => {
  console.error("❌ Pre-rendering failed:", error);
  process.exit(1);
});
