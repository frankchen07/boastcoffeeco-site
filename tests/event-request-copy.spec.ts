import { test, expect } from '@playwright/test';
import { buildRequestCopy, formatEventTime } from '../lib/event-email';

const fields: [string, string][] = [
  ['Event Type', 'Wedding <b>Party</b>'],
  ['Expected Guests', '120'],
];

test('request copy includes the event fields', () => {
  const copy = buildRequestCopy(fields, false);
  for (const [label, value] of fields) {
    expect(copy.text).toContain(`${label}: ${value}`);
  }
  expect(copy.text).not.toMatch(/note/i);
  expect(copy.subject).toMatch(/event request/i);
});

test('request copy acknowledges a message without echoing it', () => {
  const copy = buildRequestCopy(fields, true);
  expect(copy.text).toMatch(/got your note/i);
  expect(copy.html).toMatch(/got your note/i);
});

test('request copy never mentions pricing', () => {
  const copy = buildRequestCopy(fields, true);
  for (const body of [copy.text, copy.html]) {
    expect(body).not.toMatch(/estimat|\$\d/i);
  }
});

test('request copy escapes field values in html', () => {
  const copy = buildRequestCopy(fields, false);
  expect(copy.html).not.toContain('<b>Party</b>');
});

test('formats datetime-local values for humans', () => {
  expect(formatEventTime('2026-11-07T14:30')).toBe('Sat, Nov 7, 2026, 2:30 PM');
});
