"use client";

import { useState } from "react";
import { Product, Bundle, ProductType, PRODUCT_TYPE_LABELS } from "@/lib/types";
import { getActiveProductTypes } from "@/lib/products";
import ProductCard from "./ProductCard";

interface ProductFiltersProps {
  products: Product[];
  bundles: Bundle[];
  enableSearch?: boolean;
}

export default function ProductFilters({ products, bundles, enableSearch = false }: ProductFiltersProps) {
  const [activeType, setActiveType] = useState<ProductType | "all" | "bundles">("all");
  const [query, setQuery] = useState("");
  const productTypes = getActiveProductTypes();

  const q = query.trim().toLowerCase();
  const matches = (name: string, description: string) =>
    !q || name.toLowerCase().includes(q) || description.toLowerCase().includes(q);

  const showBundles = activeType === "all" || activeType === "bundles";

  const typeFilteredProducts =
    showBundles ? products : products.filter((p) => p.productType === activeType);

  const visibleProductsList =
    activeType === "bundles" ? [] : typeFilteredProducts.filter((p) => matches(p.name, p.description));
  const visibleBundlesList = showBundles ? bundles.filter((b) => matches(b.name, b.description)) : [];

  const nothingToShow = visibleProductsList.length === 0 && visibleBundlesList.length === 0;

  return (
    <div>
      {/* Filter tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
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

      {/* Search */}
      {enableSearch && (
        <div className="mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search toolkits..."
            aria-label="Search toolkits"
            className="w-full rounded-md border border-border bg-card-bg px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent md:max-w-md"
          />
        </div>
      )}

      {/* Product grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProductsList.map((product) => (
          <ProductCard key={product.slug} item={product} type="product" />
        ))}
        {visibleBundlesList.map((bundle) => (
          <ProductCard key={bundle.slug} item={bundle} type="bundle" />
        ))}
      </div>

      {nothingToShow && (
        <p className="py-8 text-center text-muted">
          {q
            ? "No toolkits found — try a different search term"
            : "No products found for this filter."}
        </p>
      )}
    </div>
  );
}
