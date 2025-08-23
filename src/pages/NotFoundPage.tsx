import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const NotFoundPage: React.FC = () => {
  return (
    <div>
      <Helmet>
        <title>404: Page Not Found | Svitlogics</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="container-main pt-16 pb-16 text-center">
        <h1 className="font-mono font-bold text-h1-mobile uppercase md:text-h1-desktop text-black mb-4">
          404: PAGE NOT FOUND
        </h1>
        <p className="font-mono text-body-main mb-8 max-w-md mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="font-mono font-medium text-ui-label uppercase text-blue-accent no-underline hover:underline"
        >
          RETURN TO HOMEPAGE
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
