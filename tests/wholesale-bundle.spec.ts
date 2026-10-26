import { test, expect } from '@playwright/test';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

// Checks the last `next build` output against the real values in .env.local without printing them.
const SECRET_KEYS = /WHOLESALE.*TOKEN|WHOLESALE_(SHOP_PASSWORD|COOKIE_SECRET)|RESEND_API_KEY|SHOPIFY_WEBHOOK_SECRET/;

function envValues(): [string, string][] {
  if (!existsSync('.env.local')) return [];
  return readFileSync('.env.local', 'utf8')
    .split('\n')
    .map((line) => line.match(/^([A-Z_]+)="?(.*?)"?$/))
    .filter((m): m is RegExpMatchArray => Boolean(m && SECRET_KEYS.test(m[1]) && m[2].length >= 8))
    .map((m) => [m[1], m[2]]);
}

function staticFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? staticFiles(join(dir, entry.name)) : [join(dir, entry.name)]
  );
}

test('browser bundles contain no wholesale token or server secret', () => {
  const secrets = envValues();
  test.skip(secrets.length === 0 || !existsSync('.next/static'), 'needs .env.local and a build');

  const files = staticFiles('.next/static').map((file) => readFileSync(file, 'utf8'));
  const leaked = secrets.filter(([, value]) => files.some((body) => body.includes(value))).map(([key]) => key);
  expect(leaked).toEqual([]);
});
