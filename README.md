# Boast Coffee Co.

Modern website rebuild for [boastcoffee.com](https://www.boastcoffee.com). Built with Next.js 16, Tailwind CSS v4, and Shopify Storefront API.

## Stack

- **Framework**: Next.js 16 (App Router, TypeScript)
- **Styles**: Tailwind CSS v4
- **E-commerce**: Shopify Storefront API (GraphQL)
- **Contact form**: Resend
- **Deployment**: Vercel

## Getting Started

1. Clone the repo
2. Copy `.env.example` to `.env` and fill in values
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the dev server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description |
|----------|-------------|
| `SHOPIFY_STORE_DOMAIN` | Your Shopify store domain (e.g. `store.myshopify.com`) |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Storefront API access token from Shopify Admin |
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com) |
| `CONTACT_EMAIL` | Email address to receive contact form submissions |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, featured products, brand story |
| `/shop` | Product grid with cart + Shopify checkout |
| `/nitro` | Nitro cold brew feature page |
| `/about` | Brand story and values |
| `/contact` | Contact form and business info |

## Shopify Setup

1. Create a Shopify store at [shopify.com](https://shopify.com)
2. Go to **Settings > Apps and sales channels > Develop apps**
3. Create a custom app, grant Storefront API access (products, cart)
4. Copy the Storefront API access token to your `.env`

## Operational Runbooks

The retail site is headless and stateless — no admin backend, no database, and no Shopify Admin API access. It can only read Storefront data and send emails. Anything beyond that (approvals, account setup, order changes) happens by hand in Shopify Admin.

**Adding Products**
- If a product has a retail and a wholesale variant, making a duplicate is the cleanest way to achieve this. 
- Add the retail and the wholesale duplicate, ensure that the variants are different (usually size/amount).
- Exclude retail products from the Shopify online store, and include retail products to the Boast headless store.
- Include respective products into the individual or wholesale catalogs.
- Tag retail products until retail, and wholesale products under wholesale

**Wholesale Customer: Application → Approval**
1. Customer submits the form at `/wholesale` → emails Frank via Resend (`app/api/wholesale/route.ts`) with business details. No Shopify object is created yet.
2. Frank reviews the email, then manually creates a company entry in Shopify Admin.
3. Frank adds a customer contact to the company entry.
3. Shopify emails the new contact an invite to set up their login.
4. Frank separately sends the approved contact the dedicated wholesale storefront URL (the standard Shopify theme, e.g. `boast-coffee.myshopify.com` — not the headless site. It should be in the invite email though. Once logged in there, they see the wholesale catalog and can purchase.

**Retail Customers**
1. Customer clicks "Manage Subscription" and lands on https://boast-coffee.myshopify.com/tools/subscriptions
2. They can also see the wholesale site but if because have no company affiliation, they cannot purchase these items.
3. Subscription management happens here.
