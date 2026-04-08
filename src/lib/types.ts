export interface Product {
  slug: string;
  name: string;
  description: string;
  /** Price in pence (e.g. 1500 = £15.00) */
  pricePence: number;
  /** What the product is */
  productType: ProductType;
  /** Who the product is for — can belong to multiple industries */
  industries: Industry[];
  /** Format of the deliverable */
  format: ProductFormat;
  /** Filename or URL of the deliverable in R2 storage */
  fileName: string;
  /** Path to preview image in /public/images/products/ */
  image: string;
  featured?: boolean;
  /** Extended product description shown on the detail page */
  overview?: {
    intro: string;
    sections: { title: string; description: string }[];
    whatsInside: string[];
    whoItsFor: string[];
  };
}

export interface Bundle {
  slug: string;
  name: string;
  description: string;
  /** Discounted bundle price in pence */
  pricePence: number;
  /** Slugs of the products included in this bundle */
  productSlugs: string[];
  /** Who the bundle is for */
  industries: Industry[];
  image: string;
  featured?: boolean;
}

export type ProductType =
  | "prompt-library"
  | "ai-playbook"
  | "ai-template"
  | "ai-content-system"
  | "email-marketing-system"
  | "ai-audit-tool"
  | "done-for-you-copy"
  | "custom-gpt-guide"
  | "google-sheets-dashboard"
  | "guide";

export type Industry =
  | "all-businesses"
  | "accountants-bookkeepers"
  | "coaches-consultants"
  | "early-years-education"
  | "freelancers-creatives"
  | "health-wellness"
  | "hospitality"
  | "hr"
  | "manufacturing"
  | "personal-finance-coaching"
  | "pet-business-veterinary"
  | "property"
  | "retail"
  | "salons-beauty"
  | "social-media"
  | "trades"
  | "wedding-planners";

export type ProductFormat = "pdf" | "google-sheets" | "notion";

export interface CartItem {
  slug: string;
  type: "product" | "bundle";
  quantity: number;
}

export interface Order {
  id: string;
  email: string;
  items: CartItem[];
  totalPence: number;
  stripeSessionId: string;
  createdAt: string;
}

/** Display labels for product types */
export const PRODUCT_TYPE_LABELS: Record<ProductType, string> = {
  "prompt-library": "Prompt Library",
  "ai-playbook": "AI Playbook",
  "ai-template": "AI Template",
  "ai-content-system": "AI Content System",
  "email-marketing-system": "Email Marketing System",
  "ai-audit-tool": "AI Audit Tool",
  "done-for-you-copy": "Done-For-You Copy",
  "custom-gpt-guide": "Custom GPT Guide",
  "google-sheets-dashboard": "Google Sheets Dashboard",
  "guide": "Guide",
};

/** Display labels for industries */
export const INDUSTRY_LABELS: Record<Industry, string> = {
  "all-businesses": "All Businesses",
  "accountants-bookkeepers": "Accountants & Bookkeepers",
  "coaches-consultants": "Coaches & Consultants",
  "early-years-education": "Early Years & Education",
  "freelancers-creatives": "Freelancers & Creatives",
  "health-wellness": "Health & Wellness",
  "hospitality": "Hospitality & Food Business",
  "hr": "HR & People Management",
  "manufacturing": "Manufacturing",
  "personal-finance-coaching": "Personal Finance & Money Coaching",
  "pet-business-veterinary": "Pet Business & Veterinary",
  "property": "Real Estate & Lettings",
  "retail": "Ecommerce & Retail",
  "salons-beauty": "Beauty & Aesthetics",
  "social-media": "Social Media Management",
  "trades": "Trades & Construction",
  "wedding-planners": "Wedding & Events Planning",
};
