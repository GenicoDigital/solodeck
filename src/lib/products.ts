import { Product, Bundle, Industry, ProductType, INDUSTRY_LABELS } from "./types";
import productsData from "@/data/products/products.json";
import bundlesData from "@/data/products/bundles.json";

export const products: Product[] = productsData as Product[];
export const bundles: Bundle[] = bundlesData as Bundle[];

/**
 * A product is "published" once it has a cover image. Unpublished stubs
 * (no image, no overview) are hidden from listing/discovery surfaces but
 * remain resolvable by slug so bundles and related-product links keep working.
 */
export function isPublished(p: Product): boolean {
  return Boolean(p.image && p.image.length > 0);
}

/**
 * Sort key that ignores the shared "The Complete" prefix and a leading "AI"
 * qualifier, so toolkits order by their actual subject — e.g. "The Complete AI
 * Email Assistant Toolkit" sorts under E (Email), not A (AI).
 */
function sortName(name: string): string {
  return name
    .replace(/^The Complete\s+/i, "")
    .replace(/^AI\s+/i, "")
    .toLowerCase();
}

/** Products shown in grids and the industry picker (excludes coming-soon stubs), sorted A–Z by subject. */
export const visibleProducts: Product[] = products
  .filter(isPublished)
  .sort((a, b) => sortName(a.name).localeCompare(sortName(b.name)));

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getBundleBySlug(slug: string): Bundle | undefined {
  return bundles.find((b) => b.slug === slug);
}

export function getItemBySlug(slug: string): (Product | Bundle) & { type: "product" | "bundle" } | undefined {
  const product = getProductBySlug(slug);
  if (product) return { ...product, type: "product" };
  const bundle = getBundleBySlug(slug);
  if (bundle) return { ...bundle, type: "bundle" };
  return undefined;
}

export function getFeaturedProducts(): Product[] {
  return visibleProducts.filter((p) => p.featured);
}

export function getProductsByIndustry(industry: Industry): Product[] {
  return visibleProducts.filter((p) => p.industries.includes(industry));
}

export function getBundlesByIndustry(industry: Industry): Bundle[] {
  return bundles.filter((b) => b.industries.includes(industry));
}

export function getProductsByType(type: ProductType): Product[] {
  return visibleProducts.filter((p) => p.productType === type);
}

/** Get all industries that have at least one published product or bundle */
export function getActiveIndustries(): Industry[] {
  const industries = new Set<Industry>();
  for (const p of visibleProducts) {
    for (const i of p.industries) industries.add(i);
  }
  for (const b of bundles) {
    for (const i of b.industries) industries.add(i);
  }
  // Put "all-businesses" first, then sort the rest alphabetically by display
  // label (not slug — slugs like "retail" / "salons-beauty" don't match their
  // labels "Ecommerce & Retail" / "Beauty & Aesthetics").
  const sorted = Array.from(industries).sort((a, b) => {
    if (a === "all-businesses") return -1;
    if (b === "all-businesses") return 1;
    return INDUSTRY_LABELS[a].localeCompare(INDUSTRY_LABELS[b]);
  });
  return sorted;
}

/** Get all product types that have at least one product */
export function getActiveProductTypes(): ProductType[] {
  const types = new Set<ProductType>();
  for (const p of visibleProducts) types.add(p.productType);
  return Array.from(types);
}

export function formatPrice(pence: number): string {
  return `£${(pence / 100).toFixed(2)}`;
}
