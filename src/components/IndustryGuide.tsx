import { IndustryContent } from "@/data/products/industry-content";

/** "How [industry] use AI" copy and FAQs shown below the toolkits on an industry page. */
export default function IndustryGuide({ content }: { content: IndustryContent }) {
  const { guide, faqs } = content;

  return (
    <div className="mt-16 grid gap-12 border-t border-border pt-12 lg:grid-cols-2">
      <section>
        <h2 className="mb-4 text-2xl font-semibold text-charcoal">{guide.heading}</h2>
        <p className="leading-relaxed text-foreground">{guide.body}</p>
        <ul className="mt-5 space-y-3">
          {guide.points.map((point) => (
            <li key={point.label} className="flex gap-3 leading-relaxed text-foreground">
              <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>
                <strong className="font-semibold text-charcoal">{point.label}</strong> —{" "}
                {point.text}
              </span>
            </li>
          ))}
        </ul>
        {guide.closing && (
          <p className="mt-5 leading-relaxed text-foreground">{guide.closing}</p>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-charcoal">Frequently Asked Questions</h2>
        <div className="divide-y divide-border rounded-lg border border-border bg-card-bg">
          {faqs.map((faq) => (
            <details key={faq.question} className="group px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-charcoal">
                {faq.question}
                <span
                  aria-hidden
                  className="text-xl leading-none text-accent transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
