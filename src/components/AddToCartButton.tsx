"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";

interface AddToCartButtonProps {
  slug: string;
  type: "product" | "bundle";
}

export default function AddToCartButton({ slug, type }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem(slug, type);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <button
      onClick={handleClick}
      className="w-full rounded-md bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
    >
      {added ? "Added!" : "Add to cart"}
    </button>
  );
}
