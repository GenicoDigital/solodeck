# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**SoloDeck** (solodeck.co) is an e-commerce website selling digital downloads — AI-powered prompt toolkits, templates, guides, and Google Sheets dashboards targeted at UK SMEs, small business owners, and sole traders. Customers purchase and receive download links via email; there are no user accounts (yet) and no physical fulfilment.

## Brand

- **Name**: SoloDeck
- **Domain**: solodeck.co
- **Tagline**: "Your AI-powered toolkit for getting more done"
- **Audience**: Small business owners, sole traders, and micro businesses who want to use AI without being technical. They feel left behind by AI and want practical, plain-English tools.
- **Tone**: Friendly but businesslike. Plain English, no jargon. Relatable and empowering — "this is made for someone like me." Not corporate, not techy, not lifestyle-bloggy.
- **Colours**:
  - Off-white background: `#f8f7f4`
  - Charcoal (text/headings): `#333333` / `#2d2d2d`
  - Teal accent (buttons/links/CTAs): `#0d9488`, hover: `#0f766e`
  - Muted text: `#6b7280`
  - Borders: `#e5e5e0`
  - Card backgrounds: `#ffffff`
- **Design style**: Minimal, clean, professional but approachable. Not corporate.
- **Font**: Geist (Next.js default)
- **Logo**: Wordmark — **Solo**Deck (bold "Solo", normal weight "Deck")

## Product Taxonomy

Products are organised along two dimensions:

### Product Types (what it is)
Prompt Library, AI Playbook, AI Template, AI Content System, Email Marketing System, AI Audit Tool, Done-For-You Copy, Custom GPT Guide, Google Sheets Dashboard, Guide

### Industries (who it's for)
All Businesses, Accountants & Bookkeepers, Wedding Planners, Manufacturing, HR, Social Media, Trades, Property, Coaches & Consultants, Salons & Beauty, Hospitality, Retail

- A product can belong to **multiple industries**
- Browsing is **industry-first**: customer picks their industry, then filters by product type
- "All Businesses" is the catch-all for products that apply universally
- When viewing a specific industry, products tagged "All Businesses" are also shown

### Product Formats
PDF, Google Sheets, Notion

### Price Tiers
- Entry: £7–£17 (prompt libraries, individual templates, mini guides)
- Mid: £27–£57 (playbooks, dashboards, content systems, email systems)
- Premium: £97–£197 (full implementation kits, done-for-you copy packs)

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Payments**: Stripe Checkout (one-time purchases, GBP)
- **File Storage**: Cloudflare R2 with signed/expiring URLs for secure downloads
- **Hosting**: Vercel
- **Product Data**: JSON files in `src/data/products/` (no database initially)
- **Email**: Transactional emails for order confirmation + download links (provider TBD)
- **Cart**: Client-side React context with localStorage persistence

## Build & Development Commands

- `npm run dev` — start local dev server
- `npm run build` — production build
- `npm run lint` — lint and format check

## Architecture

### Product Data (file-based, no database)

Products are defined in `src/data/products/products.json` and bundles in `src/data/products/bundles.json`. Each product has: name, slug, description, pricePence (integer), productType, industries (array), format, fileName, image, and optional featured flag. Adding a product means editing these JSON files in VS Code.

### Route Structure

- `/` — homepage (hero, how it works, featured, who it's for, FAQs)
- `/products` — industry picker ("What kind of business do you run?")
- `/products/[industry]` — products filtered by industry with product type tabs
- `/products/all` — all products with product type filter tabs
- `/products/item/[slug]` — individual product detail page
- `/products/bundles/[slug]` — bundle detail page with included products breakdown
- `/cart` — shopping cart with quantity controls and discount logic
- `/contact` — contact form + email address

### Purchase Flow

1. Customer browses by industry, then filters by product type
2. Adds items to cart (persisted in localStorage)
3. Checkout redirects to Stripe Checkout (hosted by Stripe)
4. Stripe webhook confirms payment
5. Server generates time-limited signed URLs for the purchased files from R2
6. Confirmation email sent with download links
7. No user account required

### Discount Logic

- Bundles have a set discounted price (not calculated from individual items)
- Multi-buy offer: any 3 standalone toolkits cost a flat £60, applied once per complete group of 3 (by total quantity, not unique items). The priciest items are grouped first, and a group is never charged more than its natural total (no upcharge on sub-£60 trios). Leftover items below a full group of 3 are at full price.
- Bundles are excluded from both the count and the discount
- No coupon/promo code system initially

### Refund Policy (UK legal requirement)

- Cannot use blanket "no refunds" — must honour statutory rights for faulty/misdescribed content (Consumer Rights Act 2015)
- Can refuse change-of-mind refunds IF checkout includes an unticked checkbox: customer consents to immediate delivery AND acknowledges loss of 14-day cooling-off right
- Confirmation email must record that consent was given

### Future Additions (architect for but don't build yet)

- Customer accounts with login, order history, and re-download access
- International sales with multi-currency support
- Coupon/promo codes
- Video courses / mini courses

## Business Rules

- All products are digital-only — no shipping logic.
- Download links must be time-limited and tied to a completed purchase.
- All prices in GBP. Store prices as integers (pence) to avoid floating point issues.
- UK digital VAT (20%) must be handled — Stripe Tax or manual calculation.
- Product files must never be publicly accessible — serve via signed/expiring URLs only.
- UK market initially.
