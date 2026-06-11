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
    body: "Act as an experienced business owner. Write a warm, professional welcome letter to a new client for [your business name]. Include a thank you for choosing you, what they can expect next, key contact details, and how to get in touch.",
    proTip:
      "A great welcome letter sets the tone for the whole relationship — clients who feel welcomed from day one are far less likely to cancel.",
  },
  {
    section: "SOCIAL MEDIA",
    title: "Write 5 Instagram captions for a product launch",
    body: "Act as a social media copywriter. Write 5 Instagram captions for the launch of [product name] by [business name]. Mix tones: one hype, one storytelling, one question-led, one benefit-focused, one behind-the-scenes.",
    proTip:
      "Variety in caption style means you can test what resonates with your audience without repeating yourself.",
  },
  {
    section: "CUSTOMER SERVICE",
    title: "Respond to a negative review professionally",
    body: "Act as a customer service manager. Write a professional, empathetic response to this negative review: [paste review]. Acknowledge the issue, apologise without admitting liability, and offer a resolution.",
    proTip:
      "Responding publicly to negative reviews shows future customers you take feedback seriously — it often builds more trust than a perfect score.",
  },
  {
    section: "HR & PEOPLE",
    title: "Write a job description for a new hire",
    body: "Act as an HR professional. Write a clear, engaging job description for a [job title] role at [company name]. Include responsibilities, requirements, what makes this a great place to work, and how to apply.",
    proTip:
      "Job descriptions that lead with what the candidate gets attract better applicants than those that lead with requirements.",
  },
  {
    section: "MARKETING",
    title: "Write a promotional email for a seasonal sale",
    body: "Act as an email marketing specialist. Write a promotional email for [business name] announcing [sale/offer]. Include a compelling subject line, punchy opening, clear offer details, urgency, and a strong CTA.",
    proTip:
      "The subject line determines whether the email gets opened — write 5 options and pick the best one rather than going with your first idea.",
  },
  {
    section: "OPERATIONS",
    title: "Create an onboarding checklist for a new employee",
    body: "Act as an operations manager. Create a structured 30-day onboarding checklist for a new [job title] at [company name]. Cover week 1 essentials, training milestones, key introductions, and first project goals.",
    proTip:
      "The first 30 days determine whether a new hire stays long-term — a structured onboarding plan reduces early turnover significantly.",
  },
];

export default function PromptShowcase() {
  const [visibleCount, setVisibleCount] = useState(3);
  const [reduced, setReduced] = useState(false);
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  // Responsive visible count + reduced-motion preference.
  useEffect(() => {
    const mqDesktop = window.matchMedia("(min-width: 768px)");
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setVisibleCount(mqDesktop.matches ? 3 : 1);
      setReduced(mqReduce.matches);
      setIndex(0);
      setAnimate(true);
    };
    update();
    mqDesktop.addEventListener("change", update);
    mqReduce.addEventListener("change", update);
    return () => {
      mqDesktop.removeEventListener("change", update);
      mqReduce.removeEventListener("change", update);
    };
  }, []);

  // Auto-advance one card every 3s (paused for reduced motion).
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setIndex((i) => i + 1), 3000);
    return () => clearInterval(id);
  }, [reduced, visibleCount]);

  // When we slide onto the cloned cards, snap back to the start with no transition.
  useEffect(() => {
    if (index !== PROMPTS.length) return;
    const t = setTimeout(() => {
      setAnimate(false);
      setIndex(0);
    }, 700);
    return () => clearTimeout(t);
  }, [index]);

  // Re-enable the transition on the next frame after a no-transition snap.
  useEffect(() => {
    if (animate) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    return () => cancelAnimationFrame(id);
  }, [animate]);

  // Clone the first `visibleCount` cards so the loop is seamless.
  const slides = [...PROMPTS, ...PROMPTS.slice(0, visibleCount)];
  const slidePct = 100 / visibleCount;

  return (
    <section className="bg-[#1a2332]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            See What&apos;s Inside
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Real prompts from our toolkits — ready to copy and use
          </p>
        </div>

        <div className="mt-12 overflow-hidden">
          <div
            className="flex w-full"
            style={{
              transform: `translateX(-${index * slidePct}%)`,
              transition: animate ? "transform 700ms ease-in-out" : "none",
            }}
          >
            {slides.map((p, i) => (
              <div
                key={i}
                className="shrink-0 px-3"
                style={{ width: `${slidePct}%` }}
                aria-hidden={i >= PROMPTS.length}
              >
                <div className="flex h-full flex-col rounded-xl border border-white/10 bg-white/5 p-6">
                  <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                    {p.section}
                  </span>
                  <h3 className="mt-2 text-base font-semibold text-white">
                    {p.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 flex-grow text-sm leading-relaxed text-slate-300">
                    {p.body}
                  </p>
                  <div className="mt-4 rounded-lg border border-accent/20 bg-accent/10 p-3">
                    <p className="text-xs leading-relaxed text-slate-300">
                      <span className="font-semibold text-accent">★ Pro Tip</span>{" "}
                      {p.proTip}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
