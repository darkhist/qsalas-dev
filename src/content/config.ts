import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({
    pattern: "**/*.mdx",
    base: "./src/content/blog",
  }),
  schema: z.object({
    title: z.string(),
    date: z.string().transform((str) => {
      // Parse YYYY-MM-DD at noon UTC to avoid timezone issues
      const [year, month, day] = str.split("-").map(Number);
      return new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
    }),
    time: z.string().optional(),
    description: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { blog };
