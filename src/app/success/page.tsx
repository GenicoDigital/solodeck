import Link from "next/link";
import { getStripe } from "@/lib/stripe";
import {
  decodeItems,
  getDownloadFiles,
  createSignedDownloads,
  type SignedDownload,
} from "@/lib/fulfilment";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Order Confirmed — SoloDeck",
};

function Fallback({ message }: { message: string }) {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 text-center">
      <h1 className="mb-4 text-3xl font-bold text-charcoal">Order Status</h1>
      <p className="mb-8 text-muted">{message}</p>
      <Link
        href="/products"
        className="inline-block rounded-md bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
      >
        Browse products
      </Link>
    </div>
  );
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id) {
    return <Fallback message="We couldn't find your order reference." />;
  }

  let paid = false;
  let email: string | null = null;
  let downloads: SignedDownload[] = [];

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(session_id);
    paid = session.payment_status === "paid";
    email = session.customer_details?.email ?? session.customer_email ?? null;
    if (paid) {
      const items = decodeItems(session.metadata?.items);
      downloads = await createSignedDownloads(getDownloadFiles(items));
    }
  } catch (err) {
    console.error("[success] retrieve error", err);
    return (
      <Fallback message="We couldn't load your order. Please check your email for your download links, or get in touch and we'll sort it out." />
    );
  }

  if (!paid) {
    return (
      <Fallback message="Your payment hasn't completed yet. If you've just paid, give it a moment and refresh this page." />
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      {/* Confirmation header */}
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
          <svg
            className="h-9 w-9 text-accent"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
        <h1 className="mt-6 text-3xl font-bold text-charcoal">
          Thank you for your order!
        </h1>
        <p className="mt-3 text-muted">
          Your payment was successful{email ? ` and a receipt is on its way to ${email}` : ""}.
          Your downloads are ready below.
        </p>
      </div>

      {/* Downloads */}
      <div className="mt-10 rounded-xl border border-border bg-card-bg p-6 sm:p-8">
        <h2 className="mb-4 text-lg font-semibold text-charcoal">
          Your downloads
        </h2>

        {downloads.length === 0 ? (
          <p className="text-sm text-muted">
            We couldn&apos;t find any files for this order. Please{" "}
            <Link href="/contact" className="text-accent underline hover:text-accent-hover">
              get in touch
            </Link>{" "}
            and we&apos;ll send your links straight over.
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {downloads.map((d) => (
              <li
                key={d.fileName}
                className="flex items-center justify-between gap-4 py-3"
              >
                <span className="text-sm font-medium text-charcoal">{d.name}</span>
                {d.url ? (
                  <a
                    href={d.url}
                    className="shrink-0 rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
                  >
                    Download PDF
                  </a>
                ) : (
                  <span className="shrink-0 text-xs text-muted">
                    Link unavailable — check your email
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}

        <p className="mt-6 text-xs text-muted">
          These links are valid for 24 hours. We&apos;ve also emailed them to you,
          so you can come back to them any time.
        </p>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/products"
          className="text-sm font-medium text-accent hover:text-accent-hover transition-colors"
        >
          Continue browsing
        </Link>
      </div>
    </div>
  );
}
