import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getArticles, Article } from "../articles";

// --- Типізація, Константи та Утиліти ---

/**
 * @description Контент для SEO та заголовків сторінки.
 */
const pageContent = {
  title: "SVITLOGICS BLOG",
  description:
    "Technical articles, analysis, and project updates from Svitlogics.",
  canonicalUrl: "https://svitlogics.com/blog",
  tagsHeader: "TAGS",
  noArticlesMessage: "NO ARTICLES FOUND.",
} as const;

/**
 * @description Утиліта для генерації URL-дружнього slug.
 * @param {string} text - Вхідний рядок.
 * @returns {string} Slug-рядок.
 */
const slugify = (text: string): string => {
  if (!text) return "";
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};

// --- Мемоїзовані Підкомпоненти ---

/**
 * @description Пропси для підкомпонента `ArticleCard`.
 */
interface ArticleCardProps {
  article: Article;
}

/**
 * @description Мемоїзований компонент для відображення картки однієї статті.
 * @component
 */
const ArticleCard: React.FC<ArticleCardProps> = React.memo(({ article }) => {
  const formattedDate = useMemo(
    () =>
      new Date(article.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    [article.createdAt]
  );

  return (
    <article
      aria-labelledby={`article-title-${article.slug}`}
      className="group relative block border-1 border-black bg-white p-4 transition-colors duration-100 hover:border-blue-accent"
    >
      <h3
        id={`article-title-${article.slug}`}
        className="mb-2 font-medium text-blue-accent text-h3-mobile group-hover:underline lg:text-h3-desktop"
      >
        <Link
          to={`/blog/${article.slug}`}
          className="after:absolute after:inset-0 after:content-['']"
        >
          {/* span з z-10 потрібен, щоб вкладені посилання-теги були клікабельні */}
          <span className="relative z-10">{article.title}</span>
        </Link>
      </h3>

      <div className="mb-4 flex flex-wrap items-center gap-x-3 text-text-secondary text-ui-label">
        <time dateTime={article.createdAt}>{formattedDate}</time>
        <span aria-hidden="true">•</span>
        <span>{article.author}</span>
      </div>

      <p className="text-body-main text-black">{article.description}</p>

      {article.tags?.length > 0 && (
        <div className="relative z-10 mt-4 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Link
              key={tag}
              to={`/blog/tag/${slugify(tag)}`}
              onClick={(e) => e.stopPropagation()}
              className="block border-1 border-black bg-white px-2 py-1 text-black text-ui-label transition-colors duration-100 hover:text-blue-accent"
            >
              {tag}
            </Link>
          ))}
        </div>
      )}
    </article>
  );
});
ArticleCard.displayName = "ArticleCard";

/**
 * @description
 * Сторінка індексу блогу, що відображає список всіх статей та фільтр за тегами.
 * @component
 */
const BlogIndexPage: React.FC = () => {
  const articles = useMemo(() => getArticles(), []);

  const uniqueTags = useMemo(() => {
    const allTags = articles.flatMap((article) => article.tags || []);
    return [...new Set(allTags)];
  }, [articles]);

  return (
    <>
      <Helmet>
        <title>{pageContent.title}</title>
        <meta name="description" content={pageContent.description} />
        <link rel="canonical" href={pageContent.canonicalUrl} />
        <meta property="og:title" content={pageContent.title} />
        <meta property="og:description" content={pageContent.description} />
        <meta property="og:url" content={pageContent.canonicalUrl} />
      </Helmet>

      <div className="container-main">
        <header>
          <h1 className="mb-16 font-bold text-black text-h1-mobile md:uppercase lg:text-h1-desktop">
            {pageContent.title}
          </h1>
        </header>

        <main className="max-w-3xl">
          {uniqueTags.length > 0 && (
            <section aria-labelledby="tags-heading" className="mb-16">
              <h2
                id="tags-heading"
                className="mb-4 font-medium uppercase text-black text-ui-label"
              >
                {pageContent.tagsHeader}
              </h2>
              <div className="flex flex-wrap gap-2">
                {uniqueTags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/blog/tag/${slugify(tag)}`}
                    className="block border-1 border-black bg-white px-3 py-1 text-black text-ui-label transition-colors duration-100 hover:text-blue-accent"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {articles.length > 0 ? (
            <div className="space-y-8">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <p className="text-body-main">{pageContent.noArticlesMessage}</p>
          )}
        </main>
      </div>
    </>
  );
};

export default BlogIndexPage;
