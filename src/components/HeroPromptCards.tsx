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
    <div className="rounded-xl border-l-4 border-[#0d9488] bg-white p-6 shadow-2xl">
      <span className="text-xs font-semibold uppercase tracking-widest text-accent">
        {p.section}
      </span>
      <h3 className="mt-2 text-xl font-bold text-[#1a2332]">{p.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{p.body}</p>
      <div className="mt-4 flex items-start gap-2 border-t border-slate-100 pt-4">
        <span className="mt-0.5 shrink-0 rounded bg-accent/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent">
          Pro Tip
        </span>
        <span className="text-sm leading-relaxed text-slate-600">{p.proTip}</span>
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
    // All cards share one grid cell so the container sizes to the tallest card
    // (no fixed height) while the cross-fade stays smooth with no layout jump.
    <div className="grid w-full">
      {PROMPTS.map((p, i) => (
        <div
          key={i}
          className={`col-start-1 row-start-1 transition-opacity duration-700 ease-in-out ${
            i === index ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <Card p={p} />
        </div>
      ))}
    </div>
  );
}
