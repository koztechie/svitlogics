// scripts/pre-render.mjs

import fs from "fs/promises";
import path from "path";
import { glob } from "glob";
import { render } from "../src/entry-server.tsx";

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

async function generateRoutes() {
  const articlePaths = await glob("src/articles/*.md");
  const dynamicRoutes = articlePaths.map((articlePath) => {
    const slug = path.basename(articlePath, ".md");
    return `/blog/${slug}`;
  });
  return [...staticRoutes, ...dynamicRoutes];
}

async function runPreRender() {
  console.log("🚀 Starting Svitlogics pre-rendering process...");

  const allRoutes = await generateRoutes();
  console.log("Found routes to pre-render:", allRoutes);

  const outDir = path.resolve(process.cwd(), "dist");
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
  console.log("\n🛠️  Starting rendering...");

  for (const route of allRoutes) {
    const { appHtml, helmet } = render(route);

    // --- ВИПРАВЛЕННЯ ТУТ: Надійна заміна контенту ---
    // Використовуємо регулярний вираз, щоб замінити <div id="root">...</div>
    // незалежно від його вмісту.
    const finalHtml = template
      .replace(/<div id="root">.*?<\/div>/s, `<div id="root">${appHtml}</div>`) // Додано прапор 's' для багаторядкового вмісту
      .replace(
        "</head>",
        `${helmet?.title?.toString() || ""}
         ${helmet?.meta?.toString() || ""}
         ${helmet?.link?.toString() || ""}
         ${helmet?.script?.toString() || ""}
        </head>`
      );

    const cleanedHtml = finalHtml.replace(/ \/>/g, ">");

    const filePath = path.join(
      outDir,
      route === "/" ? "index.html" : `${route.substring(1)}/index.html`
    );

    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, cleanedHtml);

    console.log(`  ✓ Rendered ${route} to ${filePath}`);
  }

  console.log("\n✅ Pre-rendering complete.");
}

runPreRender().catch((error) => {
  console.error("❌ Pre-rendering failed:", error);
  process.exit(1);
});
