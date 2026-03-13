export const metadata = {
  title: "Contact — SoloDeck",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="mb-3 text-3xl font-bold text-charcoal">Get in Touch</h1>
      <p className="mb-8 text-muted">
        Not sure which toolkit is right for you? Got a question about an order?
        Drop us a message and we&apos;ll get back to you as soon as we can.
      </p>

      <form className="mb-10 space-y-5">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-charcoal">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full rounded-md border border-border bg-card-bg px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-charcoal">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full rounded-md border border-border bg-card-bg px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="message" className="mb-1 block text-sm font-medium text-charcoal">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="w-full rounded-md border border-border bg-card-bg px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            placeholder="Tell us how we can help..."
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
        >
          Send message
        </button>
      </form>

      <div className="rounded-lg border border-border bg-card-bg p-6">
        <h2 className="mb-2 text-base font-semibold text-charcoal">
          Prefer Email?
        </h2>
        <p className="text-sm text-muted">
          You can reach us directly at{" "}
          <a
            href="mailto:hello@solodeck.co"
            className="text-accent hover:text-accent-hover underline"
          >
            hello@solodeck.co
          </a>
        </p>
      </div>
    </div>
  );
}
