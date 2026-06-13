"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, PRODUCT_TYPE_LABELS } from "@/lib/types";
import { formatPrice } from "@/lib/products";
import ProductCard from "./ProductCard";
import AddToCartButton from "./AddToCartButton";

function FeaturedToolkit({ product }: { product: Product }) {
  const href = `/products/item/${product.slug}`;
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-[#1a2332] p-6 md:flex-row md:gap-8 md:p-8">
      <Link href={href} className="md:w-2/5 md:shrink-0">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-white">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>
      </Link>
      <div className="flex flex-col md:w-3/5">
        <span className="text-xs font-medium uppercase tracking-wide text-accent">
          {PRODUCT_TYPE_LABELS[product.productType]}
        </span>
        <h2 className="mt-2 text-2xl font-bold text-white">
          <Link href={href} className="transition-colors hover:text-accent">
            {product.name}
          </Link>
        </h2>
        <p className="mt-3 text-base leading-relaxed text-slate-300">
          {product.description}
        </p>
        <div className="mt-auto pt-6">
          <p className="text-3xl font-semibold text-white">
            {formatPrice(product.pricePence)}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="w-full sm:w-48">
              <AddToCartButton slug={product.slug} type="product" />
            </div>
            <Link
              href={href}
              className="text-sm font-medium text-accent transition-colors hover:text-accent-hover"
            >
              View toolkit →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

interface Props {
  heading: string;
  label: string;
  primary: Product[];
  alsoUseful: Product[];
}

export default function IndustryToolkits({ heading, label, primary, alsoUseful }: Props) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const matches = (p: Product) =>
    !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);

  const primaryFiltered = primary.filter(matches);
  const alsoFiltered = alsoUseful.filter(matches);
  const nothingToShow = q.length > 0 && primaryFiltered.length === 0 && alsoFiltered.length === 0;

  return (
    <div>
      {/* Search — always visible so it can't filter itself away */}
      <div className="mb-10">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search toolkits..."
          aria-label="Search toolkits"
          className="w-full rounded-md border border-border bg-card-bg px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent md:max-w-md"
        />
      </div>

      {/* Primary toolkit(s) */}
      {primaryFiltered.length > 0 && (
        <section>
          <h1 className="mb-2 text-3xl font-bold text-charcoal">{heading}</h1>
          <p className="mb-8 text-muted">
            Done-for-you AI prompts, built specifically for {label}.
          </p>
          <div className="space-y-6">
            {primaryFiltered.map((p) => (
              <FeaturedToolkit key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Cross-industry suggestions */}
      {alsoFiltered.length > 0 && (
        <section className={primaryFiltered.length > 0 ? "mt-16 border-t border-border pt-12" : ""}>
          <h2 className="mb-1 text-2xl font-semibold text-charcoal">
            You May Also Find These Useful
          </h2>
          <p className="mb-8 text-muted">
            These toolkits work for any business type and pair well with your
            industry toolkit.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {alsoFiltered.map((p) => (
              <ProductCard key={p.slug} item={p} type="product" />
            ))}
          </div>
        </section>
      )}

      {nothingToShow && (
        <p className="py-8 text-center text-muted">
          No toolkits found — try a different search term
        </p>
      )}
    </div>
  );
}
