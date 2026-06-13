import Link from "next/link";
import { getActiveIndustries } from "@/lib/products";
import { INDUSTRY_LABELS } from "@/lib/types";

export const metadata = {
  title: "Products — SoloDeck",
};

export default function ProductsPage() {
  // "All Businesses" is intentionally excluded — the "browse all products"
  // link below covers it.
  const industries = getActiveIndustries().filter((i) => i !== "all-businesses");

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-3 text-3xl font-bold text-charcoal">
        What Kind of Business Do You Run?
      </h1>
      <p className="mb-10 text-muted">
        Pick your industry and we&apos;ll show you the toolkits built for your business.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry) => (
          <Link
            key={industry}
            href={`/products/${industry}`}
            className="flex items-center rounded-lg border border-border bg-card-bg p-5 transition-shadow hover:shadow-md hover:border-accent/30"
          >
            <span className="text-base font-semibold text-charcoal group-hover:text-accent">
              {INDUSTRY_LABELS[industry]}
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/products/all"
          className="text-sm font-medium text-accent hover:text-accent-hover transition-colors"
        >
          Or browse all products
        </Link>
      </div>
    </div>
  );
}
