import React, { useMemo } from "react";
import { Link } from "react-router-dom";
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

const BlogIndexPage: React.FC = () => {
  const articles = getArticles();

  const uniqueCategories = useMemo(() => {
    const categories = articles
      .map((article) => article.category)
      .filter((category): category is string => !!category);
    return [...new Set(categories)];
  }, [articles]);

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div>
      <Helmet>
        <title>Svitlogics Blog</title>
        <meta
          name="description"
          content="Read the latest articles and updates from the Svitlogics team."
        />
        <link rel="canonical" href="https://svitlogics.com/blog" />
        <meta property="og:title" content="Svitlogics Blog" />
        <meta
          property="og:description"
          content="Read the latest articles and updates from the Svitlogics team."
        />
        <meta property="og:url" content="https://svitlogics.com/blog" />
      </Helmet>

      <div className="container-main pt-16 pb-16">
        <h1 className="font-mono font-bold text-h1-mobile normal-case md:uppercase lg:text-h1-desktop text-black mb-12 text-left">
          Svitlogics Blog
        </h1>

        <div className="max-w-3xl">
          {/* --- БЛОК КАТЕГОРІЙ --- */}
          {uniqueCategories.length > 0 && (
            <section className="mb-12">
              <h2 className="font-mono font-semibold text-h2-mobile lg:text-h2-desktop text-black mb-6 normal-case">
                Categories
              </h2>
              <div className="flex flex-wrap gap-2">
                {uniqueCategories.map((category) => (
                  <Link
                    key={category}
                    to={`/blog/category/${slugify(category)}`}
                    // Стиль "Secondary Button" з вашої дизайн-системи
                    className="block border border-black rounded-none px-3 py-1 font-mono font-medium text-ui-label uppercase text-black bg-white transition-colors duration-100 hover:bg-black hover:text-white"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* --- СПИСОК СТАТЕЙ --- */}
          {articles.length > 0 ? (
            <div className="space-y-4">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  to={`/blog/${article.slug}`}
                  // Стиль "Container / Card" з вашої дизайн-системи
                  className="block border border-black p-4 bg-white rounded-none transition-colors duration-100 hover:border-blue-accent group"
                >
                  <article>
                    <h3 className="font-mono font-medium text-h3-desktop normal-case text-blue-accent mb-2 group-hover:underline">
                      {article.title}
                    </h3>

                    {/* Метадані тепер чорні, як і має бути */}
                    <div className="flex flex-wrap items-center gap-x-3 font-mono text-ui-label text-black normal-case mb-4">
                      <span>{article.date}</span>
                      {article.category && (
                        <>
                          <span aria-hidden="true">•</span>
                          <Link
                            to={`/blog/category/${slugify(article.category)}`}
                            onClick={handleCategoryClick}
                            className="text-blue-accent hover:underline z-10 relative"
                          >
                            {article.category}
                          </Link>
                        </>
                      )}
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
            <p className="font-mono text-body-main">No articles found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogIndexPage;
