import type { MetadataRoute } from "next";
import { bundles, getActiveIndustries, visibleProducts } from "@/lib/products";
import { SITE_URL } from "@/lib/seo";

/** Served at /sitemap.xml. Built from the product data, so new toolkits are added automatically. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/products", "/products/all", "/contact", "/privacy", "/terms"];

  return [
    ...staticPages.map((path) => ({ url: `${SITE_URL}${path}` })),
    ...getActiveIndustries().map((i) => ({ url: `${SITE_URL}/products/${i}` })),
    ...visibleProducts.map((p) => ({ url: `${SITE_URL}/products/item/${p.slug}` })),
    ...bundles.map((b) => ({ url: `${SITE_URL}/products/bundles/${b.slug}` })),
  ];
}
