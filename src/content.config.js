import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const lab = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/lab" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(true),
    topics: z.array(z.string()).default([]),
    status: z.enum(["Ongoing", "Complete", "Paused"]).default("Ongoing"),
  }),
});

export const collections = { lab };
