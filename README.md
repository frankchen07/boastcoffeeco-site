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
