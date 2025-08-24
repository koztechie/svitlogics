import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getArticles, Article } from "../articles";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import OptimizedImage from "../components/OptimizedImage";

// --- Типи, Константи та Кастомні Хуки ---

/** @description Визначає можливі стани завантаження сторінки. */
type PageState = "loading" | "found" | "not-found" | "error";

/** @description Визначає структуру стану, керованого кастомним хуком. */
interface ArticleState {
  status: PageState;
  article: Article | null;
  mdxSource: MDXRemoteProps | null;
}

/**
 * @description Кастомний хук для інкапсуляції логіки пошуку статті та її серіалізації.
 * @param {string | undefined} slug - URL-slug статті з `useParams`.
 * @returns {ArticleState} Об'єкт, що містить поточний стан завантаження та дані.
 */
const useArticleData = (slug?: string): ArticleState => {
  const [state, setState] = useState<ArticleState>({
    status: "loading",
    article: null,
    mdxSource: null,
  });

  useEffect(() => {
    if (!slug) {
      setState({ status: "loading", article: null, mdxSource: null });
      return;
    }

    const findAndSerializeArticle = async () => {
      try {
        const allArticles = getArticles();
        const foundArticle = allArticles.find((a) => a.slug === slug);

        if (!foundArticle) {
          setState({ status: "not-found", article: null, mdxSource: null });
          return;
        }

        const source = await serialize(foundArticle.content, {
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug],
          },
        });

        setState({ status: "found", article: foundArticle, mdxSource: source });
      } catch (error) {
        console.error("Error fetching or serializing article:", error);
        setState({ status: "error", article: null, mdxSource: null });
      }
    };

    findAndSerializeArticle();
  }, [slug]);

  return state;
};

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

/**
 * @description Об'єкт з кастомними компонентами для рендерингу MDX.
 * @type {MDXRemoteProps['components']}
 */
const mdxComponents: MDXRemoteProps["components"] = {
  h2: (props) => (
    <h2
      className="mb-4 mt-8 font-semibold text-black text-h2-mobile lg:text-h2-desktop"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mb-4 mt-6 font-medium text-black text-h3-mobile lg:text-h3-desktop"
      {...props}
    />
  ),
  p: (props) => <p className="mb-4 text-body-main text-black" {...props} />,
  ul: (props) => <ul className="mb-4 ml-6 list-disc space-y-2" {...props} />,
  li: (props) => <li className="text-body-main text-black" {...props} />,
  a: (props) => (
    <a
      className="text-blue-accent no-underline hover:underline focus-visible:underline"
      {...props}
    />
  ),
  strong: (props) => <strong className="font-bold" {...props} />,
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    if (!props.src || !props.alt) {
      console.warn("MDX Image is missing 'src' or 'alt' attribute.", {
        src: props.src,
      });
      return null;
    }
    return <OptimizedImage src={props.src} alt={props.alt} {...props} />;
  },
};

// --- Мемоїзовані Підкомпоненти для станів сторінки ---

const LoadingState: React.FC = React.memo(() => (
  <div className="container-main text-center">
    <p className="text-body-main">LOADING ARTICLE...</p>
  </div>
));
LoadingState.displayName = "LoadingState";

const NotFoundState: React.FC = React.memo(() => (
  <>
    <Helmet>
      <title>404: ARTICLE NOT FOUND | SVITLOGICS</title>
      <meta name="robots" content="noindex" />
    </Helmet>
    <div className="container-main text-center">
      <h1 className="mb-4 font-bold text-black text-h1-mobile md:uppercase lg:text-h1-desktop">
        404: Article Not Found
      </h1>
      <p className="mb-8 text-body-main">
        The requested article does not exist.
      </p>
      <Link
        to="/blog"
        className="font-medium uppercase text-blue-accent text-ui-label no-underline hover:underline focus-visible:underline"
      >
        ← RETURN TO BLOG INDEX
      </Link>
    </div>
  </>
));
NotFoundState.displayName = "NotFoundState";

const ErrorState: React.FC = React.memo(() => (
  <div className="container-main text-center">
    <h1 className="mb-4 font-bold text-black text-h1-mobile md:uppercase lg:text-h1-desktop">
      Error Loading Article
    </h1>
    <p className="text-body-main">
      There was an error loading the article. Please try again later.
    </p>
  </div>
));
ErrorState.displayName = "ErrorState";

/**
 * @description Сторінка для відображення однієї статті блогу.
 * @component
 */
const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { status, article, mdxSource } = useArticleData(slug);

  const formattedDate = useMemo(() => {
    if (!article?.createdAt) return "";
    return new Date(article.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [article?.createdAt]);

  if (status === "loading") {
    return <LoadingState />;
  }
  if (status === "not-found") {
    return <NotFoundState />;
  }
  if (status === "error" || !article) {
    return <ErrorState />;
  }

  return (
    <>
      <Helmet>
        <title>{`${article.title} | SVITLOGICS`}</title>
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

      <div className="container-main">
        <article className="mx-auto max-w-3xl">
          <header className="mb-8 border-b-1 border-black pb-8">
            <Link
              to="/blog"
              className="mb-8 block font-medium uppercase text-blue-accent text-ui-label no-underline hover:underline focus-visible:underline"
            >
              ← RETURN TO BLOG INDEX
            </Link>
            <h1 className="mb-4 font-bold text-black text-h1-mobile md:uppercase lg:text-h1-desktop">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-3 text-text-secondary text-ui-label">
              <time dateTime={article.createdAt}>{formattedDate}</time>
              <span aria-hidden="true">•</span>
              <span>{article.author}</span>
            </div>
          </header>

          {mdxSource ? (
            <MDXRemote {...mdxSource} components={mdxComponents} />
          ) : (
            <p className="text-body-main">Rendering content...</p>
          )}

          {article.tags && article.tags.length > 0 && (
            <footer className="mt-8 border-t-1 border-black pt-8">
              <h2 className="mb-4 font-medium uppercase text-black text-ui-label">
                TAGS
              </h2>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/blog/tag/${slugify(tag)}`}
                    className="block border-1 border-black bg-white px-3 py-1 text-black text-ui-label transition-colors duration-100 hover:text-blue-accent"
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

export default ArticlePage;
