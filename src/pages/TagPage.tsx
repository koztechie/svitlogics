import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
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

const TagPage: React.FC = () => {
  const { tagSlug } = useParams<{ tagSlug: string }>();

  const filteredArticles = useMemo(() => {
    const allArticles = getArticles();
    if (!tagSlug) {
      return [];
    }
    return allArticles.filter((article) =>
      article.tags?.some((tag) => slugify(tag) === tagSlug)
    );
  }, [tagSlug]);

  const tagName = useMemo(() => {
    if (!tagSlug) return "";
    const firstMatch = filteredArticles[0];
    if (firstMatch?.tags) {
      return (
        firstMatch.tags.find((tag) => slugify(tag) === tagSlug) ||
        tagSlug.replace(/-/g, " ")
      );
    }
    return tagSlug.replace(/-/g, " ");
  }, [filteredArticles, tagSlug]);

  return (
    <div>
      <Helmet>
        <title>{`Tag: ${tagName} | Svitlogics Blog`}</title>
        <meta
          name="description"
          content={`Articles tagged with "${tagName}" on the Svitlogics blog.`}
        />
        <link
          rel="canonical"
          href={`https://svitlogics.com/blog/tag/${tagSlug}`}
        />
        <meta
          property="og:title"
          content={`Tag: ${tagName} | Svitlogics Blog`}
        />
        <meta
          property="og:description"
          content={`Articles tagged with "${tagName}" on the Svitlogics blog.`}
        />
        <meta
          property="og:url"
          content={`https://svitlogics.com/blog/tag/${tagSlug}`}
        />
      </Helmet>

      <div className="container-main pt-16 pb-16">
        <div className="max-w-3xl">
          <p className="font-mono text-ui-label text-black uppercase mb-2">
            Tag
          </p>
          {/* --- ВИПРАВЛЕННЯ ТУТ: Видалено 'normal-case' --- */}
          <h1 className="font-mono font-bold text-h1-mobile md:uppercase lg:text-h1-desktop text-black mb-12 text-left capitalize">
            {tagName}
          </h1>

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
                    <div className="flex flex-wrap items-center gap-x-3 font-mono text-ui-label text-black normal-case mb-4">
                      <span>{article.createdAt}</span>
                      {article.author && (
                        <>
                          <span aria-hidden="true">•</span>
                          <span>by {article.author}</span>
                        </>
                      )}
                    </div>
                    <p className="font-mono font-normal text-body-main leading-body text-black">
                      {article.description}
                    </p>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <p className="font-mono text-body-main">
              No articles found with this tag.
            </p>
          )}

          <div className="mt-12 border-t border-black pt-8">
            <Link
              to="/blog"
              className="font-mono font-medium text-ui-label uppercase text-blue-accent no-underline hover:underline"
            >
              ← Back to Blog Index
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagPage;
