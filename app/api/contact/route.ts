import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  CART_TYPES,
  SPECIAL_DRINKS,
  calculateEventEstimate,
  type CartType,
  type SpecialDrink,
} from "@/lib/event-pricing";

const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "hello@boastcoffee.com";
const FIVE_MINUTES_MS = 5 * 60 * 1000;

const EVENT_TYPES = [
  "Corporate Event",
  "Wedding",
  "Farmer's Market",
  "Pop-up",
  "Private Party",
  "Other",
];

const CART_TYPE_OPTIONS = Object.keys(CART_TYPES);
const SPECIAL_DRINK_OPTIONS = Object.keys(SPECIAL_DRINKS);
const SOLAR_VAN_OPTIONS = ["No", "Yes"];

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      eventType,
      guestCount,
      eventStart,
      eventEnd,
      cartType,
      solarVan,
      specialDrinks,
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
    if (!eventType || typeof eventType !== "string" || !EVENT_TYPES.includes(eventType)) {
      return NextResponse.json({ error: "Valid event type is required" }, { status: 400 });
    }
    const guests = Number(guestCount);
    if (!guestCount || typeof guestCount !== "string" || !Number.isFinite(guests) || guests < 1 || guests > 2000) {
      return NextResponse.json({ error: "Expected guests must be between 1 and 2000" }, { status: 400 });
    }
    if (!eventStart || typeof eventStart !== "string" || isNaN(Date.parse(eventStart))) {
      return NextResponse.json({ error: "Event start is required" }, { status: 400 });
    }
    if (!eventEnd || typeof eventEnd !== "string" || isNaN(Date.parse(eventEnd))) {
      return NextResponse.json({ error: "Event end is required" }, { status: 400 });
    }
    if (new Date(eventStart).getTime() < Date.now() - FIVE_MINUTES_MS) {
      return NextResponse.json({ error: "Event start can't be in the past" }, { status: 400 });
    }
    if (new Date(eventEnd) < new Date(eventStart)) {
      return NextResponse.json({ error: "Event end must be after event start" }, { status: 400 });
    }
    if (!cartType || typeof cartType !== "string" || !CART_TYPE_OPTIONS.includes(cartType)) {
      return NextResponse.json({ error: "Valid cart type is required" }, { status: 400 });
    }
    if (!solarVan || typeof solarVan !== "string" || !SOLAR_VAN_OPTIONS.includes(solarVan)) {
      return NextResponse.json({ error: "Invalid solar van value" }, { status: 400 });
    }
    if (
      !Array.isArray(specialDrinks) ||
      !specialDrinks.every((d) => typeof d === "string" && SPECIAL_DRINK_OPTIONS.includes(d))
    ) {
      return NextResponse.json({ error: "Invalid special drinks selection" }, { status: 400 });
    }
    if (typeof message === "string" && message.trim().length > 1000) {
      return NextResponse.json({ error: "Message is too long" }, { status: 400 });
    }

    const phoneTrimmed = typeof phone === "string" ? phone.trim() : "";
    const messageTrimmed = typeof message === "string" ? message.trim() : "";
    const solarVanBool = solarVan === "Yes";

    const estimate = calculateEventEstimate({
      guestCount: guests,
      eventStart,
      eventEnd,
      cartType: cartType as CartType,
      solarVan: solarVanBool,
      specialDrinks: specialDrinks as SpecialDrink[],
    });

    const textLines = [
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      phoneTrimmed && `Phone: ${phoneTrimmed}`,
      `Event Type: ${eventType}`,
      `Expected Guests: ${guestCount}`,
      `Event Start: ${eventStart}`,
      `Event End: ${eventEnd}`,
      `Cart Type: ${cartType}`,
      `Solar Van: ${solarVan}`,
      `Special Drinks: ${specialDrinks.length > 0 ? specialDrinks.join(", ") : "None"}`,
      `\nEstimated Price: $${estimate.total} (internal estimate — verify before quoting)`,
      `  Duration: ${estimate.breakdown.hours}h, Guest blocks: ${estimate.breakdown.guestBlocks}, Cart: +$${estimate.breakdown.cartDelta}, Van: +$${estimate.breakdown.vanDelta}, Drinks: +$${estimate.breakdown.drinksDelta}`,
      messageTrimmed && `\n${messageTrimmed}`,
    ].filter(Boolean);

    const { error } = await resend.emails.send({
      from: "Boast Coffee Website <noreply@boastcoffee.com>",
      to: CONTACT_EMAIL,
      replyTo: email.trim(),
      subject: `[Event] ${name.trim()} - ${eventType}`,
      text: textLines.join("\n"),
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name.trim())}</p>
        <p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>
        ${phoneTrimmed ? `<p><strong>Phone:</strong> ${escapeHtml(phoneTrimmed)}</p>` : ""}
        <p><strong>Event Type:</strong> ${escapeHtml(eventType)}</p>
        <p><strong>Expected Guests:</strong> ${escapeHtml(String(guestCount))}</p>
        <p><strong>Event Start:</strong> ${escapeHtml(eventStart)}</p>
        <p><strong>Event End:</strong> ${escapeHtml(eventEnd)}</p>
        <p><strong>Cart Type:</strong> ${escapeHtml(cartType)}</p>
        <p><strong>Solar Van:</strong> ${escapeHtml(solarVan)}</p>
        <p><strong>Special Drinks:</strong> ${escapeHtml(specialDrinks.length > 0 ? specialDrinks.join(", ") : "None")}</p>
        <p><strong>Estimated Price:</strong> $${estimate.total} <em>(internal estimate — verify before quoting)</em></p>
        <p style="color:#666;font-size:0.9em;">Duration: ${estimate.breakdown.hours}h &middot; Guest blocks: ${estimate.breakdown.guestBlocks} &middot; Cart: +$${estimate.breakdown.cartDelta} &middot; Van: +$${estimate.breakdown.vanDelta} &middot; Drinks: +$${estimate.breakdown.drinksDelta}</p>
        ${messageTrimmed ? `<br><p>${escapeHtml(messageTrimmed).replace(/\n/g, "<br>")}</p>` : ""}
      `,
    });

    if (error) {
      console.error("Contact form error:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
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
