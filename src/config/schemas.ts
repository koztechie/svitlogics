// src/config/schemas.ts

import { z } from "zod";

/**
 * Defines the "Golden Standard" Zod schema for validating the frontmatter
 * of all MDX content. This strict schema ensures data integrity and consistency
 * across all published articles.
 */
export const articleFrontmatterSchema = z.object({
  /**
   * The primary title of the article, used for SEO and display.
   * It must be a non-empty string with a maximum length of 100 characters.
   */
  title: z.string().nonempty().max(100),

  /**
   * A brief summary of the article, suitable for meta descriptions.
   * It must be a non-empty string with a maximum length of 160 characters.
   */
  description: z.string().nonempty().max(160),

  /**
   * The URL-friendly identifier for the article.
   * It must be a non-empty string.
   */
  slug: z.string().nonempty(),

  /**
   * The initial publication date of the article.
   * It must be a string that can be coerced into a valid JavaScript Date object.
   */
  createdAt: z.string().pipe(z.coerce.date()),

  /**
   * The date of the last significant update to the article. Optional.
   * If provided, it must be a string coercible to a valid Date.
   */
  updatedAt: z.string().pipe(z.coerce.date()).optional(),

  /**
   * The author's name. It must be a non-empty string.
   */
  author: z.string().nonempty(),

  /**
   * An optional URL for the article's main image, used for social sharing cards.
   * If provided, it must be a valid URL string.
   */
  image: z.string().url().optional(),

  /**
   * A list of tags or keywords associated with the article.
   * It must be an array of non-empty strings.
   */
  tags: z.array(z.string().nonempty()),

  /**
   * The primary language of the article content.
   * It must be either 'en' (English) or 'uk' (Ukrainian).
   */
  language: z.enum(["en", "uk"]),

  /**
   * An optional canonical URL to indicate the "preferred" version of a page.
   * If provided, it must be a valid URL string.
   */
  canonicalUrl: z.string().url().optional(),

  /**
   * Optional meta robots tag content (e.g., "noindex, nofollow").
   */
  robots: z.string().optional(),

  /**
   * Optional JSON-LD schema string for advanced SEO.
   */
  schema: z.string().optional(),
});
