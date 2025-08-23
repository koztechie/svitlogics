import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, HelmetServerState } from "react-helmet-async";
import App from "./App";

interface HelmetContext {
  helmet?: HelmetServerState;
}

export function render(path: string) {
  const helmetContext: HelmetContext = {};

  const appHtml = ReactDOMServer.renderToString(
    // ВИДАЛЕНО: ConsentProvider
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={path}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  );

  const { helmet } = helmetContext;
  return { appHtml, helmet };
}
