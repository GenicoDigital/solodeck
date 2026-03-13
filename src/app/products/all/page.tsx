import ProductFilters from "@/components/ProductFilters";
import { products, bundles } from "@/lib/products";

export const metadata = {
  title: "All Products — SoloDeck",
};

const HERO_SLUG = "ultimate-small-business-ai-toolkit";

export default function AllProductsPage() {
  const sorted = [...products].sort((a, b) => {
    if (a.slug === HERO_SLUG) return -1;
    if (b.slug === HERO_SLUG) return 1;
    return 0;
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-3 text-3xl font-bold text-charcoal">All Products</h1>
      <p className="mb-8 text-muted">
        Everything we offer — browse by product type or scroll through the lot.
      </p>

      <ProductFilters products={sorted} bundles={bundles} />
    </div>
  );
}
