import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getArticles } from "../articles";

const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
};

const CategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();

  const filteredArticles = useMemo(() => {
    const allArticles = getArticles();
    if (!categorySlug) {
      return [];
    }
    return allArticles.filter(
      (article) =>
        article.category && slugify(article.category) === categorySlug
    );
  }, [categorySlug]);

  // Визначаємо назву категорії з першої знайденої статті для збереження регістру
  const categoryName =
    filteredArticles.length > 0
      ? filteredArticles[0].category
      : categorySlug?.replace(/-/g, " ") || "Category";

  return (
    <div>
      <Helmet>
        <title>{`Category: ${categoryName} | Svitlogics Blog`}</title>
        <meta
          name="description"
          content={`Articles categorized under ${categoryName} on the Svitlogics blog.`}
        />
        <link
          rel="canonical"
          href={`https://svitlogics.com/blog/category/${categorySlug}`}
        />
        <meta
          property="og:title"
          content={`Category: ${categoryName} | Svitlogics Blog`}
        />
        <meta
          property="og:description"
          content={`Articles categorized under ${categoryName} on the Svitlogics blog.`}
        />
        <meta
          property="og:url"
          content={`https://svitlogics.com/blog/category/${categorySlug}`}
        />
      </Helmet>

      <div className="container-main pt-16 pb-16">
        <div className="max-w-3xl">
          <Link
            to="/blog"
            className="block font-mono font-medium text-ui-label uppercase text-blue-accent no-underline hover:underline mb-8"
          >
            ← Back to Blog Index
          </Link>

          {/* Верхній блок з назвою категорії */}
          <div className="mb-12 border-b border-black pb-8">
            <p className="font-mono text-ui-label text-black uppercase mb-2">
              Category
            </p>
            <h1 className="font-mono font-bold text-h1-mobile normal-case md:uppercase lg:text-h1-desktop text-black">
              {categoryName}
            </h1>
          </div>

          {/* Список статей */}
          {filteredArticles.length > 0 ? (
            <div className="space-y-4">
              {filteredArticles.map((article) => (
                <Link
                  key={article.slug}
                  to={`/blog/${article.slug}`}
                  className="block border border-black p-4 bg-white rounded-none transition-colors duration-100 hover:border-blue-accent group"
                >
                  <article>
                    <h2 className="font-mono font-medium text-h3-desktop normal-case text-blue-accent mb-2 group-hover:underline">
                      {article.title}
                    </h2>
                    {/* Метадані тепер чорні і в правильному порядку */}
                    <div className="flex flex-wrap items-center gap-x-3 font-mono text-ui-label text-black normal-case mb-4">
                      <span>{article.date}</span>
                      {article.author && (
                        <>
                          <span aria-hidden="true">•</span>
                          <span>by {article.author}</span>
                        </>
                      )}
                    </div>
                    <p className="font-mono font-normal text-body-main leading-body text-black">
                      {article.summary}
                    </p>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <p className="font-mono text-body-main">
              No articles found in this category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
