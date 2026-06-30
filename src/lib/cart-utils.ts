import { CartItem } from "./types";
import { getProductBySlug, getBundleBySlug } from "./products";

/**
 * Multi-buy offer: any 3 standalone toolkits for a flat £60, applied once per
 * complete group of 3. Bundles are excluded from both the count and the offer.
 */
export const DEAL_SIZE = 3;
export const DEAL_PRICE_PENCE = 6000;

export interface CartSummary {
  lines: CartLine[];
  standaloneCount: number;
  standaloneSubtotal: number;
  bundleSubtotal: number;
  discountApplied: boolean;
  /** Number of complete "3 for £60" groups in the cart. */
  dealGroups: number;
  /** Standalone items needed to unlock the next group (0 when none is pending). */
  itemsToNextDeal: number;
  discountAmount: number;
  total: number;
}

export interface CartLine {
  slug: string;
  name: string;
  type: "product" | "bundle";
  unitPricePence: number;
  quantity: number;
  lineTotalPence: number;
}

export function calculateCart(items: CartItem[]): CartSummary {
  const lines: CartLine[] = [];
  const standaloneUnitPrices: number[] = [];
  let standaloneCount = 0;
  let standaloneSubtotal = 0;
  let bundleSubtotal = 0;

  for (const item of items) {
    if (item.type === "product") {
      const product = getProductBySlug(item.slug);
      if (!product) continue;
      const lineTotal = product.pricePence * item.quantity;
      lines.push({
        slug: item.slug,
        name: product.name,
        type: "product",
        unitPricePence: product.pricePence,
        quantity: item.quantity,
        lineTotalPence: lineTotal,
      });
      standaloneCount += item.quantity;
      standaloneSubtotal += lineTotal;
      for (let i = 0; i < item.quantity; i++) {
        standaloneUnitPrices.push(product.pricePence);
      }
    } else {
      const bundle = getBundleBySlug(item.slug);
      if (!bundle) continue;
      const lineTotal = bundle.pricePence * item.quantity;
      lines.push({
        slug: item.slug,
        name: bundle.name,
        type: "bundle",
        unitPricePence: bundle.pricePence,
        quantity: item.quantity,
        lineTotalPence: lineTotal,
      });
      bundleSubtotal += lineTotal;
    }
  }

  // Price the most expensive items into groups of 3 first, so the customer
  // always gets the best possible deal. Each complete group is capped at the
  // flat £60 price; a group is never charged more than its natural total.
  standaloneUnitPrices.sort((a, b) => b - a);
  const dealGroups = Math.floor(standaloneCount / DEAL_SIZE);
  let discountAmount = 0;
  for (let g = 0; g < dealGroups; g++) {
    const start = g * DEAL_SIZE;
    const groupTotal = standaloneUnitPrices
      .slice(start, start + DEAL_SIZE)
      .reduce((sum, p) => sum + p, 0);
    discountAmount += Math.max(0, groupTotal - DEAL_PRICE_PENCE);
  }

  const discountApplied = discountAmount > 0;
  const itemsToNextDeal =
    standaloneCount === 0
      ? 0
      : (DEAL_SIZE - (standaloneCount % DEAL_SIZE)) % DEAL_SIZE;

  const total = standaloneSubtotal + bundleSubtotal - discountAmount;

  return {
    lines,
    standaloneCount,
    standaloneSubtotal,
    bundleSubtotal,
    discountApplied,
    dealGroups,
    itemsToNextDeal,
    discountAmount,
    total,
  };
}
