import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getArticles, Article } from "../articles";

// --- Типізація, Константи та Утиліти ---

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
      <h2
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
      </h2>
      <div className="mb-4 flex flex-wrap items-center gap-x-3 text-text-secondary text-ui-label">
        <time dateTime={article.createdAt}>{formattedDate}</time>
        {article.author && (
          <>
            <span aria-hidden="true">•</span>
            <span>{article.author}</span>
          </>
        )}
      </div>
      <p className="text-body-main text-black">{article.description}</p>
    </article>
  );
});
ArticleCard.displayName = "ArticleCard";

/**
 * @description Сторінка, що відображає список статей, відфільтрованих за певним тегом.
 * @component
 */
const TagPage: React.FC = () => {
  const { tagSlug } = useParams<{ tagSlug: string }>();

  const filteredArticles = useMemo(() => {
    if (!tagSlug) return [];
    const allArticles = getArticles();
    return allArticles.filter((article) =>
      article.tags?.some((tag) => slugify(tag) === tagSlug)
    );
  }, [tagSlug]);

  const tagName = useMemo(() => {
    if (!tagSlug) return "";
    const firstArticle = filteredArticles[0];
    const originalTag = firstArticle?.tags.find(
      (tag) => slugify(tag) === tagSlug
    );
    return originalTag || tagSlug.replace(/-/g, " ");
  }, [tagSlug, filteredArticles]);

  return (
    <>
      <Helmet>
        <title>{`TAG: ${tagName} | SVITLOGICS`}</title>
        <meta
          name="description"
          content={`An index of articles on the Svitlogics blog tagged with "${tagName}".`}
        />
        <link
          rel="canonical"
          href={`https://svitlogics.com/blog/tag/${tagSlug}`}
        />
        <meta property="og:title" content={`TAG: ${tagName} | SVITLOGICS`} />
        <meta
          property="og:description"
          content={`An index of articles on the Svitlogics blog tagged with "${tagName}".`}
        />
        <meta
          property="og:url"
          content={`https://svitlogics.com/blog/tag/${tagSlug}`}
        />
      </Helmet>

      <div className="container-main">
        <header>
          <p className="mb-2 font-medium uppercase text-black text-ui-label">
            TAG
          </p>
          <h1 className="mb-16 font-bold text-black text-h1-mobile capitalize md:uppercase lg:text-h1-desktop">
            {tagName}
          </h1>
        </header>

        <main className="max-w-3xl">
          {filteredArticles.length > 0 ? (
            <div className="space-y-8">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <p className="text-body-main">NO ARTICLES FOUND WITH THIS TAG.</p>
          )}

          <div className="mt-16 border-t-1 border-black pt-8">
            <Link
              to="/blog"
              className="font-medium uppercase text-blue-accent text-ui-label no-underline hover:underline focus-visible:underline"
            >
              ← RETURN TO BLOG INDEX
            </Link>
          </div>
        </main>
      </div>
    </>
  );
};

export default TagPage;
