import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getArticles, Article } from "../articles";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import OptimizedImage from "../components/OptimizedImage";

/**
 * A utility function to convert a string into a URL-friendly slug.
 * @param text The string to convert.
 * @returns The slugified string.
 */
const slugify = (text: string): string => {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
};

const mdxComponents: MDXRemoteProps["components"] = {
  h2: (props) => (
    <h2
      className="font-mono font-semibold text-h2-mobile lg:text-h2-desktop text-black normal-case mt-10 mb-4"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="font-mono font-medium text-h3-desktop normal-case text-black mt-8 mb-4"
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="font-mono font-normal text-body-main leading-body text-black mb-6"
      {...props}
    />
  ),
  ul: (props) => <ul className="list-disc ml-6 space-y-2 mb-6" {...props} />,
  li: (props) => (
    <li
      className="font-mono font-normal text-body-main leading-body text-black"
      {...props}
    />
  ),
  a: (props) => <a className="text-blue-accent hover:underline" {...props} />,
  strong: (props) => <strong className="font-bold" {...props} />,
  // --- ВИПРАВЛЕННЯ ТУТ: Overriding the default img tag ---
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    const { src, alt, ...rest } = props;
    if (!src || !alt) {
      // This is a content error. Log it and render nothing to avoid broken images.
      console.warn(
        "MDX Image is missing 'src' or 'alt' attribute and will not be rendered.",
        { src }
      );
      return null;
    }
    return <OptimizedImage src={src} alt={alt} {...rest} />;
  },
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

  if (article === undefined) {
    return (
      <div className="container-main pt-16 pb-16 text-center">
        <p className="font-mono text-body-main">Loading article...</p>
      </div>
    );
  }

  if (article === null) {
    return (
      <div>
        <Helmet>
          <title>404: Article Not Found | Svitlogics</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="container-main pt-16 pb-16 text-center">
          <h1 className="font-mono font-bold text-h1-mobile normal-case md:uppercase lg:text-h1-desktop text-black mb-4">
            404: Article Not Found
          </h1>
          <p className="font-mono text-body-main mb-8">
            The article you are looking for does not exist.
          </p>
          <Link
            to="/blog"
            className="font-mono font-medium text-ui-label uppercase text-blue-accent no-underline hover:underline"
          >
            ← Back to Blog Index
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>{`${article.title} | Svitlogics Blog`}</title>
        <meta name="description" content={article.description} />
        {article.robots && <meta name="robots" content={article.robots} />}
        <link
          rel="canonical"
          href={
            article.canonicalUrl ||
            `https://svitlogics.com/blog/${article.slug}`
          }
        />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.description} />
        <meta property="og:image" content={article.image} />
        <meta
          property="og:url"
          content={`https://svitlogics.com/blog/${article.slug}`}
        />
        <meta property="og:type" content="article" />
        {article.schema && (
          <script type="application/ld+json">{article.schema}</script>
        )}
      </Helmet>

      <div className="container-main pt-16 pb-16">
        <article className="max-w-3xl mx-auto">
          <header className="mb-8 border-b border-black pb-8">
            <Link
              to="/blog"
              className="block font-mono font-medium text-ui-label uppercase text-blue-accent no-underline hover:underline mb-8"
            >
              ← Back to Blog Index
            </Link>
            <h1 className="font-mono font-bold text-h1-mobile normal-case md:uppercase lg:text-h1-desktop text-black mb-4">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-3 font-mono text-ui-label text-text-secondary normal-case">
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

          {mdxSource ? (
            <MDXRemote {...mdxSource} components={mdxComponents} />
          ) : (
            <p>Rendering content...</p>
          )}

          {article.tags && article.tags.length > 0 && (
            <footer className="mt-8 pt-8 border-t border-black">
              <p className="font-mono text-ui-label uppercase text-black mb-4">
                TAGS
              </p>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/blog/tag/${slugify(tag)}`}
                    className="block border border-black rounded-none px-3 py-1 font-mono text-ui-label text-black bg-white transition-colors duration-100 hover:border-blue-accent hover:text-blue-accent"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </footer>
          )}
        </article>
      </div>
    </div>
  );
};

export default ArticlePage;
