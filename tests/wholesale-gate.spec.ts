import { test, expect } from '@playwright/test';

// Needs a running server (next start) on baseURL. No wholesale cookie is sent.
const prefetch = { RSC: '1', 'Next-Router-Prefetch': '1' };

const variants: [string, Record<string, string>][] = [
  ['/wholesaleshop', {}],
  ['/wholesaleshop', { RSC: '1' }],
  ['/wholesaleshop', { ...prefetch, 'Next-Router-Segment-Prefetch': '/_tree' }],
  ['/wholesaleshop', { ...prefetch, 'Next-Router-Segment-Prefetch': '/wholesaleshop/__PAGE__' }],
  ['/wholesaleshop.rsc', {}],
  ['/wholesaleshop.segments/_tree.segment.rsc', {}],
  ['/wholesaleshop.segments/_full.segment.rsc', {}],
  ['/wholesaleshop.segments/wholesaleshop/__PAGE__.segment.rsc', {}],
  ['/wholesaleshop.segments/wholesaleshop/__PAGE__.segment.rsc', prefetch],
  ['/wholesaleshop/signature-blend', {}],
  ['/wholesaleshop/signature-blend.rsc', {}],
];

for (const [path, headers] of variants) {
  test(`unauthenticated ${path} ${JSON.stringify(headers)} gets no wholesale content`, async ({ request }) => {
    const res = await request.get(path, { headers, maxRedirects: 0 });
    const body = await res.text();
    expect(res.status()).not.toBe(200);
    expect(body).not.toContain('Bulk sizes and wholesale pricing');
    expect(body).not.toMatch(/"amount":"\d/);
    if (res.status() >= 300 && res.status() < 400) {
      expect(res.headers()['location']).toContain('/wholesaleshop/login');
    }
  });
}
