import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  getProductsByIndustry,
  getActiveIndustries,
  visibleProducts,
  formatPrice,
} from "@/lib/products";
import { Industry, INDUSTRY_LABELS, PRODUCT_TYPE_LABELS, Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import AddToCartButton from "@/components/AddToCartButton";

interface Props {
  params: Promise<{ industry: string }>;
}

// Broadly-applicable toolkits suggested on every industry page, in display order.
const UNIVERSAL_SLUGS = [
  "complete-small-business-ai-toolkit",
  "email-assistant-ai-toolkit",
  "customer-service-response-ai-toolkit",
  "social-media-management-ai-toolkit",
  "content-calendar-ai-toolkit",
  "website-generator-ai-toolkit",
];

export function generateStaticParams() {
  return getActiveIndustries().map((i) => ({ industry: i }));
}

function FeaturedToolkit({ product }: { product: Product }) {
  const href = `/products/item/${product.slug}`;
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-[#1a2332] p-6 md:flex-row md:gap-8 md:p-8">
      <Link href={href} className="md:w-2/5 md:shrink-0">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-white">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>
      </Link>
      <div className="flex flex-col md:w-3/5">
        <span className="text-xs font-medium uppercase tracking-wide text-accent">
          {PRODUCT_TYPE_LABELS[product.productType]}
        </span>
        <h2 className="mt-2 text-2xl font-bold text-white">
          <Link href={href} className="transition-colors hover:text-accent">
            {product.name}
          </Link>
        </h2>
        <p className="mt-3 text-base leading-relaxed text-slate-300">
          {product.description}
        </p>
        <div className="mt-auto pt-6">
          <p className="text-3xl font-semibold text-white">
            {formatPrice(product.pricePence)}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="w-full sm:w-48">
              <AddToCartButton slug={product.slug} type="product" />
            </div>
            <Link
              href={href}
              className="text-sm font-medium text-accent transition-colors hover:text-accent-hover"
            >
              View toolkit →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function IndustryPage({ params }: Props) {
  const { industry } = await params;

  // Skip non-industry routes handled by other pages
  if (industry === "all") return notFound();
  if (!INDUSTRY_LABELS[industry as Industry]) return notFound();

  const industryKey = industry as Industry;
  const label = INDUSTRY_LABELS[industryKey];

  const primary = getProductsByIndustry(industryKey);
  const primarySlugs = new Set(primary.map((p) => p.slug));

  // Curated cross-industry suggestions, excluding anything already shown as primary.
  const alsoUseful = UNIVERSAL_SLUGS
    .map((slug) => visibleProducts.find((p) => p.slug === slug))
    .filter((p): p is Product => Boolean(p) && !primarySlugs.has(p!.slug));

  const heading =
    primary.length > 1 ? `Your ${label} Toolkits` : `Your ${label} Toolkit`;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      {/* Primary toolkit(s) for this industry */}
      {primary.length > 0 && (
        <section>
          <h1 className="mb-2 text-3xl font-bold text-charcoal">{heading}</h1>
          <p className="mb-8 text-muted">
            Done-for-you AI prompts, built specifically for {label}.
          </p>
          <div className="space-y-6">
            {primary.map((p) => (
              <FeaturedToolkit key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Cross-industry suggestions */}
      {alsoUseful.length > 0 && (
        <section className="mt-16 border-t border-border pt-12">
          <h2 className="mb-1 text-2xl font-semibold text-charcoal">
            You May Also Find These Useful
          </h2>
          <p className="mb-8 text-muted">
            These toolkits work for any business type and pair well with your
            industry toolkit.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {alsoUseful.map((p) => (
              <ProductCard key={p.slug} item={p} type="product" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
