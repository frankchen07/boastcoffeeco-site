import { test, expect } from '@playwright/test';
import { POST } from '../app/api/contact/route';
import { CART_TYPES } from '../lib/event-pricing';

type SentEmail = { to: string | string[]; subject: string; text: string; html: string };

function stubResend() {
  const sent: SentEmail[] = [];
  const realFetch = globalThis.fetch;
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    if (String(input).startsWith('https://api.resend.com/')) {
      sent.push(JSON.parse(String(init?.body)));
      return new Response(JSON.stringify({ id: 'email_test' }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    }
    return realFetch(input, init);
  }) as typeof fetch;
  return { sent, restore: () => (globalThis.fetch = realFetch) };
}

const future = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16);

const payload = {
  name: 'Account locked - verify at evil.example',
  email: 'victim@example.com',
  phone: '555-0100',
  eventType: 'Wedding',
  guestCount: '120',
  eventStart: future,
  eventEnd: future,
  solarVan: 'No',
  specialDrinks: [],
  message: 'Your order failed. Pay at https://evil.example/pay',
};

test('submitter copy never echoes free-text fields', async () => {
  const realKey = process.env.RESEND_API_KEY;
  process.env.RESEND_API_KEY = 're_test_key';
  const resend = stubResend();
  try {
    const res = await POST(
      new Request('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify({ ...payload, cartType: Object.keys(CART_TYPES)[0] }),
      })
    );
    expect(res.status).toBe(200);

    expect(resend.sent).toHaveLength(2);
    const [owner, copy] = resend.sent;
    expect(owner.text).toContain(payload.message);
    expect([copy.to].flat()).toEqual([payload.email]);
    for (const body of [copy.subject, copy.text, copy.html]) {
      expect(body).not.toContain('evil.example');
      expect(body).not.toContain(payload.phone);
    }
    expect(copy.text).toContain('Wedding');
    expect(copy.text).toMatch(/note/i);
  } finally {
    resend.restore();
    process.env.RESEND_API_KEY = realKey;
  }
});
