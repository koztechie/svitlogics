import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getArticles, Article } from "../articles";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
// ВИДАЛЕНО: import rehypeAutolinkHeadings from "rehype-autolink-headings";

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
        <meta name="description" content={article.summary} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.summary} />
        <meta property="og:type" content="article" />
        <link
          rel="canonical"
          href={`https://svitlogics.com/blog/${article.slug}`}
        />
        <meta
          property="og:url"
          content={`https://svitlogics.com/blog/${article.slug}`}
        />
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
            <div className="flex flex-wrap items-center gap-x-3 font-mono text-ui-label text-black normal-case">
              <span>{article.date}</span>
              {article.category && (
                <>
                  <span aria-hidden="true">•</span>
                  <Link
                    to={`/blog/category/${article.category
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="text-blue-accent hover:underline"
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
          </header>

          {mdxSource ? (
            <MDXRemote {...mdxSource} components={mdxComponents} />
          ) : (
            <p>Rendering content...</p>
          )}
        </article>
      </div>
    </div>
  );
};

export default ArticlePage;
