import { CartItem } from "./types";
import { getProductBySlug, getBundleBySlug } from "./products";

const STANDALONE_DISCOUNT_THRESHOLD = 3;
const STANDALONE_DISCOUNT_PERCENT = 10;

export interface CartSummary {
  lines: CartLine[];
  standaloneCount: number;
  standaloneSubtotal: number;
  bundleSubtotal: number;
  discountApplied: boolean;
  discountPercent: number;
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

  const discountApplied = standaloneCount >= STANDALONE_DISCOUNT_THRESHOLD;
  const discountAmount = discountApplied
    ? Math.round(standaloneSubtotal * (STANDALONE_DISCOUNT_PERCENT / 100))
    : 0;

  const total = standaloneSubtotal + bundleSubtotal - discountAmount;

  return {
    lines,
    standaloneCount,
    standaloneSubtotal,
    bundleSubtotal,
    discountApplied,
    discountPercent: STANDALONE_DISCOUNT_PERCENT,
    discountAmount,
    total,
  };
}
