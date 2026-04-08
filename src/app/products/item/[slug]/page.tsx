import Image from "next/image";
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

  const hasImage = product.image && product.image.length > 0;
  const overview = product.overview;

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <div className="grid gap-10 md:grid-cols-2">
        {/* Product image */}
        {hasImage ? (
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        ) : (
          <div className="aspect-[4/3] w-full rounded-lg bg-border" />
        )}

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

      {/* Overview section */}
      {overview && (
        <div className="mt-16 space-y-12">
          {/* Introduction */}
          <div>
            <h2 className="mb-4 text-2xl font-semibold text-charcoal">
              About This Toolkit
            </h2>
            <p className="text-muted leading-relaxed">
              {overview.intro}
            </p>
          </div>

          {/* What's Inside */}
          {overview.whatsInside.length > 0 && (
            <div>
              <h2 className="mb-4 text-2xl font-semibold text-charcoal">
                What&#39;s Inside
              </h2>
              <ul className="space-y-2">
                {overview.whatsInside.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Sections breakdown */}
          {overview.sections.length > 0 && (
            <div>
              <h2 className="mb-6 text-2xl font-semibold text-charcoal">
                What&#39;s Covered
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {overview.sections.map((section, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-border bg-card-bg p-5"
                  >
                    <h3 className="mb-2 text-base font-semibold text-charcoal">
                      {section.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Who It's For */}
          {overview.whoItsFor.length > 0 && (
            <div>
              <h2 className="mb-4 text-2xl font-semibold text-charcoal">
                Who It&#39;s For
              </h2>
              <ul className="space-y-2">
                {overview.whoItsFor.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
