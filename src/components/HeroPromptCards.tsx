"use client";

import { useEffect, useRef } from "react";

interface Prompt {
  section: string;
  title: string;
  body: string;
  proTip: string;
}

// A cross-section of the Small Business AI Toolkit — one prompt per business area.
const PROMPTS: Prompt[] = [
  {
    section: "Customer Service",
    title: "Reply to a customer complaint",
    body: "Act as a calm, experienced customer service manager. Write a professional, empathetic reply to this complaint for [business name]: [paste complaint]. Acknowledge the issue and offer a clear next step.",
    proTip: "Reply within the hour where you can — fast responses defuse most complaints before they escalate.",
  },
  {
    section: "Marketing & Content",
    title: "Plan a month of social media posts",
    body: "Act as a social media manager. Create a 30-day content calendar for [business name], a [industry] business — mixing promotions, tips, behind-the-scenes, and customer stories, with a caption for each.",
    proTip: "Batch a month of posts in one sitting so you're never scrambling for something to publish.",
  },
  {
    section: "Sales & Operations",
    title: "Write a sales proposal that wins the deal",
    body: "Act as a sales consultant. Write a persuasive proposal for [client name] covering their problem, your solution for [product/service], pricing options, and a clear call to action.",
    proTip: "Lead with the client's problem, not your features — buyers respond to being understood.",
  },
  {
    section: "Operations & Admin",
    title: "Create a standard operating procedure",
    body: "Act as an operations expert. Write a clear, step-by-step SOP for [task] at [business name] so anyone on the team can follow it and get a consistent result every time.",
    proTip: "Documenting one task a week quietly turns a chaotic business into one that runs without you.",
  },
  {
    section: "Website & SEO",
    title: "Write homepage copy that converts",
    body: "Act as a conversion copywriter. Write homepage copy for [business name] that leads with the customer's main problem, presents your offer, lists the key benefits, and ends with a strong call to action.",
    proTip: "Your headline has about three seconds to earn a stay — make it about them, not you.",
  },
  {
    section: "Business Strategy",
    title: "Run a competitor analysis",
    body: "Act as a business strategist. Compare [competitor] with [business name] across pricing, positioning, and customer experience, then suggest three concrete ways we can stand out.",
    proTip: "Look for what competitors ignore — the gaps are usually where your edge is.",
  },
  {
    section: "Financial Management",
    title: "Build a 12-month cash flow forecast",
    body: "Act as a finance advisor. Build a simple 12-month cash flow forecast for [business name] from [monthly revenue] and [monthly costs], and flag the tightest months to plan for.",
    proTip: "Forecasting cash monthly is the single habit that prevents most small-business crises.",
  },
  {
    section: "HR & Team",
    title: "Write a job description for your first hire",
    body: "Act as an HR specialist. Write a clear, appealing job description for a [role] at [business name] — covering responsibilities, must-have skills, and why it's a great place to work.",
    proTip: "Lead with what the hire will gain — the best candidates are choosing you too.",
  },
];

const SPEED = 50; // px per second for the single continuous scroll

function Entry({ p }: { p: Prompt }) {
  return (
    <div className="mb-7">
      <span className="text-xs font-semibold uppercase tracking-widest text-accent">
        {p.section}
      </span>
      <h4 className="mt-1 text-base font-bold leading-snug text-[#1a2332]">
        {p.title}
      </h4>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.body}</p>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        <span className="font-semibold text-accent">Pro Tip </span>
        {p.proTip}
      </p>
    </div>
  );
}

export default function HeroPromptCards() {
  const trackRef = useRef<HTMLDivElement>(null);

  // One continuous, seamless loop: the selection is rendered twice and we scroll
  // up by exactly one set, so the wrap back to the start is invisible — no card
  // switching, no visible reset.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = trackRef.current;
    if (!t) return;
    const setH = t.scrollHeight / 2; // one of the two identical sets
    if (setH <= 0) return;
    const anim = t.animate(
      [{ transform: "translateY(0)" }, { transform: `translateY(-${setH}px)` }],
      { duration: (setH / SPEED) * 1000, easing: "linear", iterations: Infinity }
    );
    return () => anim.cancel();
  }, []);

  return (
    // The card is absolutely positioned so its tall scroll content doesn't
    // inflate the column height — it fills the height set by the left column.
    <div className="relative h-full w-full">
      <div className="absolute inset-0 flex flex-col rounded-xl border-l-4 border-[#0d9488] bg-white p-6 shadow-2xl">
      {/* Fixed header */}
      <div className="shrink-0">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">
          Small Business AI Toolkit
        </span>
        <h3 className="mt-2 text-xl font-bold leading-snug text-[#1a2332]">
          150 prompts, ready to use
        </h3>
      </div>
      <div className="mt-4 shrink-0 border-t border-slate-100" />

      {/* Single continuous scroll */}
      <div className="relative mt-4 min-h-0 flex-1 overflow-hidden">
        <div ref={trackRef}>
          {[...PROMPTS, ...PROMPTS].map((p, n) => (
            <Entry key={n} p={p} />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent" />
      </div>
      </div>
    </div>
  );
}
