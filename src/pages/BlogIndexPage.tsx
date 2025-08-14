import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { articles } from "../articles";

const BlogIndexPage: React.FC = () => {
  return (
    <div className="container-main my-12">
      <Helmet>
        <title>Svitlogics Blog</title>
        <meta
          name="description"
          content="Read the latest articles and updates from the Svitlogics team."
        />
        <meta property="og:title" content="Svitlogics Blog" />
        <meta
          property="og:description"
          content="Read the latest articles and updates from the Svitlogics team."
        />
        <link rel="canonical" href="https://svitlogics.com/blog" />
      </Helmet>

      <header>
        <h1 className="font-mono font-bold text-h1-mobile normal-case md:uppercase lg:text-h1-desktop text-black mb-12 text-left">
          Svitlogics Blog
        </h1>
      </header>

      <div className="space-y-8">
        {articles.map((article) => (
          <Link
            key={article.slug}
            to={`/blog/${article.slug}`}
            className="block border border-black p-4 bg-white rounded-none transition-colors duration-100 hover:bg-gray-100"
          >
            <article>
              <h2 className="font-mono font-medium text-h3-desktop normal-case text-blue-accent mb-2">
                {article.title}
              </h2>
              <p className="font-mono text-ui-label text-text-secondary normal-case mb-4">
                {article.date}
              </p>
              <p className="font-mono font-normal text-body-main leading-body text-black">
                {article.summary}
              </p>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogIndexPage;
