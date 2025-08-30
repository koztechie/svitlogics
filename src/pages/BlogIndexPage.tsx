/**
 * Svitlogics Blog Index Page
 *
 * Adherence to The Ethos-Driven Design System:
 * - Section Alpha (Design is an Act of Resistance): This page presents
 *   information in a sober, structured manner, stripped of all non-essential
 *   visual elements and decorative attributes.
 * - Section Alpha (Interface is a Laboratory): The design is calibrated for
 *   precision and objectivity, serving as a clear, predictable information resource.
 * - Section Bravo (Clarity is a Moral Imperative): The content structure,
 *   article listing, and tag filtering are unambiguous and purpose-driven.
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
import { Link } from "react-router-dom";
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
 * Renders the main index page for the blog.
 * Adherence to The Ethos-Driven Design System:
 * - Section Delta (Typography): Strictly follows the hierarchy. Page title and article
 *   headings use 'Inter' (`font-sans`), while article descriptions use 'Lora' (`font-serif`).
 * - Section Echo (Spatial System): The content area is constrained to `max-w-prose`
 *   for optimal readability.
 * - Section Foxtrot (Component Architecture): Article links are presented as clean,
 *   unadorned blocks of text, avoiding decorative containers. Interaction is focused
 *   on the heading.
 */
const BlogIndexPage: React.FC = () => {
  const articles = getArticles();

  const uniqueTags = useMemo(() => {
    const allTags = articles.flatMap((article) => article.tags || []);
    return [...new Set(allTags)];
  }, [articles]);

  return (
    <>
      <Helmet>
        <title>Svitlogics Blog</title>
        <meta
          name="description"
          content="Articles and system updates from Svitlogics."
        />
        <link rel="canonical" href="https://svitlogics.com/blog/" />
        <meta property="og:title" content="Svitlogics Blog" />
        <meta
          property="og:description"
          content="Articles and system updates from Svitlogics."
        />
        <meta property="og:url" content="https://svitlogics.com/blog/" />
      </Helmet>

      <div className="container-main py-16">
        <div className="mx-auto max-w-prose">
          <Heading as="h1" className="mb-12 text-left">
            Svitlogics Blog
          </Heading>

          {uniqueTags.length > 0 && (
            <section className="mb-12">
              <h2 className="mb-4 font-sans text-small font-semibold text-neutral-700">
                Filter by Tag
              </h2>
              <div className="flex flex-wrap gap-2">
                {uniqueTags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/blog/tag/${slugify(tag)}`}
                    className="block border border-neutral-500 px-3 py-1 font-sans text-small text-carbon-black transition-colors hover:border-carbon-black hover:bg-neutral-300"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {articles.length > 0 ? (
            <div className="space-y-10">
              {articles.map((article) => (
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
              No articles are currently available.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogIndexPage;
