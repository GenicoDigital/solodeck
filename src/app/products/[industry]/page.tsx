import { notFound } from "next/navigation";
import {
  getProductsByIndustry,
  getActiveIndustries,
  visibleProducts,
} from "@/lib/products";
import { Industry, INDUSTRY_LABELS, Product } from "@/lib/types";
import IndustryToolkits from "@/components/IndustryToolkits";

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
  "professional-services-ai-toolkit",
];

export function generateStaticParams() {
  return getActiveIndustries().map((i) => ({ industry: i }));
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
      <IndustryToolkits
        heading={heading}
        label={label}
        primary={primary}
        alsoUseful={alsoUseful}
      />
    </div>
  );
}
