import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getArticles } from "../articles";

const slugify = (text: string): string => {
  if (!text) return "";
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

  const uniqueTags = useMemo(() => {
    const allTags = articles.flatMap((article) => article.tags);
    return [...new Set(allTags)];
  }, [articles]);

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
          {uniqueTags.length > 0 && (
            <section className="mb-12">
              <h2 className="font-mono font-medium text-ui-label uppercase text-black mb-4">
                TAGS
              </h2>
              <div className="flex flex-wrap gap-2">
                {uniqueTags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/blog/tag/${slugify(tag)}`}
                    className="block border border-black rounded-none px-3 py-1 font-mono text-ui-label text-black bg-white transition-colors duration-100 hover:border-blue-accent hover:text-blue-accent"
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
                <Link
                  key={article.slug}
                  to={`/blog/${article.slug}`}
                  className="block border border-black p-4 bg-white rounded-none transition-colors duration-100 hover:border-blue-accent group"
                >
                  <article>
                    <h3 className="font-mono font-medium text-h3-desktop normal-case text-blue-accent mb-2 group-hover:underline">
                      {article.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-2 font-mono text-ui-label text-text-secondary normal-case mb-4">
                      <span>
                        {new Date(article.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                      <span aria-hidden="true">•</span>
                      <span>{article.author}</span>
                    </div>

                    <p className="font-mono font-normal text-body-main leading-body text-black">
                      {article.description}
                    </p>

                    {article.tags && article.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
                          <span
                            key={tag}
                            className="block border border-black rounded-none px-2 py-0.5 font-mono text-xs text-black bg-white"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
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
