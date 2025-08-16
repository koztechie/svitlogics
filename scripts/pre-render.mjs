// scripts/pre-render.mjs

import fs from "fs/promises";
import path from "path";
import { glob } from "glob";
import matter from "gray-matter";
import { render } from "../src/entry-server.tsx";
import { articleFrontmatterSchema } from "../src/config/schemas.ts";

const root = process.cwd();

// --- ВИПРАВЛЕННЯ ТУТ: Додаємо функцію slugify ---
const slugify = (text) => {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Замінити пробіли на -
    .replace(/[^\w\-]+/g, "") // Видалити всі не-словесні символи
    .replace(/\-\-+/g, "-"); // Замінити декілька - на один
};

async function generateArticlesData() {
  console.log("📄 Generating articles data file...");
  const articlePaths = await glob(path.resolve(root, "src/articles/*.mdx"));

  if (articlePaths.length === 0) {
    console.warn("⚠️ WARNING: No .mdx files found in src/articles/.");
  } else {
    console.log(`✅ Found ${articlePaths.length} articles to process.`);
  }

  const articles = await Promise.all(
    articlePaths.map(async (filePath) => {
      const slug = path.basename(filePath, ".mdx");
      const fileContent = await fs.readFile(filePath, "utf-8");
      const { data: frontmatter, content } = matter(fileContent);

      try {
        articleFrontmatterSchema.parse(frontmatter);
      } catch (error) {
        console.error(
          `\n❌ Frontmatter validation failed for file: ${filePath}`
        );
        if (error.issues) {
          console.error("Validation Issues:");
          error.issues.forEach((issue) => {
            console.error(
              `  - Path: [${issue.path.join(", ")}], Message: ${issue.message}`
            );
          });
        } else {
          console.error(error);
        }
        console.error("\nBuild process terminated.");
        process.exit(1);
      }

      return {
        slug,
        title: frontmatter.title,
        date: frontmatter.date,
        summary: frontmatter.summary,
        author: frontmatter.author || null,
        category: frontmatter.category || null,
        content: content.trim(),
      };
    })
  );

  articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const articlesFileContent = `// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.
// ... (решта файлу без змін)
`;
  await fs.writeFile(
    path.resolve(root, "src/articles/index.ts"),
    articlesFileContent
  );
  console.log("✅ Articles data file generated at src/articles/index.ts");
  return articles;
}

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

  // --- ВИПРАВЛЕННЯ ТУТ: Використовуємо slugify для створення роутів категорій ---
  const categories = [
    ...new Set(articles.map((a) => a.category).filter(Boolean)),
  ];
  const categoryRoutes = categories.map(
    (category) => `/blog/category/${slugify(category)}`
  );

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
