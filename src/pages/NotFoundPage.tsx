/**
 * Svitlogics 404 Not Found Page
 *
 * Adherence to The Ethos-Driven Design System:
 * - Section Alpha (Design is an Act of Resistance): This page presents
 *   error information in a sober, structured manner, stripped of all non-essential
 *   visual elements and decorative attributes. It is a direct, functional response
 *   to a navigation error.
 * - Section Alpha (Interface is a Laboratory): The design is calibrated for
 *   precision and objectivity, serving as a clear, predictable error state.
 * - Section Bravo (Clarity is a Moral Imperative): The error message is
 *   unambiguous and diagnostic, not apologetic. It clearly states the failure
 *   condition and provides a single, clear path forward.
 * - Section Charlie (Chromatic System): Employs the prescribed palette for
 *   text (Carbon Black, Svitlogics Blue) and background (Paper White).
 * - Section Echo (Spatial System): Enforces disciplined spacing using the 8px
 *   grid system and constrains content to `max-w-prose` for optimal readability.
 *   The centered layout creates a sense of order and calm.
 * - Section Delta (Typography): Uses 'Inter' (`font-sans`) for headings and
 *   links, and 'Lora' (`font-serif`) for body copy, maintaining UI/Instrument distinction.
 * - Section Foxtrot (Component Architecture): Embodies a purely functional
 *   error container with no decorative attributes or shadows.
 * - Section Hotel (Copy & Tone of Voice): The content uses precise, technical
 *   language and avoids emotional or persuasive phrasing. The message is
 *   diagnostic, not apologetic.
 */

import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Heading } from "../components/ui/Heading";

/**
 * Renders the 404 error page for paths that do not match any route.
 * Adherence to The Ethos-Driven Design System:
 * - Section Hotel (Tone of Voice): The messaging is direct, clinical, and diagnostic,
 *   avoiding apologetic or colloquial language.
 * - Section Delta (Typography): Strictly follows the established typographic hierarchy,
 *   using the <Heading> component and system-defined text styles.
 * - Section Echo (Spatial System): The layout is clean, centered, and uses generous
 *   whitespace to maintain a sense of calm and order, even on an error page.
 */
const NotFoundPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>404: Not Found | Svitlogics</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="container-main py-16 text-center">
        <div className="mx-auto max-w-prose">
          <Heading as="h1" className="mb-4">
            404: Not Found
          </Heading>
          <p className="mb-8 font-serif text-body text-carbon-black">
            The requested resource could not be located. The page may have been
            moved or does not exist.
          </p>
          <Link
            to="/"
            className="font-sans text-body text-svitlogics-blue hover:underline"
          >
            Return to Analysis Processor
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
