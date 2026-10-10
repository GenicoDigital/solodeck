import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/** Served at /robots.txt. Keeps checkout pages out of search and points crawlers to the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/cart", "/success"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
