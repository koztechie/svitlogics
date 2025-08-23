import { useState, useEffect, useCallback } from "react";

// --- Константи та Типи ---

/**
 * @description Унікальний ключ для зберігання вибору користувача щодо cookies.
 * @private
 */
const COOKIE_CONSENT_KEY = "svitlogics-cookie-consent";

/**
 * @description Прапорець, що визначає, чи виконується код у браузерному середовищі.
 * Використовується для запобігання виконанню DOM-залежного коду на сервері (SSR).
 * @private
 */
const IS_BROWSER = typeof window !== "undefined";

/**
 * @description Визначає можливі стани згоди користувача.
 * `true` - згоду надано.
 * `false` - у згоді відмовлено.
 * `null` - вибір ще не зроблено.
 */
type ConsentValue = boolean | null;

/**
 * @description Розширює глобальний об'єкт Window, додаючи типізацію для `dataLayer`.
 * Це забезпечує типову безпеку при роботі з Google Tag Manager.
 */
declare global {
  interface Window {
    dataLayer?: {
      push: (event: object) => void;
    };
  }
}

// --- Допоміжні функції (Принцип єдиної відповідальності) ---

/**
 * @description Безпечно зчитує та парсить значення згоди з localStorage.
 * @private
 * @returns {ConsentValue} Повертає `boolean` якщо значення знайдено та валідне, інакше `null`.
 */
const getStoredConsent = (): ConsentValue => {
  if (!IS_BROWSER) {
    return null;
  }
  try {
    const item = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (item === "true") return true;
    if (item === "false") return false;
    return null;
  } catch (error) {
    console.error("Failed to read consent from localStorage:", error);
    return null;
  }
};

/**
 * @description Оновлює `dataLayer` для Google Tag Manager відповідно до вибору користувача.
 * @private
 * @param {boolean} hasConsented - Вибір користувача.
 */
const updateDataLayer = (hasConsented: boolean): void => {
  if (
    IS_BROWSER &&
    window.dataLayer &&
    typeof window.dataLayer.push === "function"
  ) {
    const consentState = hasConsented ? "granted" : "denied";
    window.dataLayer.push({
      event: "consent_update", // Більш специфічна назва події
      consent_mode: {
        analytics_storage: consentState,
      },
    });
  }
};

/**
 * @description Кастомний хук для управління станом згоди на використання cookies.
 * Інкапсулює логіку взаємодії з `localStorage` та `dataLayer` (GTM).
 *
 * @returns {{ consent: ConsentValue, giveConsent: (hasConsented: boolean) => void }}
 * - `consent`: поточний стан згоди (`true`, `false`, або `null`).
 * - `giveConsent`: функція для встановлення нового стану згоди.
 *
 * @example
 * const MyComponent = () => {
 *   const { consent, giveConsent } = useCookieConsent();
 *
 *   if (consent === null) {
 *     return (
 *       <div>
 *         <p>We use cookies...</p>
 *         <button onClick={() => giveConsent(true)}>Accept</button>
 *         <button onClick={() => giveConsent(false)}>Decline</button>
 *       </div>
 *     );
 *   }
 *
 *   return <p>Your consent choice is: {String(consent)}</p>;
 * }
 */
export const useCookieConsent = () => {
  // Ініціалізуємо стан за допомогою ледачої ініціалізації (`() => getStoredConsent()`),
  // щоб уникнути виклику localStorage на сервері та при кожному рендері.
  const [consent, setConsent] = useState<ConsentValue>(getStoredConsent);

  // Цей ефект синхронізує стан, якщо він змінився в іншій вкладці.
  useEffect(() => {
    if (!IS_BROWSER) return;

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === COOKIE_CONSENT_KEY) {
        setConsent(getStoredConsent());
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const giveConsent = useCallback((hasConsented: boolean) => {
    if (!IS_BROWSER) return;

    try {
      window.localStorage.setItem(COOKIE_CONSENT_KEY, String(hasConsented));
      setConsent(hasConsented);
      updateDataLayer(hasConsented);
    } catch (error) {
      console.error("Failed to save consent to localStorage:", error);
      // Можна додати обробку помилок, напр., показати повідомлення користувачу.
    }
  }, []);

  return { consent, giveConsent };
};
