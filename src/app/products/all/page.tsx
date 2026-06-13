import ProductFilters from "@/components/ProductFilters";
import { visibleProducts, bundles } from "@/lib/products";

export const metadata = {
  title: "All Products — SoloDeck",
};

export default function AllProductsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-3 text-3xl font-bold text-charcoal">All Products</h1>
      <p className="mb-8 text-muted">
        Everything we offer — browse by product type or scroll through the lot.
      </p>

      <ProductFilters products={visibleProducts} bundles={bundles} enableSearch />
    </div>
  );
}
