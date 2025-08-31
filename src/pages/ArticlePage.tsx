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

/**
 * @interface ArticlePageProps
 * @description Defines the props for the ArticlePage component.
 * @property {Article} [ssrArticle] - Optional article data provided during SSR
 * to bypass client-side fetching and ensure immediate rendering.
 */
interface ArticlePageProps {
  ssrArticle?: Article;
}

const ArticlePage: React.FC<ArticlePageProps> = ({ ssrArticle }) => {
  const { slug } = useParams<{ slug: string }>();

  // --- ВИПРАВЛЕННЯ ТУТ: Ініціалізуємо стан з SSR-даних, якщо вони є ---
  const [article, setArticle] = useState<Article | null | undefined>(
    ssrArticle || undefined
  );
  const [mdxSource, setMdxSource] = useState<MDXRemoteProps | null>(null);

  useEffect(() => {
    const processArticleContent = async (articleToProcess: Article) => {
      // Серіалізуємо MDX контент лише один раз.
      if (mdxSource) return;
      try {
        const source = await serialize(articleToProcess.content, {
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
    };

    if (article) {
      // Якщо дані про статтю вже є (з SSR або попереднього фетчу), обробляємо контент.
      processArticleContent(article);
    } else {
      // Цей блок виконується ТІЛЬКИ на клієнті при прямому переході або оновленні сторінки.
      const allArticles = getArticles();
      const foundArticle = allArticles.find((a) => a.slug === slug);
      setArticle(foundArticle || null);
    }
  }, [slug, article, mdxSource]); // Додано залежності для стабільності

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
            to="/blog/"
            className="font-sans text-small text-svitlogics-blue hover:underline"
          >
            ← Return to Blog Index
          </Link>
        </div>
      </>
    );
  }

  // Critical Error State (e.g., malformed data)
  if (!article.title) {
    return (
      <div className="container-main py-16 text-center">
        <p className="font-serif text-body text-signal-red">
          Critical Error: Article data is incomplete (missing title).
        </p>
      </div>
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
              to="/blog/"
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
                    to={`/blog/tag/${slugify(tag)}/`}
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
