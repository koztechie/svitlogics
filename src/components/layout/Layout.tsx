import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet-async";
import CookieBanner from "./CookieBanner";

/**
 * @description Визначає контракт пропсів для компонента `Layout`.
 */
interface LayoutProps {
  /**
   * @description Дочірні елементи React, зазвичай це компонент поточної сторінки,
   * який буде відрендерено всередині основного макету.
   */
  children: React.ReactNode;
}

/**
 * @description
 * `Layout` — це головний компонент-обгортка для всього сайту.
 * Він забезпечує консистентну структуру сторінки, що складається з хедера,
 * основної контентної частини та футера. Компонент також включає
 * глобальні мета-теги для SEO та соціальних мереж за допомогою `react-helmet-async`
 * та відображає банер для згоди на використання cookies.
 *
 * @component
 * @param {LayoutProps} props - Пропси компонента.
 * @example
 * <Layout>
 *   <HomePage />
 * </Layout>
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  // --- Мемоїзація статичних компонентів ---
  // Header та Footer не залежать від пропсів чи стану цього компонента.
  // `useMemo` гарантує, що ми не будемо створювати нові інстанси цих
  // компонентів при кожному ре-рендері Layout (напр., при зміні `children`),
  // що дозволяє їх власному `React.memo` працювати максимально ефективно.
  const memoizedHeader = React.useMemo(() => <Header />, []);
  const memoizedFooter = React.useMemo(() => <Footer />, []);
  const memoizedCookieBanner = React.useMemo(() => <CookieBanner />, []);

  return (
    // Головна обгортка:
    // - `flex flex-col`: Вертикальне розташування хедера, main та футера.
    // - `min-h-screen`: Гарантує, що layout займає мінімум висоту екрана.
    <div className="flex min-h-screen flex-col bg-white">
      <Helmet>
        {/* Глобальні OG-теги для всього сайту */}
        <meta property="og:site_name" content="Svitlogics" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />

        {/* Глобальний банер для соціальних мереж */}
        <meta
          property="og:image"
          content="https://svitlogics.com/svitlogics-og-banner.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
      </Helmet>

      {memoizedHeader}

      {/* Основна контентна частина */}
      {/* - `flex-grow`: Дозволяє цьому елементу розширюватися, притискаючи футер донизу. */}
      {/* - `w-full`: Гарантує повну ширину. */}
      <main className="w-full flex-grow">{children}</main>

      {memoizedFooter}
      {memoizedCookieBanner}
    </div>
  );
};

export default Layout;
