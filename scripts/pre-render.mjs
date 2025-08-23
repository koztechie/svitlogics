// scripts/pre-render.mjs

import fs from "fs/promises";
import path from "path";
import { glob } from "glob";
import matter from "gray-matter";
import { render } from "../src/entry-server.tsx";
import { articleFrontmatterSchema } from "../src/config/schemas.ts";

// --- JSDoc Type Definitions ---

/**
 * @typedef {object} ArticleFrontmatter
 * @property {string} slug
 * @property {string} title
 * @property {string} description
 * @property {string} createdAt - ISO date string.
 * @property {string} [updatedAt] - Optional ISO date string.
 * @property {string} author
 * @property {string} image
 * @property {string[]} tags
 * @property {'en' | 'uk'} language
 * @property {string} [canonicalUrl]
 * @property {string} [robots]
 * @property {string} [schema] - JSON-LD schema as a string.
 */

/**
 * @typedef {ArticleFrontmatter & { content: string }} Article
 * Represents a fully processed article with its content.
 */

/**
 * @typedef {object} HelmetData
 * @property {{ toString: () => string }} [title]
 * @property {{ toString: () => string }} [meta]
 * @property {{ toString: () => string }} [link]
 */

/**
 * @typedef {object} RenderResult
 * @property {string} appHtml
 * @property {HelmetData} helmet
 */

// --- Constants ---

const ROOT_DIR = process.cwd();
const OUTPUT_DIR = path.resolve(ROOT_DIR, "dist");
const ARTICLES_GLOB_PATH = path.resolve(ROOT_DIR, "src/articles/*.mdx");
const GENERATED_ARTICLES_FILE_PATH = path.resolve(
  ROOT_DIR,
  "src/articles/index.ts"
);
const SITEMAP_DOMAIN = "https://svitlogics.com";

const STATIC_ROUTES = [
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
  "/cookie-policy",
  "/disclaimer",
];

const GENERATED_FILE_HEADER =
  "// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.\n\n";

// --- Utility Functions ---

/**
 * Generates a URL-friendly slug from a string.
 * @param {string | undefined | null} text The input text to slugify.
 * @returns {string} The slugified text.
 */
const slugify = (text) => {
  if (!text) {
    return "";
  }
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-"); // Replace multiple - with single -
};

// --- Core Logic Functions ---

/**
 * Finds all article files, validates their frontmatter, processes them,
 * and generates a TypeScript file with all article data.
 * @returns {Promise<Article[]>} A promise that resolves to an array of all processed articles.
 */
async function generateArticlesData() {
  console.log("📄 Generating articles data file...");
  const articlePaths = await glob(ARTICLES_GLOB_PATH);

  if (articlePaths.length === 0) {
    console.warn("⚠️ WARNING: No .mdx files found in src/articles/.");
    return [];
  }

  console.log(`✅ Found ${articlePaths.length} articles to process.`);

  const articles = await Promise.all(
    articlePaths.map(async (filePath) => {
      const fileContent = await fs.readFile(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      /** @type {ArticleFrontmatter} */
      const frontmatter = data;

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
        console.error("\nBuild process terminated due to validation errors.");
        process.exit(1);
      }

      return {
        ...frontmatter,
        content: content.trim(),
      };
    })
  );

  // Sort articles by creation date, newest first.
  articles.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const articlesFileContent = `${GENERATED_FILE_HEADER}
export interface Article {
  slug: string;
  title: string;
  description: string;
  createdAt: string; // Stored as ISO string
  updatedAt?: string;
  author: string;
  image: string;
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

  await fs.writeFile(GENERATED_ARTICLES_FILE_PATH, articlesFileContent);
  console.log(
    `✅ Articles data file generated at ${GENERATED_ARTICLES_FILE_PATH}`
  );
  return articles;
}

/**
 * Generates a sitemap.xml file from a list of routes.
 * @param {string[]} routes An array of URL paths (e.g., '/about').
 * @param {string} outDir The output directory for the sitemap file.
 * @returns {Promise<void>}
 */
async function generateSitemap(routes, outDir) {
  const today = new Date().toISOString().split("T")[0];
  const urlEntries = routes
    .map(
      (route) =>
        `<url><loc>${SITEMAP_DOMAIN}${route}</loc><lastmod>${today}</lastmod></url>`
    )
    .join("");

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlEntries}</urlset>`;
  const sitemapPath = path.join(outDir, "sitemap.xml");
  await fs.writeFile(sitemapPath, sitemapContent);
}

/**
 * The main pre-rendering script orchestrator.
 * @returns {Promise<void>}
 */
async function runPreRender() {
  console.log("🚀 Starting Svitlogics pre-rendering process...");
  const articles = await generateArticlesData();

  const articleRoutes = articles.map((article) => `/blog/${article.slug}`);
  const uniqueTags = [...new Set(articles.flatMap((article) => article.tags))];
  const tagRoutes = uniqueTags.map((tag) => `/blog/tag/${slugify(tag)}`);

  const allRoutes = [...STATIC_ROUTES, ...articleRoutes, ...tagRoutes];
  console.log(`🗺️  Found ${allRoutes.length} routes to pre-render.`);

  const templatePath = path.resolve(OUTPUT_DIR, "index.html");
  let template;
  try {
    template = await fs.readFile(templatePath, "utf-8");
  } catch (e) {
    console.error(
      `❌ Error: Template file not found at ${templatePath}. Did you run "vite build" first?`
    );
    process.exit(1);
  }

  console.log("🛠️  Starting rendering pages in parallel...");

  // --- PERFORMANCE OPTIMIZATION: Render all pages in parallel ---
  await Promise.all(
    allRoutes.map(async (route) => {
      /** @type {RenderResult} */
      const { appHtml, helmet } = render(route);

      const helmetContent = [
        helmet?.title?.toString(),
        helmet?.meta?.toString(),
        helmet?.link?.toString(),
      ]
        .filter(Boolean)
        .join("");

      const finalHtml = template
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace("</head>", `${helmetContent}</head>`)
        .replace(/\/>/g, ">"); // Fix for self-closing tags issue with some parsers

      const routePath = route.substring(1);
      const filePath = path.join(
        OUTPUT_DIR,
        route === "/" ? "index.html" : `${routePath}/index.html`
      );
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, finalHtml);
      console.log(`  ✓ Rendered ${route}`);
    })
  );

  await generateSitemap(allRoutes, OUTPUT_DIR);
  console.log("  ✓ Generated sitemap.xml");

  console.log("\n✅ Pre-rendering complete.");
}

// --- Script Execution ---

runPreRender().catch((error) => {
  console.error(
    "❌ A critical error occurred during the pre-rendering process:",
    error
  );
  process.exit(1);
});
