import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { calculateCart } from "@/lib/cart-utils";
import { encodeItems } from "@/lib/fulfilment";
import { CartItem } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const rawItems: unknown = body?.items;

    if (!Array.isArray(rawItems) || rawItems.length === 0) {
      return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
    }

    // Normalise client input into CartItem[]. calculateCart re-resolves every
    // slug against authoritative product data and drops anything unknown, so
    // client-supplied prices are never trusted.
    const items: CartItem[] = [];
    for (const it of rawItems as Array<Record<string, unknown>>) {
      const slug = typeof it?.slug === "string" ? it.slug : null;
      const type = it?.type === "bundle" ? "bundle" : "product";
      const quantity = Math.max(1, Math.floor(Number(it?.quantity) || 1));
      if (slug) items.push({ slug, type, quantity });
    }

    const summary = calculateCart(items);
    if (summary.lines.length === 0) {
      return NextResponse.json(
        { error: "No valid items in your cart." },
        { status: 400 }
      );
    }

    const stripe = getStripe();

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
      summary.lines.map((line) => ({
        quantity: line.quantity,
        price_data: {
          currency: "gbp",
          unit_amount: line.unitPricePence,
          product_data: {
            name: line.name + (line.type === "bundle" ? " (Bundle)" : ""),
          },
        },
      }));

    // Apply the 3-for-£60 saving as a one-off amount_off coupon so line items
    // stay itemised on the receipt and the saving is shown on Stripe's page.
    let discounts: Stripe.Checkout.SessionCreateParams.Discount[] | undefined;
    if (summary.discountAmount > 0) {
      const coupon = await stripe.coupons.create({
        amount_off: summary.discountAmount,
        currency: "gbp",
        duration: "once",
        name: "Bundle deal (3 for £60)",
      });
      discounts = [{ coupon: coupon.id }];
    }

    const origin =
      req.headers.get("origin") ??
      process.env.NEXT_PUBLIC_SITE_URL ??
      new URL(req.url).origin;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      discounts,
      // Record the resolved items so the webhook and success page can expand
      // bundles into their files and sign download URLs.
      metadata: {
        items: encodeItems(
          summary.lines.map((l) => ({
            slug: l.slug,
            type: l.type,
            quantity: l.quantity,
          }))
        ),
      },
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout] error", err);
    return NextResponse.json(
      { error: "Unable to start checkout. Please try again." },
      { status: 500 }
    );
  }
}
