export type EmailField = [label: string, value: string];

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// datetime-local values carry no timezone, so format the wall-clock time as-is.
export function formatEventTime(value: string): string {
  return new Date(`${value}Z`).toLocaleString("en-US", {
    timeZone: "UTC",
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function fieldsToText(fields: EmailField[]): string[] {
  return fields.map(([label, value]) => `${label}: ${value}`);
}

export function fieldsToHtml(fields: EmailField[]): string {
  return fields
    .map(([label, value]) => `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>`)
    .join("\n");
}

// Copy of the request sent back to the customer. Never include pricing here.
// Recipient is unverified, so only allowlisted event fields go out.
export function buildRequestCopy(eventFields: EmailField[], hasMessage: boolean) {
  const intro =
    "Thanks for reaching out to Boast Coffee Co.! We received your event request and a member of our team will follow up soon. Here are your event details:";
  const note = "We also got your note and will read it before we follow up.";
  const outro = "Questions in the meantime? Just reply to this email.";

  return {
    subject: "We got your event request - Boast Coffee Co.",
    text: [intro, "", ...fieldsToText(eventFields), ...(hasMessage ? ["", note] : []), "", outro].join(
      "\n"
    ),
    html: `
      <p>${intro}</p>
      ${fieldsToHtml(eventFields)}
      ${hasMessage ? `<p>${note}</p>` : ""}
      <p>${outro}</p>
    `,
  };
}
