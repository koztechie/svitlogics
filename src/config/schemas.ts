// src/config/schemas.ts

import { z } from "zod";

/**
 * Defines the Zod schema for validating the frontmatter of MDX articles.
 * This ensures data integrity for titles, dates, summaries, and optional metadata.
 */
export const articleFrontmatterSchema = z.object({
  /**
   * The primary title of the article. It must be a string and cannot be empty.
   */
  title: z.string().nonempty(),

  /**
   * The publication date of the article. It must be a string that can be
   * successfully coerced into a valid JavaScript Date object.
   */
  date: z.string().pipe(z.coerce.date()),

  /**
   * A brief summary of the article, suitable for meta descriptions.
   * It must be a non-empty string with a maximum length of 160 characters.
   */
  summary: z.string().nonempty().max(160),

  /**
   * The optional author of the article.
   */
  author: z.string().optional(),

  /**
   * The optional category for the article.
   */
  category: z.string().optional(),
});
