import { NextResponse } from "next/server";
import { Resend } from "resend";

const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "hello@boastcoffee.com";

const BUSINESS_TYPES = [
  "Cafe/Restaurant",
  "Grocery/Retail",
  "Office/Corporate",
  "Distributor",
  "Other",
];

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      businessName,
      businessType,
      volume,
      taxId,
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
      return NextResponse.json({ error: "Business name is required" }, { status: 400 });
    }
    if (businessName.trim().length > 150) {
      return NextResponse.json({ error: "Business name is too long" }, { status: 400 });
    }
    if (!businessType || typeof businessType !== "string" || !BUSINESS_TYPES.includes(businessType)) {
      return NextResponse.json({ error: "Valid business type is required" }, { status: 400 });
    }
    if (!volume || typeof volume !== "string" || volume.trim().length < 1) {
      return NextResponse.json({ error: "Estimated order volume is required" }, { status: 400 });
    }
    if (volume.trim().length > 200) {
      return NextResponse.json({ error: "Estimated order volume is too long" }, { status: 400 });
    }
    if (typeof taxId === "string" && taxId.trim().length > 100) {
      return NextResponse.json({ error: "Tax ID is too long" }, { status: 400 });
    }
    if (typeof message === "string" && message.trim().length > 1000) {
      return NextResponse.json({ error: "Message is too long" }, { status: 400 });
    }

    const phoneTrimmed = typeof phone === "string" ? phone.trim() : "";
    const taxIdTrimmed = typeof taxId === "string" ? taxId.trim() : "";
    const messageTrimmed = typeof message === "string" ? message.trim() : "";

    const textLines = [
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      phoneTrimmed && `Phone: ${phoneTrimmed}`,
      `Business Name: ${businessName.trim()}`,
      `Business Type: ${businessType}`,
      `Estimated Order Volume: ${volume.trim()}`,
      taxIdTrimmed && `Resale/Tax ID: ${taxIdTrimmed}`,
      messageTrimmed && `\n${messageTrimmed}`,
    ].filter(Boolean);

    const { error } = await resend.emails.send({
      from: "Boast Coffee Website <noreply@boastcoffee.com>",
      to: CONTACT_EMAIL,
      replyTo: email.trim(),
      subject: `New wholesale application from ${businessName.trim()}`,
      text: textLines.join("\n"),
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name.trim())}</p>
        <p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>
        ${phoneTrimmed ? `<p><strong>Phone:</strong> ${escapeHtml(phoneTrimmed)}</p>` : ""}
        <p><strong>Business Name:</strong> ${escapeHtml(businessName.trim())}</p>
        <p><strong>Business Type:</strong> ${escapeHtml(businessType)}</p>
        <p><strong>Estimated Order Volume:</strong> ${escapeHtml(volume.trim())}</p>
        ${taxIdTrimmed ? `<p><strong>Resale/Tax ID:</strong> ${escapeHtml(taxIdTrimmed)}</p>` : ""}
        ${messageTrimmed ? `<br><p>${escapeHtml(messageTrimmed).replace(/\n/g, "<br>")}</p>` : ""}
      `,
    });

    if (error) {
      console.error("Wholesale application error:", error);
      return NextResponse.json(
        { error: "Failed to send application. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Wholesale application error:", err);
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
