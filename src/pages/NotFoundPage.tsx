import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>404: Page Not Found | Svitlogics</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="flex flex-col items-center justify-center min-h-screen text-center container-main">
        <h1 className="font-mono font-bold text-h1-mobile md:text-h1-desktop uppercase text-black mb-4">
          404: PAGE NOT FOUND
        </h1>
        <p className="font-mono text-body-main text-black mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="font-mono font-medium text-link-desktop text-accent-main hover:underline"
        >
          GO TO HOMEPAGE
        </Link>
      </div>
    </>
  );
};

export default NotFoundPage;
