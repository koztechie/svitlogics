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
  title: z
    .string()
    .nonempty({ message: "Article title is required." })
    .max(100, { message: "Title cannot exceed 100 characters." }),

  /**
   * A brief summary of the article, suitable for meta descriptions.
   * It must be a non-empty string with a maximum length of 160 characters.
   */
  description: z
    .string()
    .nonempty({ message: "Article description is required." })
    .max(160, { message: "Description cannot exceed 160 characters." }),

  /**
   * The URL-friendly identifier for the article.
   * It must be a non-empty string.
   */
  slug: z.string().nonempty({ message: "Article slug is required." }),

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
  author: z.string().nonempty({ message: "Author is required." }),

  /**
   * A list of tags or keywords associated with the article.
   * It must be an array of non-empty strings.
   */
  tags: z
    .array(z.string().nonempty())
    .min(1, { message: "At least one tag is required." }),

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
