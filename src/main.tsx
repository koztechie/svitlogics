/**
 * Svitlogics Client Entry Point
 *
 * Adherence to The Ethos-Driven Design System:
 * - Section Alpha (Design is an Act of Resistance): This file establishes the
 *   foundational runtime environment with严肃 precision, rejecting all
 *   unnecessary embellishments.
 * - Section Bravo (Clarity is a Moral Imperative): Provider hierarchy is
 *   minimal and purpose-driven. Error messaging is diagnostic, not apologetic.
 * - Section Bravo (Engineered for Focus): StrictMode enforcement ensures
 *   disciplined component behavior and predictable system performance.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

/**
 * The client-side entry point for the Svitlogics application.
 * This file is responsible for mounting the root React component into the DOM.
 *
 * Adherence to The Ethos-Driven Design System:
 * - Section Bravo (Clarity is a Moral Imperative): The provider hierarchy
 *   (HelmetProvider, BrowserRouter) is the minimal set required for core
 *   functionality, demonstrating a "ruthless economy of design".
 * - Section Bravo (Diagnostic Error Messages): The error handling for the root
 *   element is diagnostic, not apologetic, immediately identifying a critical
 *   failure in the application's HTML structure.
 * - Section Bravo (Engineered for Focus): The use of <StrictMode> enforces
 *   best practices and helps identify potential problems, contributing to the
 *   overall stability and predictability of the system.
 */
const rootElement = document.getElementById("root");

// Protocol-compliant diagnostic error. It states the failure condition directly.
if (!rootElement) {
  throw new Error(
    "Critical Failure: The root DOM element with ID 'root' was not found."
  );
}

createRoot(rootElement).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
