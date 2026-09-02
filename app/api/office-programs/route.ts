import { NextResponse } from "next/server";
import { Resend } from "resend";
import { OFFICE_PROGRAM_ITEM_PRICES } from "@/lib/wholesale-pricing";

const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "hello@boastcoffee.com";

const ITEM_OPTIONS = ["Nitro Coffee Kegs", "Nitro Tea Kegs", "Marin Kombucha", "Coffee Beans", "Other"];

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      businessName,
      items,
      itemDetails,
      message,
      company,
    } = body;

    // Honeypot: real users never see or fill this field.
    if (typeof company === "string" && company.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    if (!name || typeof name !== "string" || name.trim().length < 1) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (name.trim().length > 100) {
      return NextResponse.json({ error: "Name is too long" }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }
    if (email.trim().length > 200) {
      return NextResponse.json({ error: "Email is too long" }, { status: 400 });
    }
    if (typeof phone === "string" && phone.trim().length > 20) {
      return NextResponse.json({ error: "Phone number is too long" }, { status: 400 });
    }
    if (!businessName || typeof businessName !== "string" || businessName.trim().length < 1) {
      return NextResponse.json({ error: "Company name is required" }, { status: 400 });
    }
    if (businessName.trim().length > 150) {
      return NextResponse.json({ error: "Company name is too long" }, { status: 400 });
    }
    if (
      !Array.isArray(items) ||
      !items.every((item) => typeof item === "string" && ITEM_OPTIONS.includes(item))
    ) {
      return NextResponse.json({ error: "Invalid items selection" }, { status: 400 });
    }
    if (
      itemDetails !== undefined &&
      (typeof itemDetails !== "object" ||
        itemDetails === null ||
        Array.isArray(itemDetails) ||
        !Object.entries(itemDetails).every(
          ([key, value]) =>
            ITEM_OPTIONS.includes(key) && typeof value === "string" && value.length <= 200
        ))
    ) {
      return NextResponse.json({ error: "Invalid item details" }, { status: 400 });
    }
    if (typeof message === "string" && message.trim().length > 1000) {
      return NextResponse.json({ error: "Message is too long" }, { status: 400 });
    }

    const phoneTrimmed = typeof phone === "string" ? phone.trim() : "";
    const messageTrimmed = typeof message === "string" ? message.trim() : "";
    const details: Record<string, string> = itemDetails ?? {};
    const itemsList: string[] = (items as string[]).map((item) => {
      const detail = details[item]?.trim();
      const price = OFFICE_PROGRAM_ITEM_PRICES[item] ?? 0;
      return `${item}${detail ? ` — ${detail}` : ""} (internal ref: $${price}/unit)`;
    });
    const itemsSummary = itemsList.length > 0 ? itemsList.join("; ") : "None selected";

    const textLines = [
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      phoneTrimmed && `Phone: ${phoneTrimmed}`,
      `Company Name: ${businessName.trim()}`,
      `Items Interested In: ${itemsSummary}`,
      messageTrimmed && `\n${messageTrimmed}`,
    ].filter(Boolean);

    const { error } = await resend.emails.send({
      // Temporary: boastcoffee.com isn't verified in Resend yet. Swap back to
      // noreply@boastcoffee.com once the domain is verified in the Resend dashboard.
      from: "Boast Coffee Website <onboarding@resend.dev>",
      to: CONTACT_EMAIL,
      replyTo: email.trim(),
      subject: `[Office Programs] ${businessName.trim()}`,
      text: textLines.join("\n"),
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name.trim())}</p>
        <p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>
        ${phoneTrimmed ? `<p><strong>Phone:</strong> ${escapeHtml(phoneTrimmed)}</p>` : ""}
        <p><strong>Company Name:</strong> ${escapeHtml(businessName.trim())}</p>
        <p><strong>Items Interested In:</strong> ${escapeHtml(itemsSummary)}</p>
        ${messageTrimmed ? `<br><p>${escapeHtml(messageTrimmed).replace(/\n/g, "<br>")}</p>` : ""}
      `,
    });

    if (error) {
      console.error("Office Programs application error:", error);
      return NextResponse.json(
        { error: "Failed to send application. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Office Programs application error:", err);
    return NextResponse.json(
      { error: "Failed to send application. Please try again." },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
