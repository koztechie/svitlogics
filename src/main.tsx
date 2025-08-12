import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import TagManager from "react-gtm-module";

import App from "./App";
import "./index.css";

const GTM_ID = import.meta.env.VITE_GTM_ID;

// Find the root element in the HTML document
const rootElement = document.getElementById("root");

// Ensure the root element exists before attempting to render the app
if (!rootElement) {
  throw new Error(
    "Failed to find the root element with ID 'root'. Please check your index.html file."
  );
}

// Initialize Google Tag Manager if GTM_ID is provided
if (GTM_ID) {
  TagManager.initialize({ gtmId: GTM_ID });
}

// Create a root and render the application
createRoot(rootElement).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
