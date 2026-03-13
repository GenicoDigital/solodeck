import { notFound } from "next/navigation";
import { bundles, getProductBySlug, formatPrice } from "@/lib/products";
import { INDUSTRY_LABELS } from "@/lib/types";
import AddToCartButton from "@/components/AddToCartButton";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return bundles.map((b) => ({ slug: b.slug }));
}

export default async function BundlePage({ params }: Props) {
  const { slug } = await params;
  const bundle = bundles.find((b) => b.slug === slug);

  if (!bundle) return notFound();

  const includedProducts = bundle.productSlugs
    .map(getProductBySlug)
    .filter(Boolean);

  const individualTotal = includedProducts.reduce(
    (sum, p) => sum + (p?.pricePence ?? 0),
    0
  );
  const savings = individualTotal - bundle.pricePence;

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <div className="grid gap-10 md:grid-cols-2">
        {/* Image placeholder */}
        <div className="aspect-[4/3] w-full rounded-lg bg-border" />

        <div>
          <span className="mb-2 inline-block text-xs font-medium uppercase tracking-wide text-accent">
            Bundle
          </span>
          <h1 className="text-3xl font-bold text-charcoal">
            {bundle.name}
          </h1>
          <p className="mt-4 text-muted leading-relaxed">
            {bundle.description}
          </p>

          {/* Industries */}
          <div className="mt-4 flex flex-wrap gap-2">
            {bundle.industries.map((industry) => (
              <span
                key={industry}
                className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
              >
                {INDUSTRY_LABELS[industry]}
              </span>
            ))}
          </div>

          {/* What's included */}
          <div className="mt-6">
            <h2 className="mb-3 text-sm font-semibold text-charcoal">
              What&apos;s Included:
            </h2>
            <ul className="space-y-2">
              {includedProducts.map((product) =>
                product ? (
                  <li key={product.slug} className="flex justify-between text-sm">
                    <span className="text-muted">{product.name}</span>
                    <span className="text-muted line-through">
                      {formatPrice(product.pricePence)}
                    </span>
                  </li>
                ) : null
              )}
            </ul>
          </div>

          <div className="mt-6">
            <p className="text-3xl font-semibold text-charcoal">
              {formatPrice(bundle.pricePence)}
            </p>
            {savings > 0 && (
              <p className="mt-1 text-sm text-accent font-medium">
                Save {formatPrice(savings)} compared to buying individually
              </p>
            )}
          </div>
          <div className="mt-6">
            <AddToCartButton slug={bundle.slug} type="bundle" />
          </div>
        </div>
      </div>
    </div>
  );
}
