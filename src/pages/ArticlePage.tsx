/**
 * Svitlogics Article Page
 *
 * Adherence to The Ethos-Driven Design System:
 * - Section Alpha (Design is an Act of Resistance): This page presents
 *   information in a sober, structured manner, stripped of all non-essential
 *   visual elements and decorative attributes.
 * - Section Alpha (Interface is a Laboratory): The design is calibrated for
 *   precision and objectivity, serving as a clear, predictable information resource.
 * - Section Bravo (Clarity is a Moral Imperative): The content structure,
 *   article presentation, and navigation are unambiguous and purpose-driven.
 * - Section Charlie (Chromatic System): Employs the prescribed palette for
 *   text (Carbon Black, Neutral grays, Svitlogics Blue) and background (Paper White).
 * - Section Echo (Spatial System): Enforces disciplined spacing using the 8px
 *   grid system and constrains content to `max-w-prose` for optimal readability.
 * - Section Delta (Typography): Uses 'Inter' (`font-sans`) for headings and UI elements,
 *   and 'Lora' (`font-serif`) for article content via `prose-styles`, maintaining
 *   UI/Instrument distinction.
 * - Section Foxtrot (Component Architecture): Embodies a purely informational
 *   container with no decorative attributes or shadows.
 * - Section Hotel (Copy & Tone of Voice): The content uses precise, technical
 *   language and avoids emotional or persuasive phrasing. Loading and error states
 *   are diagnostic, not apologetic.
 */

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
 * Renders a single article page from MDX content.
 * Adherence to The Ethos-Driven Design System:
 * - Section Delta (Typography): This component strictly enforces the typographic
 *   separation. All UI chrome (headings, metadata) uses 'Inter' (`font-sans`),
 *   while the rendered MDX article content uses 'Lora' (`font-serif`) via the
 *   `prose-styles` class.
 * - Section Echo (Spatial System): The main article content is constrained to
 *   `max-w-prose` (75ch) for optimal readability.
 * - Section Hotel (Tone): Fallback states (Loading, 404) use direct, clinical language.
 */
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
            to="/blog"
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
            `https://svitlogics.com/blog/${article.slug}`
          }
        />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.description} />
        <meta
          property="og:url"
          content={`https://svitlogics.com/blog/${article.slug}`}
        />
        <meta property="og:type" content="article" />
        {article.schema && (
          <script type="application/ld+json">{article.schema}</script>
        )}
      </Helmet>

      <div className="container-main py-16">
        <article className="mx-auto max-w-prose">
          <header className="mb-8 border-b border-carbon-black pb-8">
            <Link
              to="/blog"
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
            <footer className="mt-8 border-t border-carbon-black pt-8">
              <h4 className="mb-4 font-sans text-small font-semibold text-neutral-700">
                Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/blog/tag/${slugify(tag)}`}
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

export default ArticlePage;
