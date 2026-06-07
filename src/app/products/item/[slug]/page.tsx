import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, formatPrice } from "@/lib/products";
import { PRODUCT_TYPE_LABELS } from "@/lib/types";
import AddToCartButton from "@/components/AddToCartButton";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

/** Truncate to roughly the first `maxWords` words for the "What's Covered" cards. */
function truncateWords(text: string, maxWords = 15): { text: string; truncated: boolean } {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return { text, truncated: false };
  const clipped = words.slice(0, maxWords).join(" ").replace(/[,.;:]+$/, "");
  return { text: clipped, truncated: true };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) return notFound();

  const hasImage = product.image && product.image.length > 0;
  const overview = product.overview;

  // Related products: same-industry first, preferring finalised (has-image) products,
  // then other finalised products, falling back to coming-soon stubs only if needed.
  const hasImg = (p: typeof products[number]) => Boolean(p.image && p.image.length > 0);
  const sameIndustry = products.filter(
    (p) => p.slug !== product.slug && p.industries.some((i) => product.industries.includes(i))
  );
  const others = products.filter(
    (p) => p.slug !== product.slug && !sameIndustry.includes(p)
  );
  const related = [
    ...sameIndustry.filter(hasImg),
    ...others.filter(hasImg),
    ...sameIndustry.filter((p) => !hasImg(p)),
    ...others.filter((p) => !hasImg(p)),
  ].slice(0, 3);

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

        <div className="flex flex-col">
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
          <p className="mt-4 text-sm text-muted leading-relaxed">
            {product.description}
          </p>
          {overview?.intro && (
            <p className="mt-3 text-sm text-muted leading-relaxed">
              {overview.intro}
            </p>
          )}

          <div className="mt-auto">
            <p className="mt-6 text-3xl font-semibold text-charcoal">
              {formatPrice(product.pricePence)}
            </p>
            <div className="mt-6">
              <AddToCartButton slug={product.slug} type="product" />
            </div>
          </div>
        </div>
      </div>

      {/* Overview section */}
      {overview && (
        <div className="mt-16 space-y-12">
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
                {overview.sections.map((section, i) => {
                  const { text, truncated } = truncateWords(section.description, 15);
                  return (
                    <div
                      key={i}
                      className="rounded-lg border border-border bg-card-bg p-5"
                    >
                      <h3 className="mb-2 text-base font-semibold text-charcoal">
                        {section.title}
                      </h3>
                      <p className="text-sm text-muted leading-relaxed">
                        {text}
                        {truncated && (
                          <span className="text-gray-400"> and more...</span>
                        )}
                      </p>
                    </div>
                  );
                })}
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

      {/* You Might Also Like */}
      {related.length > 0 && (
        <div className="mt-20 border-t border-border pt-12">
          <h2 className="mb-6 text-2xl font-semibold text-charcoal">
            You Might Also Like
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {related.map((p) => {
              const img = Boolean(p.image && p.image.length > 0);
              return (
                <div
                  key={p.slug}
                  className="flex flex-col rounded-lg border border-border bg-card-bg p-4"
                >
                  {img ? (
                    <div className="relative mb-3 aspect-[4/3] w-full overflow-hidden rounded-md bg-gray-100">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-cover"
                        style={{ objectPosition: "center 25px" }}
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="mb-3 aspect-[4/3] w-full rounded-md bg-gray-100" />
                  )}
                  <p className="mt-auto pt-3 text-right text-base font-semibold text-charcoal">
                    {formatPrice(p.pricePence)}
                  </p>
                  <Link href={`/products/item/${p.slug}`} className="mt-2">
                    <span className="block rounded-md bg-accent px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-accent-hover">
                      View Toolkit
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
