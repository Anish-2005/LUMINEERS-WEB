export default function robots() {
  const siteUrl = "https://lumineers-web.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/blogs"],
        disallow: ["/upload"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
