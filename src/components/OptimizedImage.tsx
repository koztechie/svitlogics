import React from "react";

/**
 * @description Визначає контракт пропсів для компонента `OptimizedImage`.
 * Пропси є розширенням стандартних атрибутів `<img>`, що забезпечує
 * повну сумісність та гнучкість.
 */
interface OptimizedImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * @description Шлях до файлу зображення. Цей пропс є обов'язковим.
   */
  src: string;
  /**
   * @description Альтернативний текст для зображення. Критично важливий для
   * доступності (a11y) та SEO. Описує вміст зображення для скрін-рідерів
   * та у випадку, якщо зображення не завантажилося. Цей пропс є обов'язковим.
   */
  alt: string;
}

/**
 * @description
 * Мемоїзований компонент-обгортка для зображень, що застосовує найкращі практики
 * для продуктивності та доступності за замовчуванням.
 *
 * Він рендерить стандартний тег `<img>`, додаючи `loading="lazy"` та
 * `decoding="async"` для оптимізації завантаження. Компонент також виконує
 * перевірку наявності обов'язкових пропсів `src` та `alt` під час розробки.
 *
 * @component
 * @param {OptimizedImageProps} props - Пропси компонента, ідентичні до атрибутів `<img>`.
 * @returns {React.ReactElement | null} Повертає елемент `<img>` або `null`, якщо
 * відсутні обов'язкові пропси `src` або `alt`.
 *
 * @example
 * <OptimizedImage
 *   src="/images/my-awesome-picture.jpg"
 *   alt="A detailed description of the awesome picture."
 *   className="w-full h-auto rounded-lg"
 *   width={800}
 *   height={600}
 * />
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  loading = "lazy",
  decoding = "async",
  ...props
}) => {
  // --- Валідація пропсів на етапі розробки ---
  // Раннє повернення, якщо критичні пропси відсутні, для запобігання
  // рендерингу "зламаних" зображень та проблем з доступністю.
  if (!src || !alt) {
    // У середовищі розробки виводимо попередження в консоль,
    // щоб допомогти розробникам швидко знайти проблему.
    if (process.env.NODE_ENV === "development") {
      console.warn(
        `OptimizedImage component is missing required 'src' or 'alt' props and will not be rendered. Received: src="${src}", alt="${alt}"`
      );
    }
    return null;
  }

  // Рендеримо стандартний тег `<img>` з оптимізаціями та рештою пропсів.
  // `loading="lazy"` та `decoding="async"` застосовуються за замовчуванням,
  // але можуть бути перевизначені через пропси.
  return (
    <img src={src} alt={alt} loading={loading} decoding={decoding} {...props} />
  );
};

// --- Мемоїзація ---
// Оскільки зображення є "чистим" компонентом (його вигляд залежить лише від пропсів),
// `React.memo` є ключовою оптимізацією. Вона запобігає зайвим ре-рендерам,
// коли батьківський компонент оновлюється, але пропси зображення залишаються незмінними.
export default React.memo(OptimizedImage);
