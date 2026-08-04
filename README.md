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
| `/wholesaleshop` | Second headless storefront (separate Shopify Storefront API token/channel) for wholesale-tagged products. Not linked from nav, noindexed — access is link-only. |
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

**Provisioning the wholesale storefront (`/wholesaleshop`)**
- In Shopify Admin, create a second "Headless" sales channel (Settings > Apps and sales channels > Develop apps) distinct from the one retail uses.
- Generate its own Storefront API access token and grant it Storefront API access (products, cart) same as retail.
- Publish only wholesale-tagged products to this second channel — this is what scopes `/wholesaleshop`'s catalog to wholesale products automatically, no app-side filtering needed.
- Add the token to `.env` as `SHOPIFY_WHOLESALE_STOREFRONT_ACCESS_TOKEN` (same `SHOPIFY_STORE_DOMAIN` as retail).
- Pricing is one shared wholesale price list for everyone with the link — there's no login, so Shopify's per-company negotiated pricing doesn't apply here.

**Wholesale Customer: Application → Approval**
1. Customer submits the form at `/wholesale` → emails Frank via Resend (`app/api/wholesale/route.ts`) with business details. No Shopify object is created yet.
2. Frank reviews the email, then manually creates a company entry in Shopify Admin, and adds a customer contact to it (kept for record-keeping — this is not a login gate).
3. Frank sends the approved contact the `/wholesaleshop` link directly (on this headless site, not the standard Shopify theme). No login required — access is link-only, and the wholesale catalog/pricing is scoped by the second headless channel's Storefront API token, not by company affiliation.
4. The customer browses, adds to cart, and checks out through real Shopify checkout, same as retail — one-time purchases and subscriptions (selling plans) both work.
5. Afterward, the customer manages any subscription the same way retail customers do — via the standard Shopify subscriptions portal, matched by their checkout email.

**Retail Customers**
1. Customer clicks "Manage Subscription" and lands on https://boast-coffee.myshopify.com/tools/subscriptions
2. They can also see the wholesale site but if because have no company affiliation, they cannot purchase these items.
3. Subscription management happens here.
