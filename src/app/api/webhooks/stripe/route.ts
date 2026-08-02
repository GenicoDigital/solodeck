import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import {
  decodeItems,
  getDownloadFiles,
  createSignedDownloads,
} from "@/lib/fulfilment";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[webhook] STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Webhook not configured." }, { status: 500 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  // Signature verification needs the raw, unparsed request body.
  const body = await req.text();
  const stripe = getStripe();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch (err) {
    console.error("[webhook] signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    try {
      const email =
        session.customer_details?.email ?? session.customer_email ?? "unknown";
      const items = decodeItems(session.metadata?.items);
      const downloads = await createSignedDownloads(getDownloadFiles(items));

      console.log(
        `[webhook] Payment complete for ${email} (session ${session.id}). Download links:`
      );
      for (const d of downloads) {
        console.log(
          `  - ${d.name}: ${d.url ?? "(failed to sign — check bucket/file name)"}`
        );
      }
      // TODO: email these links to `email` via a transactional email provider.
    } catch (err) {
      console.error("[webhook] fulfilment error", err);
      // Still return 200 so Stripe doesn't retry indefinitely on a bug; the
      // customer can re-fetch links from the success page.
    }
  }

  return NextResponse.json({ received: true });
}
