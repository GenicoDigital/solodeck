"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { calculateCart } from "@/lib/cart-utils";
import { formatPrice } from "@/lib/products";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart } = useCart();
  const [consentGiven, setConsentGiven] = useState(false);
  const summary = calculateCart(items);

  if (summary.lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 text-center">
        <h1 className="mb-4 text-3xl font-bold text-charcoal">Your Cart is Empty</h1>
        <p className="mb-8 text-muted">
          Browse our toolkits and find something to help your business.
        </p>
        <Link
          href="/products"
          className="inline-block rounded-md bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-bold text-charcoal">Your Cart</h1>

      {/* Cart items */}
      <div className="divide-y divide-border rounded-lg border border-border bg-card-bg">
        {summary.lines.map((line) => (
          <div key={line.slug} className="flex items-center gap-4 p-4">
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-charcoal">
                {line.name}
              </h3>
              {line.type === "bundle" && (
                <span className="text-xs text-accent">Bundle</span>
              )}
              <p className="text-sm text-muted">
                {formatPrice(line.unitPricePence)} each
              </p>
            </div>

            {/* Quantity controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(line.slug, line.quantity - 1)}
                className="flex h-8 w-8 items-center justify-center rounded border border-border text-sm text-muted hover:text-charcoal transition-colors"
              >
                -
              </button>
              <span className="w-8 text-center text-sm font-medium text-charcoal">
                {line.quantity}
              </span>
              <button
                onClick={() => updateQuantity(line.slug, line.quantity + 1)}
                className="flex h-8 w-8 items-center justify-center rounded border border-border text-sm text-muted hover:text-charcoal transition-colors"
              >
                +
              </button>
            </div>

            {/* Line total */}
            <p className="w-20 text-right text-sm font-semibold text-charcoal">
              {formatPrice(line.lineTotalPence)}
            </p>

            {/* Remove */}
            <button
              onClick={() => removeItem(line.slug)}
              className="text-xs text-muted hover:text-red-500 transition-colors"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Offer notice — prompt toward the next "3 for £60" group */}
      {summary.itemsToNextDeal > 0 && (
        <p className="mt-4 text-sm text-accent">
          {summary.discountApplied
            ? `Add ${summary.itemsToNextDeal} more toolkit${summary.itemsToNextDeal === 1 ? "" : "s"} to unlock another 3 for £60!`
            : `Add ${summary.itemsToNextDeal} more toolkit${summary.itemsToNextDeal === 1 ? "" : "s"} to get any 3 for £60!`}
        </p>
      )}

      {/* Summary */}
      <div className="mt-6 space-y-2 text-sm">
        {summary.discountApplied && (
          <>
            <div className="flex justify-between text-muted">
              <span>Standalone products subtotal</span>
              <span>{formatPrice(summary.standaloneSubtotal)}</span>
            </div>
            <div className="flex justify-between text-accent font-medium">
              <span>
                3 for £60 offer
                {summary.dealGroups > 1 ? ` (×${summary.dealGroups})` : ""}
              </span>
              <span>-{formatPrice(summary.discountAmount)}</span>
            </div>
          </>
        )}
        {summary.bundleSubtotal > 0 && summary.discountApplied && (
          <div className="flex justify-between text-muted">
            <span>Bundles</span>
            <span>{formatPrice(summary.bundleSubtotal)}</span>
          </div>
        )}
        <div className="flex justify-between border-t border-border pt-3 text-base font-semibold text-charcoal">
          <span>Total</span>
          <span>{formatPrice(summary.total)}</span>
        </div>
      </div>

      {/* Consent checkbox */}
      <div className="mt-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={consentGiven}
            onChange={(e) => setConsentGiven(e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 rounded border-border text-accent focus:ring-accent"
          />
          <span className="text-sm text-muted leading-relaxed">
            I request immediate access to the digital content and I acknowledge
            that I will lose my 14-day right to cancel once the download begins.
          </span>
        </label>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
        <button
          onClick={clearCart}
          className="text-sm text-muted hover:text-charcoal transition-colors"
        >
          Clear cart
        </button>
        <button
          disabled={!consentGiven}
          className={`rounded-md px-8 py-3 text-sm font-medium text-white transition-colors ${
            consentGiven
              ? "bg-accent hover:bg-accent-hover"
              : "bg-muted/40 cursor-not-allowed"
          }`}
        >
          Proceed to checkout
        </button>
      </div>
    </div>
  );
}
