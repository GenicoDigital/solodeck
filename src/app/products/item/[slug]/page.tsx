import { existsSync } from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, formatPrice } from "@/lib/products";
import { PRODUCT_TYPE_LABELS } from "@/lib/types";
import AddToCartButton from "@/components/AddToCartButton";
import ProductGallery from "@/components/ProductGallery";

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

  // Gallery: cover + any interior preview pages that exist on disk.
  const previewsDir = path.join(process.cwd(), "public", "images", "products", "previews");
  const galleryImages = hasImage
    ? [
        { src: product.image, alt: product.name },
        ...(existsSync(path.join(previewsDir, `${product.slug}-preview-toc.jpg`))
          ? [
              {
                src: `/images/products/previews/${product.slug}-preview-toc.jpg`,
                alt: `${product.name} — contents`,
              },
            ]
          : []),
        ...[1, 2]
          .filter((n) => existsSync(path.join(previewsDir, `${product.slug}-preview-${n}.jpg`)))
          .map((n) => ({
            src: `/images/products/previews/${product.slug}-preview-${n}.jpg`,
            alt: `${product.name} — preview ${n}`,
          })),
      ]
    : [];

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
  ].slice(0, 4);

  return (
    <>
      {/* Dark hero band — full viewport width */}
      <section className="bg-[#1a2332]">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <div className="grid gap-10 md:grid-cols-2">
            {/* Product image gallery */}
            {hasImage ? (
              <ProductGallery images={galleryImages} />
            ) : (
              <div className="aspect-[4/3] w-full rounded-lg bg-white/10" />
            )}

            <div className="flex flex-col">
              <div className="mb-2 flex flex-wrap gap-2">
                <span className="text-xs font-medium uppercase tracking-wide text-accent">
                  {PRODUCT_TYPE_LABELS[product.productType]}
                </span>
                {product.format !== "pdf" && (
                  <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    {product.format === "google-sheets" ? "Google Sheets" : "Notion"}
                  </span>
                )}
              </div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                {product.name}
              </h1>
              <p className="mt-4 text-base text-slate-300 leading-relaxed">
                {product.description}
              </p>
              {overview?.intro && (
                <p className="mt-3 text-base text-slate-300 leading-relaxed">
                  {overview.intro}
                </p>
              )}

              <div className="mt-auto">
                <p className="mt-6 text-3xl font-semibold text-white">
                  {formatPrice(product.pricePence)}
                </p>
                <div className="mt-6">
                  <AddToCartButton slug={product.slug} type="product" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cream: What's Inside + What's Covered */}
      {overview && (overview.whatsInside.length > 0 || overview.sections.length > 0) && (
        <div className="mx-auto max-w-4xl px-6 py-16 space-y-12">
          {/* What's Inside */}
          {overview.whatsInside.length > 0 && (
            <div className="text-center">
              <h2 className="mb-6 text-2xl font-semibold text-charcoal">
                What&#39;s Inside
              </h2>
              <div className="mx-auto max-w-2xl">
                {overview.whatsInside.map((item, i) => (
                  <div key={i}>
                    {i > 0 && (
                      <div className="mx-auto my-4 h-px w-16 bg-border" />
                    )}
                    <p className="text-muted">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sections breakdown */}
          {overview.sections.length > 0 && (
            <div>
              <h2 className="mb-6 text-center text-2xl font-semibold text-charcoal">
                What&#39;s Covered
              </h2>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
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

        </div>
      )}

      {/* Dark band: Who It's For + You Might Also Like */}
      {((overview && overview.whoItsFor.length > 0) || related.length > 0) && (
        <section className="bg-[#1a2332] py-16">
          <div className="space-y-16">
            {overview && overview.whoItsFor.length > 0 && (
              <div className="mx-auto max-w-4xl px-6 text-center">
                <h2 className="mb-6 text-2xl font-semibold text-white">
                  Who It&#39;s For
                </h2>
                <div className="mx-auto max-w-2xl">
                  {overview.whoItsFor.map((item, i) => (
                    <div key={i}>
                      {i > 0 && (
                        <div className="mx-auto my-4 h-px w-16 bg-white/20" />
                      )}
                      <p className="text-slate-300">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {related.length > 0 && (
              <div className="mx-auto max-w-6xl px-6">
                <h2 className="mb-6 text-center text-2xl font-semibold text-white">
                  You Might Also Like
                </h2>
                <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
                  {related.map((p) => {
                    const img = Boolean(p.image && p.image.length > 0);
                    return (
                      <div
                        key={p.slug}
                        className="flex flex-col rounded-lg bg-white p-4 shadow-md"
                      >
                        {img ? (
                          <div className="relative mb-3 aspect-[1/1] w-full overflow-hidden rounded-md bg-gray-100">
                            <Image
                              src={p.image}
                              alt={p.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 100vw, 33vw"
                            />
                          </div>
                        ) : (
                          <div className="mb-3 aspect-[1/1] w-full rounded-md bg-gray-100" />
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
        </section>
      )}
    </>
  );
}
