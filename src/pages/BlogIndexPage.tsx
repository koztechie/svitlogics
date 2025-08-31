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

const pageContent = {
  seoTitle: "Blog | AI, Text Analysis & System Updates | Svitlogics",
  seoDescription:
    "The official blog for the Svitlogics project. Read articles on AI text analysis, system updates, and the mission to counter information warfare.",
  pageTitle: "Svitlogics Blog",
  introParagraph:
    "This blog provides official updates, technical insights, and methodological discussions related to the Svitlogics project. It serves as a primary resource for understanding both the capabilities of our system and the principles that guide its development. We publish detailed articles covering a range of topics, including advanced techniques in AI-driven text analysis, the specific frameworks we use to detect propaganda and bias, and transparent reports on system updates and performance metrics. Readers can expect to find comprehensive explanations of our analytical models, case studies demonstrating the tool's application, and discussions on the evolving landscape of information warfare. Our objective is to equip journalists, researchers, and other professionals with the necessary knowledge to use Svitlogics effectively. We believe that transparent, in-depth communication is essential for fostering critical thinking and building trust in the tools designed to support it. This space is dedicated to that purpose, offering a clear view into our operations, research, and mission.",
};

const BlogIndexPage: React.FC = () => {
  const articles = getArticles();

  const uniqueTags = useMemo(() => {
    const allTags = articles.flatMap((article) => article.tags || []);
    return [...new Set(allTags)];
  }, [articles]);

  return (
    <>
      <Helmet>
        <title>{pageContent.seoTitle}</title>
        <meta name="description" content={pageContent.seoDescription} />
        <link rel="canonical" href="https://svitlogics.com/blog/" />
        <meta property="og:title" content={pageContent.seoTitle} />
        <meta property="og:description" content={pageContent.seoDescription} />
        <meta property="og:url" content="https://svitlogics.com/blog/" />
      </Helmet>
      <div className="container-main py-16">
        <div className="mx-auto max-w-prose">
          <header className="mb-12 text-left">
            <Heading as="h1" className="mb-4">
              {pageContent.pageTitle}
            </Heading>
            <p className="font-serif text-h4 text-carbon-black">
              {pageContent.introParagraph}
            </p>
          </header>
          {uniqueTags.length > 0 && (
            <section className="mb-12">
              <Heading
                as="h2"
                className="mb-4 text-small font-semibold text-neutral-700"
              >
                Filter by Tag
              </Heading>
              <div className="flex flex-wrap gap-2">
                {uniqueTags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/blog/tag/${slugify(tag)}/`}
                    className="block border border-neutral-500 px-3 py-1 font-sans text-small text-carbon-black transition-colors hover:border-carbon-black hover:bg-neutral-300"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </section>
          )}
          {articles.length > 0 ? (
            <div className="space-y-12">
              {articles.map((article) => (
                <article key={article.slug}>
                  <Link to={`/blog/${article.slug}/`}>
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
