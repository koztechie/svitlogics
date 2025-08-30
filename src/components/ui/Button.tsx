/**
 * Svitlogics Button Component
 *
 * Adherence to The Ethos-Driven Design System:
 * - Section Alpha (Design is an Act of Resistance): This component is a
 *   sober, functional interactive element, stripped of all non-essential visual
 *   elements and persuasive attributes.
 * - Section Alpha (Interface is a Laboratory): The design is calibrated for
 *   precision and objectivity, serving as a clear, predictable control.
 * - Section Bravo (Clarity is a Moral Imperative): The component's purpose,
 *   variants, and behavior are unambiguous. It is a transparent instrument.
 * - Section Charlie (Chromatic System): Employs the prescribed palette for
 *   primary actions (Svitlogics Blue) and UI scaffolding (Carbon Black).
 * - Section Echo (Spatial System): Enforces a disciplined 32px (4 unit) height
 *   and uses grid-aligned padding, aligning with the 8px grid system.
 * - Section Foxtrot (Component Architecture): Embodies a purely functional
 *   control with sharp corners, no shadows, and imperative labeling.
 * - Section Golf (Motion Philosophy): Uses a subtle, brief transition for
 *   state changes, enhancing understanding without distraction.
 * - Section Hotel (Copy & Tone of Voice): The component's API and documentation
 *   use precise, technical language.
 */

import React from "react";
import { clsx } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Defines the button's role and visual hierarchy.
   * 'primary': For the principal action in a given context.
   * 'secondary': For supplementary actions.
   * @default 'secondary'
   */
  variant?: "primary" | "secondary";

  /**
   * Defines the button's padding and shape for different contexts.
   * 'default': Standard padding for text or mixed-content buttons.
   * 'icon': A square shape with minimal padding for icon-only buttons.
   * @default 'default'
   */
  size?: "default" | "icon";

  /** Additional CSS classes for custom styling. */
  className?: string;

  /** The content to be rendered inside the button. */
  children: React.ReactNode;
}

/**
 * The core interactive element for the Svitlogics system.
 * This component is engineered to be a direct implementation of the design protocol.
 *
 * Adherence to The Ethos-Driven Design System:
 * - Section Foxtrot (Component Architecture): Rectangular, sharp-cornered design.
 *   Relies on the global, unambiguous focus style.
 * - Section Delta (Typography): Uses 'Inter' (`font-sans`) at the 'small'
 *   scale (`text-small`) with the specified font weight of 400.
 * - Section Charlie (Chromatic System): Hover states provide subtle feedback via
 *   a 15% darken (`brightness-[85%]`) or a neutral background fill.
 * - Section Echo (Spatial System): Enforces a fixed, grid-aligned height (32px)
 *   on all variants to ensure visual consistency and predictability.
 */
export const Button: React.FC<ButtonProps> = React.memo(
  ({
    variant = "secondary",
    size = "default",
    className,
    children,
    ...props
  }) => {
    // A fixed height (h-8 = 32px) is enforced to ensure all buttons align perfectly,
    // regardless of their content (icon vs. text).
    const baseClasses =
      "inline-flex items-center justify-center font-sans text-small transition h-8 disabled:cursor-not-allowed disabled:opacity-40";

    const variantClasses = {
      primary:
        "border border-svitlogics-blue bg-svitlogics-blue text-paper-white hover:brightness-[85%]",
      secondary:
        "border border-carbon-black bg-transparent text-carbon-black hover:bg-neutral-300",
    };

    // The 'size' prop now exclusively controls width to maintain consistent height.
    const sizeClasses = {
      default: "px-4", // Horizontal padding for standard buttons
      icon: "w-8", // Fixed width to create a square button
    };

    return (
      <button
        className={clsx(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
