import { notFound } from "next/navigation";
import { products, formatPrice } from "@/lib/products";
import { PRODUCT_TYPE_LABELS, INDUSTRY_LABELS } from "@/lib/types";
import AddToCartButton from "@/components/AddToCartButton";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) return notFound();

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <div className="grid gap-10 md:grid-cols-2">
        {/* Image placeholder */}
        <div className="aspect-[4/3] w-full rounded-lg bg-border" />

        <div>
          <div className="mb-2 flex flex-wrap gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-accent">
              {PRODUCT_TYPE_LABELS[product.productType]}
            </span>
            {product.format !== "pdf" && (
              <span className="text-xs font-medium uppercase tracking-wide text-muted">
                {product.format === "google-sheets" ? "Google Sheets" : "Notion"}
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold text-charcoal">
            {product.name}
          </h1>
          <p className="mt-4 text-muted leading-relaxed">
            {product.description}
          </p>

          {/* Industries */}
          <div className="mt-4 flex flex-wrap gap-2">
            {product.industries.map((industry) => (
              <span
                key={industry}
                className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
              >
                {INDUSTRY_LABELS[industry]}
              </span>
            ))}
          </div>

          <p className="mt-6 text-3xl font-semibold text-charcoal">
            {formatPrice(product.pricePence)}
          </p>
          <div className="mt-6">
            <AddToCartButton slug={product.slug} type="product" />
          </div>
        </div>
      </div>
    </div>
  );
}
