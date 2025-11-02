import { articles } from "@/data/data";

export async function GET() {
  const baseUrl = "https://online-articles.vercel.app";

  const urls = articles.map(
    (article) => `<url>
  <loc>${baseUrl}/articles/${article.id}</loc>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>`
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
