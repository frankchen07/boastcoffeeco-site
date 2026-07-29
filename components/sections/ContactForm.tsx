"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface FormState {
  status: "idle" | "loading" | "success" | "error";
  message: string;
}

const EVENT_TYPES = [
  "Corporate Event",
  "Wedding",
  "Farmer's Market",
  "Pop-up",
  "Private Party",
  "Other",
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  eventType: "",
  guestCount: "",
  eventStart: "",
  eventEnd: "",
  message: "",
  company: "",
};

function nowLocalDatetime() {
  const d = new Date(Date.now() - new Date().getTimezoneOffset() * 60000);
  return d.toISOString().slice(0, 16);
}

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [state, setState] = useState<FormState>({ status: "idle", message: "" });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState({ status: "loading", message: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong");
      }

      setState({ status: "success", message: "Request sent! We'll get back to you soon." });
      setForm(initialForm);
    } catch (err) {
      setState({
        status: "error",
        message: err instanceof Error ? err.message : "Failed to send request. Try again.",
      });
    }
  }

  const inputCls =
    "w-full px-4 py-3 bg-transparent border border-[var(--color-brand-border)] rounded text-sm text-[var(--color-brand-dark)] placeholder:text-[var(--color-brand-muted)] focus:outline-none focus:border-[var(--color-brand-dark)] transition-colors";
  const labelCls =
    "block text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] mb-2";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot: hidden from real users, bots tend to fill every field */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={handleChange}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelCls}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={100}
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className={inputCls}
            disabled={state.status === "loading"}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelCls}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={200}
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className={inputCls}
            disabled={state.status === "loading"}
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className={labelCls}>
          Phone <span className="normal-case font-normal">(optional)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          maxLength={20}
          value={form.phone}
          onChange={handleChange}
          placeholder="(555) 555-5555"
          className={inputCls}
          disabled={state.status === "loading"}
        />
      </div>

      <div>
        <label htmlFor="eventType" className={labelCls}>
          Type of Event
        </label>
        <div className="relative">
          <select
            id="eventType"
            name="eventType"
            required
            value={form.eventType}
            onChange={handleChange}
            className={`${inputCls} appearance-none pr-10`}
            disabled={state.status === "loading"}
          >
            <option value="" disabled>
              Select an event type
            </option>
            {EVENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-brand-muted)]"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M2.5 4.5L6 8l3.5-3.5" />
          </svg>
        </div>
      </div>

      <div>
        <label htmlFor="guestCount" className={labelCls}>
          Expected Guests
        </label>
        <input
          id="guestCount"
          name="guestCount"
          type="number"
          min="1"
          max="2000"
          required
          value={form.guestCount}
          onChange={handleChange}
          placeholder="50"
          className={inputCls}
          disabled={state.status === "loading"}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="eventStart" className={labelCls}>
            Event Start
          </label>
          <input
            id="eventStart"
            name="eventStart"
            type="datetime-local"
            required
            min={nowLocalDatetime()}
            value={form.eventStart}
            onChange={handleChange}
            className={inputCls}
            disabled={state.status === "loading"}
          />
        </div>

        <div>
          <label htmlFor="eventEnd" className={labelCls}>
            Event End
          </label>
          <input
            id="eventEnd"
            name="eventEnd"
            type="datetime-local"
            required
            min={form.eventStart || nowLocalDatetime()}
            value={form.eventEnd}
            onChange={handleChange}
            className={inputCls}
            disabled={state.status === "loading"}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelCls}>
          Anything else? <span className="normal-case font-normal">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={1000}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us more about your event"
          className={`${inputCls} resize-none`}
          disabled={state.status === "loading"}
        />
      </div>

      {state.message && (
        <p
          role="alert"
          className={`text-sm ${
            state.status === "success" ? "text-green-700" : "text-red-600"
          }`}
        >
          {state.status === "success" ? "✓ " : "✗ "}{state.message}
        </p>
      )}

      <Button
        type="submit"
        disabled={state.status === "loading"}
        className="w-full"
        size="lg"
      >
        {state.status === "loading" ? "Sending…" : "Send Request"}
      </Button>
    </form>
  );
}
