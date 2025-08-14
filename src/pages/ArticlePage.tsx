import React from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Helmet } from "react-helmet-async";
import { articles } from "../articles";
import { Article } from "../articles"; // Import the Article interface

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article: Article | undefined = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="container-main my-12 text-center">
        <h1 className="text-2xl font-bold">Article not found</h1>
      </div>
    );
  }

  return (
    <div className="container-main my-12">
      <Helmet>
        <title>{article.title}</title>
        <meta name="description" content={article.summary} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.summary} />
        <link
          rel="canonical"
          href={`https://svitlogics.com/blog/${article.slug}`}
        />
      </Helmet>

      <article className="space-y-6 max-w-3xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold">{article.title}</h1>
          <p className="text-lg text-gray-500 mt-2">{article.date}</p>
        </header>

        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h2: ({ ...props }) => (
              <h2
                className="font-mono font-semibold text-h2-mobile lg:text-h2-desktop text-black normal-case"
                {...props}
              />
            ),
            h3: ({ ...props }) => (
              <h3
                className="font-mono font-medium text-h3-desktop normal-case text-black mt-8 mb-4"
                {...props}
              />
            ),
            p: ({ ...props }) => (
              <p
                className="font-mono font-normal text-body-main leading-body text-black"
                {...props}
              />
            ),
            ul: ({ ...props }) => (
              <ul className="list-disc ml-6 space-y-2" {...props} />
            ),
            li: ({ ...props }) => (
              <li
                className="font-mono font-normal text-body-main leading-body text-black"
                {...props}
              />
            ),
          }}
        >
          {article.content}
        </ReactMarkdown>
      </article>
    </div>
  );
};

export default ArticlePage;
