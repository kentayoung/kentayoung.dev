import { projects } from "../data/work.js";

const pages = [
  { path: "/", priority: "1.0" },
  { path: "/work", priority: "0.9" },
  ...projects.map(({ slug }) => ({ path: `/work/${slug}`, priority: "0.8" })),
  { path: "/photography", priority: "0.8" },
];

export const GET = ({ site }) => {
  const urls = pages
    .map(
      ({ path, priority }) => `  <url>
    <loc>${new URL(path, site).href}</loc>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`,
    )
    .join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
    { headers: { "Content-Type": "application/xml" } },
  );
};
