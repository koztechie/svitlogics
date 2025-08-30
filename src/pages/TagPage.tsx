/**
 * Svitlogics Tag Page
 *
 * Adherence to The Ethos-Driven Design System:
 * - Section Alpha (Design is an Act of Resistance): This page presents
 *   information in a sober, structured manner, stripped of all non-essential
 *   visual elements and decorative attributes.
 * - Section Alpha (Interface is a Laboratory): The design is calibrated for
 *   precision and objectivity, serving as a clear, predictable information resource.
 * - Section Bravo (Clarity is a Moral Imperative): The content structure,
 *   article listing, and navigation are unambiguous and purpose-driven.
 * - Section Charlie (Chromatic System): Employs the prescribed palette for
 *   text (Carbon Black, Neutral grays, Svitlogics Blue) and background (Paper White).
 * - Section Echo (Spatial System): Enforces disciplined spacing using the 8px
 *   grid system and constrains content to `max-w-prose` for optimal readability.
 * - Section Delta (Typography): Uses 'Inter' (`font-sans`) for headings and UI elements,
 *   and 'Lora' (`font-serif`) for article descriptions, maintaining UI/Instrument distinction.
 * - Section Foxtrot (Component Architecture): Embodies a purely informational
 *   container with no decorative attributes or shadows. Article links are clean blocks.
 * - Section Hotel (Copy & Tone of Voice): The content uses precise, technical
 *   language and avoids emotional or persuasive phrasing.
 */

import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getArticles } from "../articles";
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
 * Renders a page listing all articles associated with a specific tag.
 * Adherence to The Ethos-Driven Design System:
 * - Section Delta (Typography): Strictly follows the hierarchy. Page title and article
 *   headings use 'Inter' (`font-sans`), while article descriptions use 'Lora' (`font-serif`).
 * - Section Echo (Spatial System): The content area is constrained to `max-w-prose`
 *   for optimal readability.
 * - Section Foxtrot (Component Architecture): Article links are presented as clean,
 *   unadorned blocks of text, avoiding decorative containers.
 */
const TagPage: React.FC = () => {
  const { tagSlug } = useParams<{ tagSlug: string }>();

  const filteredArticles = useMemo(() => {
    const allArticles = getArticles();
    if (!tagSlug) return [];
    return allArticles.filter((article) =>
      article.tags?.some((tag) => slugify(tag) === tagSlug)
    );
  }, [tagSlug]);

  const tagName = useMemo(() => {
    if (!tagSlug) return "";
    const firstArticle = filteredArticles[0];
    return (
      firstArticle?.tags?.find((t) => slugify(t) === tagSlug) ||
      tagSlug.replace(/-/g, " ")
    );
  }, [filteredArticles, tagSlug]);

  return (
    <>
      <Helmet>
        <title>{`Tag: ${tagName} | Svitlogics Blog`}</title>
        <meta
          name="description"
          content={`Articles tagged with "${tagName}" on the Svitlogics blog.`}
        />
        <link
          rel="canonical"
          href={`https://svitlogics.com/blog/tag/${tagSlug}/`}
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
          content={`https://svitlogics.com/blog/tag/${tagSlug}/`}
        />
      </Helmet>

      <div className="container-main py-16">
        <div className="mx-auto max-w-prose">
          <p className="mb-2 font-sans text-small font-semibold text-neutral-700">
            Tag
          </p>
          <Heading as="h1" className="mb-12 text-left capitalize">
            {tagName}
          </Heading>

          {filteredArticles.length > 0 ? (
            <div className="space-y-10">
              {filteredArticles.map((article) => (
                <article key={article.slug}>
                  <Link to={`/blog/${article.slug}`}>
                    <Heading
                      as="h2"
                      className="mb-2 text-svitlogics-blue hover:underline"
                    >
                      {article.title}
                    </Heading>
                  </Link>
                  <div className="mb-4 flex flex-wrap items-center gap-x-3 font-sans text-small text-neutral-700">
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
                  <p className="font-serif text-body text-carbon-black">
                    {article.description}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <p className="font-serif text-body text-neutral-700">
              No articles were found for this tag.
            </p>
          )}

          <div className="mt-12 border-t border-carbon-black pt-8">
            <Link
              to="/blog"
              className="font-sans text-small text-svitlogics-blue hover:underline"
            >
              ← Return to Blog Index
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default TagPage;
