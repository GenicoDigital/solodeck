import type { MetadataRoute } from "next";

/** Served at /robots.txt. Keeps checkout pages out of search and points crawlers to the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/cart", "/success"] },
    sitemap: "https://solodeck.co/sitemap.xml",
  };
}
