import { test, expect } from '@playwright/test';
import { buildRequestCopy, formatEventTime } from '../lib/event-email';

const fields: [string, string][] = [
  ['Name', 'Jane <b>Doe</b>'],
  ['Email', 'jane@example.com'],
  ['Event Type', 'Wedding'],
  ['Expected Guests', '120'],
];

test('request copy includes the submitted fields and message', () => {
  const copy = buildRequestCopy(fields, 'Outdoor ceremony\nnear the lake');
  for (const [label, value] of fields) {
    expect(copy.text).toContain(`${label}: ${value}`);
  }
  expect(copy.text).toContain('Outdoor ceremony\nnear the lake');
  expect(copy.html).toContain('Outdoor ceremony<br>near the lake');
  expect(copy.subject).toMatch(/event request/i);
});

test('request copy never mentions pricing', () => {
  const copy = buildRequestCopy(fields, '');
  for (const body of [copy.text, copy.html]) {
    expect(body).not.toMatch(/estimat|\$\d/i);
  }
});

test('request copy escapes user input in html', () => {
  const copy = buildRequestCopy(fields, '<script>x</script>');
  expect(copy.html).not.toContain('<b>Doe</b>');
  expect(copy.html).not.toContain('<script>');
});

test('formats datetime-local values for humans', () => {
  expect(formatEventTime('2026-11-07T14:30')).toBe('Sat, Nov 7, 2026, 2:30 PM');
});
