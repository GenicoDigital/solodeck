import { Industry } from "@/lib/types";

/** Long-form copy for an industry landing page: intro, a "how they use AI" guide and FAQs. */
export interface IndustryContent {
  /** Replaces the default one-line subheading under the page heading */
  intro: string;
  guide: {
    heading: string;
    body: string;
    points: { label: string; text: string }[];
    closing?: string;
  };
  faqs: { question: string; answer: string }[];
}

export const INDUSTRY_CONTENT: Partial<Record<Industry, IndustryContent>> = {
  "accountants-bookkeepers": {
    intro:
      "Ready-to-use AI prompts for UK accountants and bookkeepers. Draft client letters, chase missing records, explain Making Tax Digital and prepare advisory reports in minutes — using ChatGPT, Claude, Copilot or any AI tool you already have.",
    guide: {
      heading: "How UK Accountants and Bookkeepers Use AI",
      body: "Most practices don't need new software to benefit from AI — they need to know what to ask it. Every prompt in this toolkit is written for UK practice, with HMRC, VAT, Making Tax Digital, IR35 and CIS built in, so you get a usable first draft rather than generic American advice.",
      points: [
        {
          label: "Client communication",
          text: "engagement letters, fee-increase notices, year-end reminders and late-document chasers",
        },
        {
          label: "Tax and compliance",
          text: "plain-English explainers for clients on self-assessment, VAT, MTD for Income Tax, CIS and IR35",
        },
        {
          label: "Bookkeeping",
          text: "month-end checklists, credit control letters and management accounts packs",
        },
        {
          label: "Practice growth",
          text: "pricing and packaging, onboarding, LinkedIn plans and AML policies",
        },
        {
          label: "Advisory",
          text: "business health checks, cash flow forecasts, KPI dashboards and exit planning",
        },
      ],
      closing:
        "Each prompt has bracketed placeholders to fill in and a Pro Tip based on real UK practice. You stay in control: AI drafts, you review and sign off.",
    },
    faqs: [
      {
        question: "Do I need ChatGPT Plus or special software?",
        answer:
          "No. The prompts work with free and paid versions of ChatGPT, Claude, Microsoft Copilot and Google Gemini. Copy a prompt, fill in the bracketed details and paste it in.",
      },
      {
        question: "Is it safe to use AI with client information?",
        answer:
          "Treat AI tools like any other third party — don't paste names, UTRs, NI numbers or bank details unless your firm has approved the tool for client data. The prompts use placeholders, so you can get a strong draft without sharing anything identifiable, then add the details yourself.",
      },
      {
        question: "Are the prompts up to date with UK tax rules?",
        answer:
          "They're built around UK requirements — HMRC, VAT, Making Tax Digital, IR35, CIS, corporation tax and self-assessment. AI tools can still get rates and thresholds wrong, so always check figures and deadlines against HMRC guidance before anything goes to a client.",
      },
      {
        question: "What do I get?",
        answer:
          "A 53-page PDF with 121 prompts across 5 sections, available to download straight after payment. Pay once, keep it forever.",
      },
    ],
  },

  trades: {
    intro:
      "Ready-to-use AI prompts for UK builders, plumbers, electricians and construction firms. Write quotes, chase payments, reply to customers and draft risk assessments and method statements in minutes — using ChatGPT or any AI app on your phone or laptop.",
    guide: {
      heading: "How UK Tradespeople Use AI",
      body: "Most tradespeople end up doing the paperwork in the evenings. AI can't fit a boiler, but it can draft the quote, the follow-up and the RAMS in a fraction of the time. Every prompt is written for UK trades, with CDM 2015, COSHH, CIS, RIDDOR and Building Regs in mind — in plain English throughout.",
      points: [
        {
          label: "Quotes and tenders",
          text: "written quotes, variation orders, schedules of works and deposit requests",
        },
        {
          label: "Customers",
          text: "enquiry replies, delay updates, complaint handling, review requests and payment reminders",
        },
        {
          label: "Health and safety",
          text: "risk assessments, method statements, COSHH assessments and toolbox talks",
        },
        {
          label: "Winning work",
          text: "Google Business Profile, Checkatrade and Rated People profiles, leaflets and before-and-after posts",
        },
        {
          label: "Running the business",
          text: "job costing, cash flow, CIS guides, late-payment letters and subcontractor agreements",
        },
      ],
    },
    faqs: [
      {
        question: "I'm not techy — will I be able to use this?",
        answer:
          "Yes. Pick a prompt, fill in the details in square brackets (the job, the price, the customer's name) and paste it into ChatGPT or any AI app. It works on your phone as well as a computer.",
      },
      {
        question: "Can AI write my risk assessments and method statements?",
        answer:
          "It can produce a solid first draft in minutes, structured around UK requirements. You still need to check it against the actual site and job and sign it off yourself — the responsibility stays with you.",
      },
      {
        question: "Will the prompts work for my trade?",
        answer:
          "They're written for builders, general contractors and sole traders across the trades — electricians, plumbers, roofers, plasterers and more. Placeholders let you tailor every prompt to your trade and the job in hand.",
      },
      {
        question: "What do I get?",
        answer:
          "A PDF with 150 prompts across 9 sections, available to download straight after payment. Pay once, keep it forever. There's also a Trades & Construction Complete Bundle that adds the customer service and website copy toolkits.",
      },
    ],
  },
};
