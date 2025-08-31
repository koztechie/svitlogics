import fs from "fs/promises";
import path from "path";
import { glob } from "glob";
import matter from "gray-matter";
import { render } from "../src/entry-server.tsx";
import { articleFrontmatterSchema } from "../src/config/schemas.ts";

const root = process.cwd();

const slugify = (text) => {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
};

async function generateArticlesData() {
  console.log("📄 Generating articles data file...");
  const articlePaths = await glob(path.resolve(root, "src/articles/*.mdx"));

  if (articlePaths.length === 0) {
    console.warn("⚠️ WARNING: No .mdx files found in src/articles/.");
    return [];
  }

  console.log(`✅ Found ${articlePaths.length} articles to process.`);

  const articles = await Promise.all(
    articlePaths.map(async (filePath) => {
      const fileContent = await fs.readFile(filePath, "utf-8");
      const { data: frontmatter, content } = matter(fileContent);

      const validationResult = articleFrontmatterSchema.safeParse(frontmatter);

      if (!validationResult.success) {
        console.error(
          `\n❌ Frontmatter validation failed for file: ${path.basename(
            filePath
          )}`
        );
        validationResult.error.issues.forEach((issue) => {
          console.error(
            `  - Path: [${issue.path.join(", ")}], Message: ${issue.message}`
          );
        });
        console.error("\nBuild process terminated.");
        process.exit(1);
      }

      const validatedFrontmatter = validationResult.data;

      return {
        slug: validatedFrontmatter.slug,
        title: validatedFrontmatter.title,
        description: validatedFrontmatter.description,
        createdAt: validatedFrontmatter.createdAt,
        updatedAt: validatedFrontmatter.updatedAt,
        author: validatedFrontmatter.author,
        tags: validatedFrontmatter.tags,
        language: validatedFrontmatter.language,
        canonicalUrl: validatedFrontmatter.canonicalUrl,
        robots: validatedFrontmatter.robots,
        schema: validatedFrontmatter.schema,
        content: content.trim(),
      };
    })
  );

  articles.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const articlesFileContent = `// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.

export interface Article {
  slug: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt?: string;
  author: string;
  tags: string[];
  language: 'en' | 'uk';
  canonicalUrl?: string;
  robots?: string;
  schema?: string;
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

async function runPreRender() {
  console.log("🚀 Starting Svitlogics pre-rendering process...");
  const articles = await generateArticlesData();

  const staticRoutes = [
    "/",
    "/about/",
    "/how-it-works/",
    "/faq/",
    "/changelog/",
    "/pricing-limits/",
    "/contact/",
    "/privacy-policy/",
    "/terms-of-use/",
    "/cookie-policy/",
    "/disclaimer/",
    "/blog/",
  ];
  const articleRoutes = articles.map((article) => `/blog/${article.slug}/`);
  const uniqueTags = [
    ...new Set(articles.flatMap((article) => article.tags || [])),
  ];
  const tagRoutes = uniqueTags.map((tag) => `/blog/tag/${slugify(tag)}/`);

  const allRoutes = [
    ...new Set([...staticRoutes, ...articleRoutes, ...tagRoutes]),
  ].sort();
  console.log(`🗺️  Found ${allRoutes.length} unique routes to pre-render.`);

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
  console.log("\n🛠️  Starting rendering pages in parallel...");

  await Promise.all(
    allRoutes.map(async (route) => {
      try {
        let appHtml, helmet;

        // --- ВИПРАВЛЕННЯ ТУТ: "Ін'єкція Даних" для сторінок статей ---
        const isArticleRoute =
          route.startsWith("/blog/") && !route.startsWith("/blog/tag/");

        if (isArticleRoute) {
          const slug = route.split("/")[2];
          const article = articles.find((a) => a.slug === slug);
          if (article) {
            // Якщо це сторінка статті, рендеримо її з даними
            ({ appHtml, helmet } = render(route, article));
          } else {
            console.warn(
              `⚠️  Warning: No article data found for slug "${slug}". Rendering as a standard page.`
            );
            ({ appHtml, helmet } = render(route));
          }
        } else {
          // Для всіх інших сторінок рендеримо як зазвичай
          ({ appHtml, helmet } = render(route));
        }

        const helmetStrings = [
          helmet.title.toString(),
          helmet.meta.toString(),
          helmet.link.toString(),
          helmet.script.toString(),
        ]
          .filter(Boolean)
          .join("\n");

        const finalHtml = template
          .replace(`<!--ssr-outlet-->`, appHtml)
          .replace("</head>", `${helmetStrings}\n</head>`);

        const filePath = path.join(
          outDir,
          route.endsWith("/") ? `${route}index.html` : `${route}.html`
        );
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        await fs.writeFile(filePath, finalHtml);
        console.log(`  ✓ Rendered ${route}`);
      } catch (error) {
        console.error(`❌ Failed to render route ${route}:`, error);
      }
    })
  );

  await generateSitemap(allRoutes, outDir);
  console.log("  ✓ Generated sitemap.xml");

  console.log("\n✅ Pre-rendering complete.");
}

runPreRender().catch((error) => {
  console.error("❌ Pre-rendering failed:", error);
  process.exit(1);
});
