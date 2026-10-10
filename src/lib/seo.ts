import type { Metadata } from "next";

export const SITE_URL = "https://solodeck.co";
export const SITE_NAME = "SoloDeck";
const DEFAULT_IMAGE = "/images/products/complete-small-business-ai-toolkit-v5.jpg";

/** Shorten text to fit a search-result snippet, cutting at a word boundary. */
export function clip(text: string, max: number): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:—–-]+$/, "") + "…";
}

/**
 * Per-page title, description, canonical URL and social-share preview.
 * `title` gets the " | SoloDeck" suffix from the root layout's template.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_GB",
      type: "website",
      images: [{ url: image }],
    },
    twitter: { card: "summary_large_image", images: [image] },
    ...(noIndex && { robots: { index: false, follow: true } }),
  };
}

/** Google structured data for a buyable item (toolkit or bundle). */
export function productJsonLd(item: {
  name: string;
  description: string;
  path: string;
  image: string;
  pricePence: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.name,
    description: item.description,
    image: `${SITE_URL}${item.image}`,
    url: `${SITE_URL}${item.path}`,
    brand: { "@type": "Brand", name: SITE_NAME },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}${item.path}`,
      price: (item.pricePence / 100).toFixed(2),
      priceCurrency: "GBP",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: SITE_NAME },
    },
  };
}
