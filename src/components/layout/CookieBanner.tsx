import React from "react";
import { useCookieConsent } from "../../hooks/useCookieConsent";

/**
 * @description
 * `CookieBanner` — це компонент, що відображається внизу екрана для отримання згоди
 * користувача на використання аналітичних cookies. Він з'являється лише в тому випадку,
 * якщо користувач ще не зробив свій вибір. Компонент є "чистим", оскільки не приймає
 * пропсів і повністю залежить від стану, наданого хуком `useCookieConsent`.
 *
 * @component
 * @example
 * // Вбудовується в кореневий layout застосунку
 * <Layout>
 *   <MainContent />
 *   <CookieBanner />
 * </Layout>
 */
const CookieBanner: React.FC = () => {
  const { consent, giveConsent } = useCookieConsent();

  // Раннє повернення, якщо користувач вже надав або відхилив згоду.
  // Це запобігає рендерингу решти JSX, коли компонент невидимий.
  if (consent !== null) {
    return null;
  }

  return (
    <section
      className="fixed bottom-0 left-0 right-0 z-50 border-t-2 border-black bg-white p-4"
      aria-labelledby="cookie-banner-heading"
      aria-live="polite"
      role="region"
    >
      <div className="container-main flex flex-col items-center justify-between gap-4 sm:flex-row">
        <h2 id="cookie-banner-heading" className="sr-only">
          Cookie Consent
        </h2>
        <p className="flex-grow font-mono text-body-main text-center sm:text-left">
          This application uses analytics cookies for service improvement. Your
          choice is stored for one year.
        </p>
        <div
          className="flex flex-shrink-0 items-center gap-x-3"
          role="group"
          aria-label="Cookie consent options"
        >
          <button
            type="button"
            onClick={() => giveConsent(false)}
            className="font-mono uppercase text-ui-label rounded-none border border-black bg-white px-4 py-2 text-black transition-colors duration-100 hover:bg-black hover:text-white"
          >
            REJECT
          </button>
          <button
            type="button"
            onClick={() => giveConsent(true)}
            className="font-mono uppercase text-ui-label rounded-none border border-blue-accent bg-blue-accent px-4 py-2 text-white transition-colors duration-100 hover:border-blue-accent-hover hover:bg-blue-accent-hover"
          >
            ACCEPT
          </button>
        </div>
      </div>
    </section>
  );
};

// Мемоїзація компонента запобігає його ре-рендеру, коли батьківські компоненти
// оновлюються, оскільки цей компонент не має пропсів і його стан
// керований ззовні через context (в хуці `useCookieConsent`).
export default React.memo(CookieBanner);
