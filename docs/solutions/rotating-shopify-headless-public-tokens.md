# Rotating a Shopify Headless public token

**Date**: 2026-11-04

## The problem

A Storefront API public token needed to stop working. Removing it from Vercel and from the code doesn't do that: the token stays valid in Shopify. The Headless channel also has no revoke button for public tokens, only rotate and delete for private ones.

## The solution / decision

Replace the storefront:

1. Create a new Headless storefront and generate its private token.
2. Publish the products to it. Each storefront is its own channel.
3. Update the env var in Vercel and `.env.local`, then redeploy.
4. Query the Storefront API with the new token and compare products and prices against the old channel.
5. Delete the old storefront, which invalidates all of its tokens and can't be undone.

## Why it wasn't obvious

- "Removed from Vercel" sounds like "revoked" but only stops this site from using the token.
- Deleting a storefront also kills any private token on it, so the replacement has to be live first.
- Vercel `sensitive` env vars can't be read back, so check the deploy by behavior. `vercel env ls --format=json` does show `updatedAt`, which confirms a swap landed.
- New orders are attributed to the new storefront's name.

## Pointers

- [Manage the Headless channel](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/manage-headless-channels)
- `lib/shopify-wholesale.ts`
