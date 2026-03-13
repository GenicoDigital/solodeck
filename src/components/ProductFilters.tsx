"use client";

import { useState } from "react";
import { Product, Bundle, ProductType, PRODUCT_TYPE_LABELS } from "@/lib/types";
import { getActiveProductTypes } from "@/lib/products";
import ProductCard from "./ProductCard";

interface ProductFiltersProps {
  products: Product[];
  bundles: Bundle[];
}

export default function ProductFilters({ products, bundles }: ProductFiltersProps) {
  const [activeType, setActiveType] = useState<ProductType | "all" | "bundles">("all");
  const productTypes = getActiveProductTypes();

  const filteredProducts = activeType === "all" || activeType === "bundles"
    ? products
    : products.filter((p) => p.productType === activeType);

  const showBundles = activeType === "all" || activeType === "bundles";

  return (
    <div>
      {/* Filter tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveType("all")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            activeType === "all"
              ? "bg-accent text-white"
              : "bg-card-bg border border-border text-muted hover:text-charcoal"
          }`}
        >
          All
        </button>
        {productTypes.map((type) => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeType === type
                ? "bg-accent text-white"
                : "bg-card-bg border border-border text-muted hover:text-charcoal"
            }`}
          >
            {PRODUCT_TYPE_LABELS[type]}
          </button>
        ))}
        {bundles.length > 0 && (
          <button
            onClick={() => setActiveType("bundles")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeType === "bundles"
                ? "bg-accent text-white"
                : "bg-card-bg border border-border text-muted hover:text-charcoal"
            }`}
          >
            Bundles
          </button>
        )}
      </div>

      {/* Product grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {activeType !== "bundles" &&
          filteredProducts.map((product) => (
            <ProductCard key={product.slug} item={product} type="product" />
          ))}
        {showBundles &&
          bundles.map((bundle) => (
            <ProductCard key={bundle.slug} item={bundle} type="bundle" />
          ))}
      </div>

      {filteredProducts.length === 0 && !showBundles && (
        <p className="text-center text-muted py-8">No products found for this filter.</p>
      )}
    </div>
  );
}
