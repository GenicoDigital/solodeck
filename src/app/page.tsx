import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import HeroPromptCards from "@/components/HeroPromptCards";
import { getFeaturedProducts } from "@/lib/products";

export default function Home() {
  const featured = getFeaturedProducts();

  return (
    <div>
      {/* Hero — split dark navy band */}
      <section className="bg-[#1a2332]">
        <div className="mx-auto flex min-h-[600px] max-w-6xl items-center px-6 py-20">
          <div className="grid w-full items-stretch gap-12 md:grid-cols-2">
            {/* Left: copy */}
            <div className="flex flex-col justify-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-accent">
                AI Prompt Toolkits for Small Business
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                <span className="block">Get More Done with AI.</span>
                <span className="mt-4 block">Without the Learning Curve</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-slate-300">
                Ready-to-use prompt kits built for small businesses and sole
                traders. Pick your toolkit, copy the prompts, and start saving
                time today.
              </p>
              <Link
                href="/products"
                className="mt-8 inline-block rounded-md bg-accent px-7 py-3.5 text-base font-medium text-white transition-colors hover:bg-accent-hover"
              >
                Browse all products
              </Link>
            </div>

            {/* Right: animated prompt cards (hidden on mobile) */}
            <div className="hidden md:block">
              <HeroPromptCards />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y border-border bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-10 text-center text-2xl font-semibold text-[#1a2332]">
            How It Works
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Step 1 — Pick your toolkit */}
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
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              <p className="mt-4 text-5xl font-bold text-accent opacity-40">1</p>
              <h3 className="mt-2 text-lg font-bold text-[#1a2332]">
                Pick your toolkit
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Browse ready-made prompt kits, templates, and guides designed
                for your type of business.
              </p>
            </div>

            {/* Step 2 — Pay and download */}
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
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 21Z"
                />
              </svg>
              <p className="mt-4 text-5xl font-bold text-accent opacity-40">2</p>
              <h3 className="mt-2 text-lg font-bold text-[#1a2332]">
                Pay and download
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Checkout securely with Stripe. Your download links arrive
                straight to your inbox — no account needed.
              </p>
            </div>

            {/* Step 3 — Start saving time */}
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
                  d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                />
              </svg>
              <p className="mt-4 text-5xl font-bold text-accent opacity-40">3</p>
              <h3 className="mt-2 text-lg font-bold text-[#1a2332]">
                Start saving time
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Open your PDF, copy the prompts into ChatGPT or your favourite
                AI tool, and put them to work straight away.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-6 text-center text-2xl font-semibold text-charcoal">
            Best Sellers
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product) => (
              <ProductCard key={product.slug} item={product} type="product" />
            ))}
          </div>
        </section>
      )}

      {/* Multi-buy offer — any 3 toolkits for £60 */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="overflow-hidden rounded-2xl bg-[#1a2332] px-8 py-12 text-center sm:px-12">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            Best Value
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Buy Any 3 Toolkits for £60
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
            Mix and match any three toolkits and pay a flat £60 — that&apos;s £21
            off the regular price. The discount is applied automatically in your
            cart.
          </p>
          <Link
            href="/products/all"
            className="mt-8 inline-block rounded-md bg-accent px-7 py-3.5 text-base font-medium text-white transition-colors hover:bg-accent-hover"
          >
            Browse all toolkits
          </Link>
        </div>
      </section>

      {/* Who It's For */}
      <section className="border-y border-border bg-card-bg">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-6 text-center text-2xl font-semibold text-charcoal">
            Built for Businesses Like Yours
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-muted">
            Whether you&apos;re a one-person operation or a small team,
            SoloDeck gives you the same AI advantage that bigger companies
            have — without the price tag or the learning curve.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-border bg-background p-6">
              <h3 className="mb-2 text-base font-semibold text-charcoal">
                Sole Traders
              </h3>
              <p className="text-sm text-muted">
                You&apos;re doing everything yourself — marketing, admin, customer
                service. These toolkits help you get through it faster.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-background p-6">
              <h3 className="mb-2 text-base font-semibold text-charcoal">
                Small Teams
              </h3>
              <p className="text-sm text-muted">
                You want to grow but can&apos;t afford to hire yet. AI prompts
                let your small team punch above its weight.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-background p-6">
              <h3 className="mb-2 text-base font-semibold text-charcoal">
                Trade Businesses
              </h3>
              <p className="text-sm text-muted">
                Plumbers, electricians, builders — you&apos;re great at what you
                do but marketing and admin eat into your day. We&apos;ve got
                toolkits made specifically for trades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="mb-8 text-center text-2xl font-semibold text-charcoal">
          Frequently Asked Questions
        </h2>
        <div className="divide-y divide-border">
          <details className="group py-4">
            <summary className="flex cursor-pointer items-center justify-between text-base font-medium text-charcoal">
              What format are the downloads?
              <span className="ml-2 text-muted transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              All products are delivered as PDF files. You can open them on
              any device — phone, tablet, or computer — and copy the prompts
              directly into ChatGPT or any other AI tool.
            </p>
          </details>
          <details className="group py-4">
            <summary className="flex cursor-pointer items-center justify-between text-base font-medium text-charcoal">
              Do I need any special software?
              <span className="ml-2 text-muted transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              No. You just need a PDF reader (which most devices have built in)
              and access to an AI tool like ChatGPT, which has a free plan.
              No coding or technical skills needed.
            </p>
          </details>
          <details className="group py-4">
            <summary className="flex cursor-pointer items-center justify-between text-base font-medium text-charcoal">
              Can I get a refund?
              <span className="ml-2 text-muted transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              Because digital downloads are delivered instantly, we&apos;re unable
              to offer refunds for change of mind once you&apos;ve accessed your
              files. At checkout, you&apos;ll be asked to confirm you&apos;re happy for
              delivery to begin straight away. If your download is faulty or
              not as described, you&apos;re fully covered — just{" "}
              <a href="/contact" className="text-accent hover:text-accent-hover underline">
                get in touch
              </a>{" "}
              and we&apos;ll sort it out.
            </p>
          </details>
          <details className="group py-4">
            <summary className="flex cursor-pointer items-center justify-between text-base font-medium text-charcoal">
              How do I receive my download?
              <span className="ml-2 text-muted transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              After payment, you&apos;ll receive an email with a secure download
              link. Just click the link to save your files. No account needed.
            </p>
          </details>
          <details className="group py-4">
            <summary className="flex cursor-pointer items-center justify-between text-base font-medium text-charcoal">
              What if I&apos;m not sure which product is right for me?
              <span className="ml-2 text-muted transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              No problem — drop us a message on the{" "}
              <a href="/contact" className="text-accent hover:text-accent-hover underline">
                contact page
              </a>{" "}
              and we&apos;ll point you in the right direction based on your
              business and what you&apos;re trying to achieve.
            </p>
          </details>
          <details className="group py-4">
            <summary className="flex cursor-pointer items-center justify-between text-base font-medium text-charcoal">
              Do the prompts work with any AI tool?
              <span className="ml-2 text-muted transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              Yes. The prompts are written in plain English and work with
              ChatGPT, Claude, Gemini, Copilot, and any other text-based AI
              tool. We include tips on how to get the best results.
            </p>
          </details>
        </div>
      </section>
    </div>
  );
}
