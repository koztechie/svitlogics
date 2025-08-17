// src/components/OptimizedImage.tsx

import React from "react";

// Визначаємо пропси, які приймає наш компонент.
// Вони ідентичні стандартним пропсам тегу <img>.
interface OptimizedImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

/**
 * A simple wrapper component for images that ensures best practices are applied.
 *
 * This component renders a standard <img> tag but adds `loading="lazy"` and
 * `decoding="async"` by default for optimal performance.
 *
 * The actual image optimization (compression, format conversion) is handled
 * automatically at build time by the `vite-plugin-image-optimizer`, which
 * scans the `dist` directory and processes all images found there.
 *
 * @param {OptimizedImageProps} props - The component props, including src and alt.
 * @returns {React.ReactElement | null} An <img> element or null if essential props are missing.
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  ...props
}) => {
  // Перевіряємо, чи є src та alt, щоб уникнути зламаних зображень та проблем з доступністю.
  if (!src || !alt) {
    console.warn(
      "OptimizedImage component is missing required 'src' or 'alt' props and will not be rendered."
    );
    return null;
  }

  // Просто повертаємо стандартний тег <img> з доданими атрибутами для продуктивності.
  // Vite і плагін оптимізації подбають про все інше на етапі збірки.
  return <img src={src} alt={alt} loading="lazy" decoding="async" {...props} />;
};

export default OptimizedImage;
