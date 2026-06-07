import { notFound } from "next/navigation";
import {
  getProductsByIndustry,
  getBundlesByIndustry,
  getActiveIndustries,
} from "@/lib/products";
import { Industry, INDUSTRY_LABELS } from "@/lib/types";
import ProductFilters from "@/components/ProductFilters";

interface Props {
  params: Promise<{ industry: string }>;
}

export function generateStaticParams() {
  return getActiveIndustries().map((i) => ({ industry: i }));
}

export default async function IndustryPage({ params }: Props) {
  const { industry } = await params;

  // Skip non-industry routes handled by other pages
  if (industry === "all") return notFound();

  if (!INDUSTRY_LABELS[industry as Industry]) return notFound();

  const industryKey = industry as Industry;
  const products = getProductsByIndustry(industryKey);
  const industryBundles = getBundlesByIndustry(industryKey);

  // Also include "all-businesses" products if viewing a specific industry
  const allBusinessProducts = industryKey !== "all-businesses"
    ? getProductsByIndustry("all-businesses").filter(
        (p) => !products.some((existing) => existing.slug === p.slug)
      )
    : [];

  // Sort: for "all-businesses", hero first then rest
  // For specific industries, industry-specific first, then all-businesses (hero first among those)
  const HERO_SLUG = "complete-small-business-ai-toolkit";

  const sortedIndustryProducts = [...products].sort((a, b) => {
    if (a.slug === HERO_SLUG) return -1;
    if (b.slug === HERO_SLUG) return 1;
    return 0;
  });

  const sortedAllBusinessProducts = [...allBusinessProducts].sort((a, b) => {
    if (a.slug === HERO_SLUG) return -1;
    if (b.slug === HERO_SLUG) return 1;
    return 0;
  });

  const combinedProducts = [...sortedIndustryProducts, ...sortedAllBusinessProducts];

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-3 text-3xl font-bold text-charcoal">
        {INDUSTRY_LABELS[industryKey]}
      </h1>
      <p className="mb-8 text-muted">
        {industryKey === "all-businesses"
          ? "Toolkits and Resources that Work for Any Type of Business"
          : `AI Toolkits and Resources built for ${INDUSTRY_LABELS[industryKey]}`}
      </p>

      <ProductFilters products={combinedProducts} bundles={industryBundles} />
    </div>
  );
}
