import { test, expect } from '@playwright/test';
import { createHmac } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';

// Needs a running server (next start) built from the current source.
const MANIFEST = '.next/server/server-reference-manifest.json';

function actionId(name: string): string {
  const manifest: { node: Record<string, { filename: string; exportedName: string }> } = JSON.parse(
    readFileSync(MANIFEST, 'utf8')
  );
  const entry = Object.entries(manifest.node).find(
    ([, v]) => v.filename === 'lib/wholesale-cart-actions.ts' && v.exportedName === name
  );
  if (!entry) throw new Error(`no action ${name} in ${MANIFEST}`);
  return entry[0];
}

function localEnv(key: string): string | undefined {
  if (!existsSync('.env.local')) return undefined;
  // Last definition wins, matching how Next loads .env files.
  const matches = [...readFileSync('.env.local', 'utf8').matchAll(new RegExp(`^${key}="?(.*?)"?$`, 'gm'))];
  return matches.at(-1)?.[1] || undefined;
}

async function callGetCart(request: import('@playwright/test').APIRequestContext, cookie?: string) {
  return request.post('/wholesaleshop/login', {
    headers: {
      'Next-Action': actionId('getCart'),
      Accept: 'text/x-component',
      'Content-Type': 'text/plain;charset=UTF-8',
      Origin: 'http://localhost:3000',
      ...(cookie ? { Cookie: `wholesale_auth=${cookie}` } : {}),
    },
    data: JSON.stringify(['gid://shopify/Cart/does-not-exist']),
  });
}

const hasWholesaleEnv = () =>
  Boolean(
    localEnv('WHOLESALE_SHOP_PASSWORD') &&
      localEnv('WHOLESALE_COOKIE_SECRET') &&
      localEnv('SHOPIFY_WHOLESALE_STOREFRONT_PRIVATE_TOKEN')
  );

// Both tests need working Shopify config; otherwise every call 500s and the refusal proves nothing.
test('wholesale cart action refuses callers without a session', async ({ request }) => {
  test.skip(!hasWholesaleEnv(), 'needs wholesale env in .env.local');
  const res = await callGetCart(request);
  expect(res.status()).toBe(500);
});

test('wholesale cart action works with a session', async ({ request }) => {
  test.skip(!hasWholesaleEnv(), 'needs wholesale env in .env.local');

  const cookie = createHmac('sha256', localEnv('WHOLESALE_COOKIE_SECRET')!)
    .update(`wholesaleshop-access:${localEnv('WHOLESALE_SHOP_PASSWORD')}`)
    .digest('hex');
  const res = await callGetCart(request, cookie);
  expect(res.status()).toBe(200);
});
