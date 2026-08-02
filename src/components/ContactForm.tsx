"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");
    try {
      const res = await fetch("https://formspree.io/f/mgoggeop", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="text-sm text-slate-600">
        Thanks for your message — we&apos;ll get back to you within one working day.
      </p>
    );
  }

  return (
    <>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <input
          type="hidden"
          name="_subject"
          value="New message from SoloDeck contact form"
        />
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
          disabled={status === "submitting"}
          className="w-full rounded-md bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
        >
          {status === "submitting" ? "Sending..." : "Send message"}
        </button>
        {status === "error" && (
          <p className="mt-3 text-sm text-red-600">
            Something went wrong — please try again or email us at hello@solodeck.co
          </p>
        )}
      </form>
      <p className="mt-4 text-center text-sm text-slate-500">
        We aim to respond within one working day.
      </p>
    </>
  );
}
