"use client";

import { useEffect, useState } from "react";

interface Prompt {
  section: string;
  title: string;
  body: string;
  proTip: string;
}

const PROMPTS: Prompt[] = [
  {
    section: "CLIENT COMMUNICATION",
    title: "Write a welcome letter to a new client",
    body: "Act as an experienced business owner. Write a warm, professional welcome letter to a new client for [your business name].",
    proTip: "Clients who feel welcomed from day one are far less likely to cancel.",
  },
  {
    section: "SOCIAL MEDIA",
    title: "Write 5 Instagram captions for a product launch",
    body: "Act as a social media copywriter. Write 5 Instagram captions for the launch of [product name] by [business name]. Mix tones: hype, storytelling, question-led.",
    proTip: "Variety in caption style lets you test what resonates without repeating yourself.",
  },
  {
    section: "CUSTOMER SERVICE",
    title: "Respond to a negative review professionally",
    body: "Act as a customer service manager. Write a professional, empathetic response to this negative review: [paste review].",
    proTip: "Responding publicly to negative reviews often builds more trust than a perfect score.",
  },
  {
    section: "HR & PEOPLE",
    title: "Write a job description for a new hire",
    body: "Act as an HR professional. Write a clear, engaging job description for a [job title] role at [company name]. Include responsibilities and requirements.",
    proTip: "Job descriptions that lead with what the candidate gets attract better applicants.",
  },
  {
    section: "MARKETING",
    title: "Write a promotional email for a seasonal sale",
    body: "Act as an email marketing specialist. Write a promotional email for [business name] announcing [sale/offer] with a compelling subject line and strong CTA.",
    proTip: "Write 5 subject line options and pick the best — it determines whether the email gets opened.",
  },
  {
    section: "OPERATIONS",
    title: "Create a 30-day onboarding checklist",
    body: "Act as an operations manager. Create a structured 30-day onboarding checklist for a new [job title] covering week 1 essentials, training, and first project goals.",
    proTip: "A structured onboarding plan significantly reduces early staff turnover.",
  },
];

function Card({ p }: { p: Prompt }) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-white/10 bg-[#0f1923] p-6 shadow-xl shadow-black/30">
      <span className="text-xs font-semibold uppercase tracking-wide text-accent">
        {p.section}
      </span>
      <h3 className="mt-2 text-lg font-semibold leading-snug text-white">
        {p.title}
      </h3>
      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-300">
        {p.body}
      </p>
      <div className="mt-auto flex items-start gap-2 pt-5">
        <span className="mt-0.5 shrink-0 rounded bg-accent/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent">
          Pro Tip
        </span>
        <span className="text-xs leading-relaxed text-slate-300">{p.proTip}</span>
      </div>
    </div>
  );
}

export default function HeroPromptCards() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % PROMPTS.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative ml-auto w-full max-w-md">
      {/* Ghost cards behind for depth */}
      <div className="absolute inset-0 translate-x-8 -translate-y-6 rotate-3 rounded-xl border border-white/10 bg-[#0f1923]/40" />
      <div className="absolute inset-0 translate-x-4 -translate-y-3 rotate-2 rounded-xl border border-white/10 bg-[#0f1923]/70" />

      {/* Front card — cross-fades through all prompts */}
      <div className="relative h-[330px]">
        {PROMPTS.map((p, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={i !== index}
          >
            <Card p={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
