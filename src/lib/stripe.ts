import Stripe from "stripe";

let client: Stripe | null = null;

/**
 * Lazily-created server-side Stripe client. Created on first use (request time)
 * rather than at import time so a missing key doesn't break `next build`.
 */
export function getStripe(): Stripe {
  if (!client) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    client = new Stripe(key);
  }
  return client;
}
