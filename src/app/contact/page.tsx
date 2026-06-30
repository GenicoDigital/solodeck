export const metadata = {
  title: "Contact — SoloDeck",
};

export default function ContactPage() {
  return (
    <div>
      {/* Dark navy hero band */}
      <section className="bg-[#1a2332]">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            We&apos;re here to help — whether you&apos;re not sure which toolkit
            is right for you, have a question about an order, or just want to say
            hello. We&apos;ll get back to you within one working day.
          </p>
        </div>
      </section>

      {/* Form + contact options */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        {/* Form card */}
        <div className="mx-auto max-w-lg rounded-xl bg-white p-8 shadow-md sm:p-10">
          <form className="space-y-5">
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
          <p className="mt-4 text-center text-sm text-slate-500">
            We aim to respond within one working day.
          </p>
        </div>

        {/* Contact options row */}
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
          {/* Email Us */}
          <div className="rounded-xl border-t-4 border-accent bg-white p-8 text-center shadow-md">
            <svg
              className="mx-auto h-10 w-10 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            <h3 className="mt-4 text-lg font-bold text-[#1a2332]">Email Us</h3>
            <a
              href="mailto:hello@solodeck.co"
              className="mt-2 inline-block text-sm font-medium text-accent hover:text-accent-hover"
            >
              hello@solodeck.co
            </a>
          </div>

          {/* Not sure which toolkit? */}
          <div className="rounded-xl border-t-4 border-accent bg-white p-8 text-center shadow-md">
            <svg
              className="mx-auto h-10 w-10 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-bold text-[#1a2332]">
              Not sure which toolkit?
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Tell us about your business and we&apos;ll point you in the right
              direction.
            </p>
          </div>

          {/* Response Time */}
          <div className="rounded-xl border-t-4 border-accent bg-white p-8 text-center shadow-md">
            <svg
              className="mx-auto h-10 w-10 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-bold text-[#1a2332]">Response Time</h3>
            <p className="mt-2 text-sm text-slate-600">
              We aim to get back to you within one working day.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
