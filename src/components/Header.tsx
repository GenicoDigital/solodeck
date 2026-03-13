import Link from "next/link";
import CartCount from "./CartCount";

export default function Header() {
  return (
    <header className="border-b border-border bg-card-bg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl tracking-tight text-charcoal">
          <span className="font-bold">Solo</span>
          <span className="font-normal">Deck</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/products"
            className="text-sm text-muted hover:text-charcoal transition-colors"
          >
            Products
          </Link>
          <Link
            href="/contact"
            className="text-sm text-muted hover:text-charcoal transition-colors"
          >
            Contact
          </Link>
          <CartCount />
        </nav>
      </div>
    </header>
  );
}
