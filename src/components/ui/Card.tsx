/**
 * Svitlogics Card Component
 *
 * Adherence to The Ethos-Driven Design System:
 * - Section Alpha (Design is an Act of Resistance): This component is a
 *   sober, functional container, stripped of all non-essential visual elements.
 * - Section Alpha (Interface is a Laboratory): The design is calibrated for
 *   precision and objectivity, serving as a neutral vessel for content.
 * - Section Bravo (Clarity is a Moral Imperative): The component's purpose and
 *   structure are unambiguous. It is a transparent instrument.
 * - Section Charlie (Chromatic System): Employs the prescribed palette for
 *   background (Paper White) and UI scaffolding (Neutral-500 border).
 * - Section Echo (Spatial System): Applies a disciplined 16px (2 unit) padding,
 *   aligning with the 8px grid system to create a predictable rhythm.
 * - Section Foxtrot (Component Architecture): This is a pure, functional
 *   container. It has no decorative attributes, shadows, or rounded corners.
 *   It is an extension of its function: to group and separate content.
 */

import React from "react";
import { clsx } from "clsx";

type CardProps<C extends React.ElementType> = {
  /**
   * The HTML tag or React component to render.
   * @default 'div'
   */
  as?: C;
  /** Additional CSS classes for custom styling. */
  className?: string;
  /** The content to be rendered inside the card. */
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<C>;

// Inner component definition for clean memoization of a generic component.
const InnerCard = <C extends React.ElementType = "div">({
  as,
  className,
  children,
  ...props
}: CardProps<C>) => {
  const Component = as || "div";

  // Base classes are a direct implementation of the design protocol's
  // requirements for UI scaffolding and spatial rhythm. The border is a
  // subtle neutral gray to avoid drawing unnecessary attention.
  const baseClasses = "border border-neutral-500 bg-paper-white p-4";

  return (
    <Component className={clsx(baseClasses, className)} {...props}>
      {children}
    </Component>
  );
};

/**
 * A foundational, polymorphic container component for grouping related content.
 * It serves as a low-emphasis structural element on the interface canvas.
 *
 * Adherence to The Ethos-Driven Design System:
 * - Section Charlie (Chromatic System): Uses `bg-paper-white` to integrate with
 *   the canvas and a subtle `border-neutral-500` as prescribed for UI scaffolding,
 *   avoiding the visual harshness of a primary border.
 * - Section Echo (Spatial System): Employs a consistent internal padding of `16px`
 *   (`p-4`), which corresponds to the `2 unit` base defined in the grid system.
 * - Section Foxtrot (Component Architecture): Embodies a purely functional container
 *   with no decorative elements, sharp corners, or shadows, reflecting the
 *   "Interface is a Laboratory" axiom.
 */
const CardComponent = <C extends React.ElementType = "div">(
  props: CardProps<C>
): React.ReactElement => {
  return <InnerCard {...props} />;
};

CardComponent.displayName = "Card";

export const Card = React.memo(CardComponent) as <
  C extends React.ElementType = "div"
>(
  props: CardProps<C>
) => React.ReactElement;
