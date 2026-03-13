import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card-bg mt-auto">
      <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} SoloDeck. All rights reserved.
        </p>
        <nav className="flex gap-6">
          <Link
            href="/terms"
            className="text-sm text-muted hover:text-charcoal transition-colors"
          >
            Terms &amp; Conditions
          </Link>
          <Link
            href="/privacy"
            className="text-sm text-muted hover:text-charcoal transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/contact"
            className="text-sm text-muted hover:text-charcoal transition-colors"
          >
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
