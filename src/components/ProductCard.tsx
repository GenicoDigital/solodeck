"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Product, Bundle } from "@/lib/types";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

interface ProductCardProps {
  item: Product | Bundle;
  type: "product" | "bundle";
}

export default function ProductCard({ item, type }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const href = type === "bundle"
    ? `/products/bundles/${item.slug}`
    : `/products/item/${item.slug}`;

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addItem(item.slug, type);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  const hasImage = item.image && item.image.length > 0;

  return (
    <div className="group flex flex-col rounded-lg border border-border bg-card-bg p-4 transition-shadow hover:shadow-md">
      <Link href={href}>
        {hasImage ? (
          <div className="relative mb-3 aspect-[4/5] w-full overflow-hidden rounded-md bg-gray-100">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="mb-3 aspect-[4/5] w-full rounded-md bg-gray-100" />
        )}
        {type === "bundle" && (
          <span className="mb-1 inline-block text-xs font-medium uppercase tracking-wide text-accent">
            Bundle
          </span>
        )}
      </Link>
      <p className="mt-auto pt-3 text-right text-base font-semibold text-foreground">
        {formatPrice(item.pricePence)}
      </p>
      <button
        onClick={handleAddToCart}
        className="mt-2 w-full rounded-md bg-accent px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
      >
        {added ? "Added!" : "Add to cart"}
      </button>
    </div>
  );
}
