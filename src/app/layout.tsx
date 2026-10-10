import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { CartProvider } from "@/lib/cart-context";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SoloDeck — AI Prompt Toolkits for Small Businesses",
    template: "%s | SoloDeck",
  },
  description:
    "Ready-to-use prompt toolkits, templates, and guides that help small businesses and sole traders work smarter with AI. No technical skills needed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body className={`${geistSans.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
