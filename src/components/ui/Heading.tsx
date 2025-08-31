/**
 * Svitlogics Heading Component
 *
 * Adherence to The Ethos-Driven Design System:
 * - Section Alpha (Design is an Act of Resistance): This component is a
 *   sober, functional typographic element, stripped of all non-essential visual
 *   elements and decorative attributes.
 * - Section Alpha (Interface is a Laboratory): The design is calibrated for
 *   precision and objectivity, serving as a clear, predictable text element.
 * - Section Bravo (Clarity is a Moral Imperative): The component's purpose and
 *   structure are unambiguous. It is a transparent instrument for consistent typography.
 * - Section Charlie (Chromatic System): As a text element, it inherits the
 *   default text color (Carbon Black) and does not introduce any non-semantic colors.
 * - Section Delta (Typographic Hierarchy): This is the direct, authoritative
 *   implementation of the system's typographic scale. It correctly maps each
 *   heading level (`h1`-`h4`) to its specified `font-size`, `font-weight`,
 *   `line-height`, and `letter-spacing` via pre-configured Tailwind classes.
 *   It mandates the use of the 'Inter' typeface (`font-sans`) for all UI text,
 *   creating a clear distinction from the 'Lora' typeface used for analyzed content.
 * - Section Echo (Spatial System): While this component does not directly control
 *   spacing, it integrates with the overall spatial system by providing predictable
 *   typographic elements that other layout components can reliably space.
 * - Section Foxtrot (Component Architecture): Embodies a purely functional
 *   typographic component with no decorative attributes, shadows, or visual embellishments.
 *   Its function is purely to render headings according to the system specification.
 * - Section Hotel (Copy & Tone of Voice): The component's documentation uses
 *   precise, technical language.
 */

import React from "react";
import { clsx } from "clsx";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** The semantic and stylistic level of the heading. Determines the rendered HTML tag. */
  as: HeadingLevel;
  /** Additional CSS classes for custom styling. */
  className?: string;
  /** The content to be rendered inside the heading. Made optional for compatibility. */
  children?: React.ReactNode;
}

/**
 * The primary component for rendering all levels of headings within the Svitlogics interface.
 * It enforces strict adherence to the typographic hierarchy, ensuring visual consistency
 * and semantic correctness across the entire system.
 *
 * Adherence to The Ethos-Driven Design System:
 * - Section Delta (Typographic Hierarchy): This component is the direct implementation
 *   of the typographic scale. It correctly maps each heading level (`h1`-`h4`) to its
 *   specified `font-size`, `font-weight`, `line-height`, and `letter-spacing` via
 *   pre-configured Tailwind classes. It mandates the use of the 'Inter' typeface
 *   (`font-sans`) for all UI text.
 * - Section Bravo (Clarity is a Moral Imperative): By centralizing heading styles, this
 *   component eliminates ambiguity and prevents deviations from the established system,
 *   ensuring every heading is rendered with a single, unambiguous meaning and style.
 */
export const Heading: React.FC<HeadingProps> = React.memo(
  ({ as: Component, className, children, ...props }) => {
    // Mapping of the 'as' prop to the corresponding typographic utility class.
    // These classes are defined in `tailwind.config.js` and sourced from Section Delta.
    const levelClasses: Record<HeadingLevel, string> = {
      h1: "text-h1",
      h2: "text-h2",
      h3: "text-h3",
      h4: "text-h4",
    };

    return (
      <Component
        className={clsx("font-sans", levelClasses[Component], className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = "Heading";
