import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import PromptShowcase from "@/components/PromptShowcase";
import { getFeaturedProducts, bundles } from "@/lib/products";

export default function Home() {
  const featured = getFeaturedProducts();
  const featuredBundles = bundles.filter((b) => b.featured);

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-charcoal sm:text-5xl">
          Your AI-Powered Toolkit for Getting More Done
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
          Ready-to-use prompt kits, templates, and guides built for small
          businesses and sole traders. No tech skills required — just
          download and start saving time.
        </p>
        <Link
          href="/products"
          className="mt-8 inline-block rounded-md bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
        >
          Browse all products
        </Link>
      </section>

      {/* See What's Inside — animated prompt showcase */}
      <PromptShowcase />

      {/* How It Works */}
      <section className="border-y border-border bg-card-bg">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-10 text-center text-2xl font-semibold text-charcoal">
            How It Works
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-xl font-bold text-accent">
                1
              </div>
              <h3 className="mb-2 text-base font-semibold text-charcoal">
                Pick your toolkit
              </h3>
              <p className="text-sm text-muted">
                Browse ready-made prompt kits, templates, and guides designed
                for your type of business.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-xl font-bold text-accent">
                2
              </div>
              <h3 className="mb-2 text-base font-semibold text-charcoal">
                Pay and download
              </h3>
              <p className="text-sm text-muted">
                Checkout securely with Stripe. Your download links arrive
                straight to your inbox — no account needed.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-xl font-bold text-accent">
                3
              </div>
              <h3 className="mb-2 text-base font-semibold text-charcoal">
                Start saving time
              </h3>
              <p className="text-sm text-muted">
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

      {/* Bundles */}
      {featuredBundles.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <h2 className="mb-6 text-2xl font-semibold text-charcoal">
            Bundles — Save More
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredBundles.map((bundle) => (
              <ProductCard key={bundle.slug} item={bundle} type="bundle" />
            ))}
          </div>
        </section>
      )}

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
