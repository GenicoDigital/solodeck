"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function CartCount() {
  const { itemCount } = useCart();

  return (
    <Link
      href="/cart"
      className="text-sm font-medium text-accent hover:text-accent-hover transition-colors"
    >
      Cart{itemCount > 0 && ` (${itemCount})`}
    </Link>
  );
}
