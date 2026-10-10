import { notFound } from "next/navigation";
import {
  getProductsByIndustry,
  getActiveIndustries,
  visibleProducts,
} from "@/lib/products";
import { Industry, INDUSTRY_LABELS, Product } from "@/lib/types";
import IndustryToolkits from "@/components/IndustryToolkits";
import IndustryGuide from "@/components/IndustryGuide";
import JsonLd from "@/components/JsonLd";
import { INDUSTRY_CONTENT } from "@/data/products/industry-content";
import { pageMetadata } from "@/lib/seo";
import industrySeo from "@/data/products/industry-seo.json";

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

export async function generateMetadata({ params }: Props) {
  const { industry } = await params;
  const label = INDUSTRY_LABELS[industry as Industry];
  if (!label) return {};

  const audience = industry === "all-businesses" ? "Small Businesses" : label;
  const cover = getProductsByIndustry(industry as Industry).find((p) => p.image)?.image;
  const seo = (industrySeo as Record<string, { title: string; description: string }>)[industry];
  return pageMetadata({
    title: seo?.title ?? `AI Prompts for ${audience}`,
    description:
      seo?.description ??
      `Ready-to-use AI prompt packs for ${audience}. Save hours on emails, marketing and admin with ChatGPT or any AI tool. Instant PDF download.`,
    path: `/products/${industry}`,
    image: cover,
  });
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

  const content = INDUSTRY_CONTENT[industryKey];

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      {content && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: content.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }}
        />
      )}
      <IndustryToolkits
        heading={heading}
        label={label}
        intro={content?.intro}
        primary={primary}
        alsoUseful={alsoUseful}
      />
      {content && <IndustryGuide content={content} />}
    </div>
  );
}
