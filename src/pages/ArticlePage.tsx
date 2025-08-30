import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getArticles, Article } from "../articles";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
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

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null | undefined>(undefined);
  const [mdxSource, setMdxSource] = useState<MDXRemoteProps | null>(null);

  useEffect(() => {
    const findAndSerializeArticle = async () => {
      const allArticles = getArticles();
      const foundArticle = allArticles.find((a) => a.slug === slug);
      setArticle(foundArticle || null);

      if (foundArticle) {
        try {
          const source = await serialize(foundArticle.content, {
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug],
            },
          });
          setMdxSource(source);
        } catch (error) {
          console.error("Error serializing MDX:", error);
          setMdxSource(null);
        }
      }
    };
    findAndSerializeArticle();
  }, [slug]);

  // Loading State
  if (article === undefined) {
    return (
      <div className="container-main py-16 text-center">
        <p className="font-serif text-body text-neutral-700">
          Loading article data...
        </p>
      </div>
    );
  }

  // Not Found State
  if (article === null) {
    return (
      <>
        <Helmet>
          <title>404: Not Found | Svitlogics</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="container-main py-16 text-center">
          <Heading as="h1" className="mb-4">
            404: Not Found
          </Heading>
          <p className="mb-8 font-serif text-body">
            The requested article could not be located.
          </p>
          <Link
            to="/blog/" // Додано слеш
            className="font-sans text-small text-svitlogics-blue hover:underline"
          >
            ← Return to Blog Index
          </Link>
        </div>
      </>
    );
  }

  // Article Found State
  return (
    <>
      <Helmet>
        <title>{`${article.title} | Svitlogics Blog`}</title>
        <meta name="description" content={article.description} />
        {article.robots && <meta name="robots" content={article.robots} />}
        <link
          rel="canonical"
          href={
            article.canonicalUrl ||
            `https://svitlogics.com/blog/${article.slug}/`
          }
        />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.description} />
        <meta
          property="og:url"
          content={`https://svitlogics.com/blog/${article.slug}/`}
        />
        <meta property="og:type" content="article" />
        {article.schema && (
          <script type="application/ld+json">{article.schema}</script>
        )}
      </Helmet>

      <div className="container-main py-16">
        <article className="mx-auto max-w-prose">
          <header className="mb-12 border-b border-carbon-black pb-8">
            <Link
              to="/blog/" // Додано слеш
              className="mb-8 block font-sans text-small text-svitlogics-blue hover:underline"
            >
              ← Return to Blog Index
            </Link>
            <Heading as="h1" className="mb-4">
              {article.title}
            </Heading>
            <div className="flex flex-wrap items-center gap-x-3 font-sans text-small text-neutral-700">
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
          </header>

          {/* --- ВИПРАВЛЕННЯ ТУТ: Додано клас для стилізації MDX --- */}
          <div className="prose-styles">
            {mdxSource ? (
              <MDXRemote {...mdxSource} />
            ) : (
              <p className="font-serif text-body text-neutral-700">
                Rendering content...
              </p>
            )}
          </div>

          {article.tags && article.tags.length > 0 && (
            <footer className="mt-12 border-t border-carbon-black pt-8">
              <Heading
                as="h4"
                className="mb-4 font-sans text-small font-semibold text-neutral-700"
              >
                Tags
              </Heading>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/blog/tag/${slugify(tag)}/`} // Додано слеш
                    className="block border border-neutral-500 px-3 py-1 font-sans text-small text-carbon-black transition-colors hover:border-carbon-black hover:bg-neutral-300"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </footer>
          )}
        </article>
      </div>
    </>
  );
};

export default React.memo(ArticlePage);
