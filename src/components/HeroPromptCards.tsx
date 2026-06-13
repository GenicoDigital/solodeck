"use client";

import { useEffect, useRef, useState } from "react";

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

const DURATION = 3000; // ms per card, matches the scroll animation length

function Entry({ p }: { p: Prompt }) {
  return (
    <div className="mb-6">
      <p className="text-sm leading-relaxed text-slate-600">{p.body}</p>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        <span className="font-semibold text-accent">Pro Tip </span>
        {p.proTip}
      </p>
    </div>
  );
}

function Card({ i, reduce }: { i: number; reduce: boolean }) {
  const p = PROMPTS[i];
  // Stack a few prompts so the content overflows the tall window and the
  // teleprompter has something to scroll through.
  const scrollPrompts = [0, 1, 2].map((n) => PROMPTS[(i + n) % PROMPTS.length]);
  const winRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Measure the overflow and run a linear translateY scroll over the card's
  // lifetime. Web Animations API avoids the CSS-var-in-keyframe timing issue.
  useEffect(() => {
    if (reduce) return;
    const w = winRef.current;
    const t = trackRef.current;
    if (!w || !t) return;
    const dist = Math.max(0, t.scrollHeight - w.clientHeight);
    if (dist === 0) return;
    const anim = t.animate(
      [{ transform: "translateY(0)" }, { transform: `translateY(-${dist}px)` }],
      { duration: DURATION, easing: "linear", fill: "forwards" }
    );
    return () => anim.cancel();
  }, [reduce]);

  return (
    <div className="flex h-full flex-col rounded-xl border-l-4 border-[#0d9488] bg-white p-6 shadow-2xl">
      {/* Fixed header */}
      <div className="shrink-0">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">
          {p.section}
        </span>
        <h3 className="mt-2 text-xl font-bold leading-snug text-[#1a2332]">
          {p.title}
        </h3>
      </div>
      <div className="mt-4 shrink-0 border-t border-slate-100" />

      {/* Scrolling window */}
      <div ref={winRef} className="relative mt-4 min-h-0 flex-1 overflow-hidden">
        <div ref={trackRef}>
          {scrollPrompts.map((sp, n) => (
            <Entry key={n} p={sp} />
          ))}
        </div>
        {/* Soft fade where new text emerges */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent" />
      </div>
    </div>
  );
}

export default function HeroPromptCards() {
  const [reduce, setReduce] = useState(false);
  // Two persistent layers that cross-fade. The fading-out layer keeps its
  // content (and scroll position); the fading-in layer remounts fresh.
  const [layers, setLayers] = useState<[number, number]>([0, 0]);
  const [keys, setKeys] = useState<[number, number]>([0, 0]);
  const [front, setFront] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    if (mq.matches) return;

    let curFront = 0;
    const id = setInterval(() => {
      const back = curFront === 0 ? 1 : 0;
      setLayers((prev) => {
        const nextIdx = (prev[curFront] + 1) % PROMPTS.length;
        const n: [number, number] = [...prev] as [number, number];
        n[back] = nextIdx;
        return n;
      });
      setKeys((prev) => {
        const n: [number, number] = [...prev] as [number, number];
        n[back] = n[back] + 1; // remount the incoming layer so its scroll restarts
        return n;
      });
      setFront(back);
      curFront = back;
    }, DURATION);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative h-full w-full">
      {[0, 1].map((layer) => (
        <div
          key={layer}
          className="absolute inset-0 transition-opacity duration-700 ease-out"
          style={{ opacity: front === layer ? 1 : 0 }}
          aria-hidden={front !== layer}
        >
          <Card key={keys[layer]} i={layers[layer]} reduce={reduce} />
        </div>
      ))}
    </div>
  );
}
