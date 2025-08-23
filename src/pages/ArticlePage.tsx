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
    // Раннє повернення, якщо slug ще не визначено (напр., при першому рендері).
    if (!slug) {
      setState({ status: "loading", article: null, mdxSource: null });
      return;
    }

    const findAndSerializeArticle = async () => {
      // Обгортаємо в try/catch для обробки будь-яких помилок,
      // включаючи помилки читання з `getArticles`.
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
  }, [slug]); // Ефект залежить лише від `slug`.

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
 * Винесено за межі компонента для запобігання повторному створенню.
 * @type {MDXRemoteProps['components']}
 */
const mdxComponents: MDXRemoteProps["components"] = {
  h2: (props) => (
    <h2
      className="font-mono font-semibold text-h2-mobile normal-case text-black mt-10 mb-4 lg:text-h2-desktop"
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
  ul: (props) => <ul className="list-disc space-y-2 ml-6 mb-6" {...props} />,
  li: (props) => (
    <li
      className="font-mono font-normal text-body-main leading-body text-black"
      {...props}
    />
  ),
  a: (props) => <a className="text-blue-accent hover:underline" {...props} />,
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
  <div className="container-main pt-16 pb-16 text-center">
    <p className="font-mono text-body-main">LOADING ARTICLE...</p>
  </div>
));
LoadingState.displayName = "LoadingState";

const NotFoundState: React.FC = React.memo(() => (
  <>
    <Helmet>
      <title>404: ARTICLE NOT FOUND | SVITLOGICS</title>
      <meta name="robots" content="noindex" />
    </Helmet>
    <div className="container-main pt-16 pb-16 text-center">
      <h1 className="font-mono font-bold text-h1-mobile normal-case text-black mb-4 md:uppercase lg:text-h1-desktop">
        404: Article Not Found
      </h1>
      <p className="font-mono text-body-main mb-8">
        The requested article does not exist.
      </p>
      <Link
        to="/blog"
        className="font-mono font-medium uppercase text-ui-label text-blue-accent no-underline hover:underline"
      >
        ← RETURN TO BLOG INDEX
      </Link>
    </div>
  </>
));
NotFoundState.displayName = "NotFoundState";

const ErrorState: React.FC = React.memo(() => (
  <div className="container-main pt-16 pb-16 text-center">
    <h1 className="font-mono font-bold text-h1-mobile normal-case text-black mb-4 md:uppercase lg:text-h1-desktop">
      Error Loading Article
    </h1>
    <p className="font-mono text-body-main">
      There was an error loading the article. Please try again later.
    </p>
  </div>
));
ErrorState.displayName = "ErrorState";

/**
 * @description Сторінка для відображення однієї статті блогу.
 * Керує завантаженням, серіалізацією та рендерингом MDX-контенту.
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

      <div className="container-main pt-16 pb-16">
        <article className="mx-auto max-w-3xl">
          <header className="border-b border-black pb-8 mb-8">
            <Link
              to="/blog"
              className="block font-mono font-medium uppercase text-ui-label text-blue-accent no-underline hover:underline mb-8"
            >
              ← RETURN TO BLOG INDEX
            </Link>
            <h1 className="font-mono font-bold text-h1-mobile normal-case text-black mb-4 md:uppercase lg:text-h1-desktop">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-3 font-mono normal-case text-ui-label text-text-secondary">
              <time dateTime={article.createdAt}>{formattedDate}</time>
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
            <footer className="border-t border-black pt-8 mt-8">
              <h2 className="font-mono uppercase text-ui-label text-black mb-4">
                TAGS
              </h2>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/blog/tag/${slugify(tag)}`}
                    className="block rounded-none border border-black bg-white px-3 py-1 font-mono text-black text-ui-label transition-colors duration-100 hover:border-blue-accent hover:text-blue-accent"
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
