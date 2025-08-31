import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getArticles } from "../articles";
import { Heading } from "../components/ui/Heading";

const slugify = (text: string): string => {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
};

// --- НОВИЙ КОНТЕНТ ДЛЯ СТОРІНКИ ---
const pageContent = {
  seoTitle: "Blog | AI, Text Analysis & System Updates | Svitlogics",
  seoDescription:
    "The official blog of Svitlogics. In-depth articles on AI text analysis, system updates, and the mission to counter information warfare.",
  pageTitle: "Svitlogics Blog",
  introParagraph:
    "This blog serves as the official operational log and research journal for the Svitlogics project. Here you will find in-depth articles on text analysis methodologies, updates on system architecture, and essays on the broader mission to provide instruments for critical thinking in an era of informational chaos.",
};

const BlogIndexPage: React.FC = () => {
  const articles = getArticles();

  const uniqueTags = useMemo(() => {
    const allTags = articles.flatMap((article) => article.tags || []);
    return [...new Set(allTags)];
  }, [articles]);

  return (
    <>
      <Helmet>
        <title>{pageContent.seoTitle}</title>
        <meta name="description" content={pageContent.seoDescription} />
        <link rel="canonical" href="https://svitlogics.com/blog/" />
        <meta property="og:title" content={pageContent.seoTitle} />
        <meta property="og:description" content={pageContent.seoDescription} />
        <meta property="og:url" content="https://svitlogics.com/blog/" />
      </Helmet>

      <div className="container-main py-16">
        <div className="mx-auto max-w-prose">
          {/* --- НОВИЙ ВСТУПНИЙ БЛОК --- */}
          <header className="mb-12 text-left">
            <Heading as="h1" className="mb-4">
              {pageContent.pageTitle}
            </Heading>
            <p className="font-serif text-h4 text-carbon-black">
              {pageContent.introParagraph}
            </p>
          </header>

          {uniqueTags.length > 0 && (
            <section className="mb-12">
              <Heading
                as="h2"
                className="mb-4 text-small font-semibold text-neutral-700"
              >
                Filter by Tag
              </Heading>
              <div className="flex flex-wrap gap-2">
                {uniqueTags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/blog/tag/${slugify(tag)}/`} // Додано слеш
                    className="block border border-neutral-500 px-3 py-1 font-sans text-small text-carbon-black transition-colors hover:border-carbon-black hover:bg-neutral-300"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {articles.length > 0 ? (
            <div className="space-y-12">
              {articles.map((article) => (
                <article key={article.slug}>
                  <Link to={`/blog/${article.slug}/`}>
                    {" "}
                    {/* Додано слеш */}
                    <Heading
                      as="h2"
                      className="mb-2 text-svitlogics-blue hover:underline"
                    >
                      {article.title}
                    </Heading>
                  </Link>
                  <div className="mb-4 flex flex-wrap items-center gap-x-3 font-sans text-small text-neutral-700">
                    <span>
                      {new Date(article.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span aria-hidden="true">•</span>
                    <span>{article.author}</span>
                  </div>
                  <p className="font-serif text-body text-carbon-black">
                    {article.description}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <p className="font-serif text-body text-neutral-700">
              No articles are currently available.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogIndexPage;
