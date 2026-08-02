"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getBundleSuggestions } from "@/lib/cart-utils";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

interface BundleUpsellProps {
  /** Slugs of the standalone products currently in the cart. */
  cartSlugs: string[];
}

export default function BundleUpsell({ cartSlugs }: BundleUpsellProps) {
  const { addItem } = useCart();
  const [addedSlug, setAddedSlug] = useState<string | null>(null);
  const suggestions = getBundleSuggestions(cartSlugs);

  function handleAdd(slug: string) {
    addItem(slug, "product");
    setAddedSlug(slug);
    setTimeout(() => setAddedSlug((s) => (s === slug ? null : s)), 1500);
  }

  return (
    <div className="mt-4 rounded-lg border border-accent bg-accent/5 p-4">
      <p className="text-sm font-semibold text-accent">
        Add 1 more toolkit to get any 3 for £60 — saving £21!
      </p>

      <p className="mt-4 text-sm text-slate-500">
        Suggested toolkits to complete your bundle:
      </p>

      <div className="mt-2 flex gap-3 overflow-x-auto pb-1">
        {suggestions.map((product) => (
          <div
            key={product.slug}
            className="flex w-40 shrink-0 flex-col rounded-md bg-[#1a2332] p-3"
          >
            <Link href={`/products/item/${product.slug}`}>
              <div className="relative mb-2 aspect-square w-full overflow-hidden rounded bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </div>
              <p className="line-clamp-2 text-xs font-medium text-white">
                {product.name}
              </p>
            </Link>
            <p className="mt-2 text-sm font-semibold text-white">
              {formatPrice(product.pricePence)}
            </p>
            <button
              onClick={() => handleAdd(product.slug)}
              className="mt-2 w-full rounded bg-accent px-2 py-1.5 text-xs font-medium text-white transition-colors hover:bg-accent-hover"
            >
              {addedSlug === product.slug ? "Added!" : "Add to cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
