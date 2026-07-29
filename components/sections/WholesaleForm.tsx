"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface FormState {
  status: "idle" | "loading" | "success" | "error";
  message: string;
}

const BUSINESS_TYPES = [
  "Cafe/Restaurant",
  "Grocery/Retail",
  "Office/Corporate",
  "Distributor",
  "Other",
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  businessName: "",
  businessType: "",
  volume: "",
  taxId: "",
  message: "",
  company: "",
};

export default function WholesaleForm() {
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
      const res = await fetch("/api/wholesale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong");
      }

      setState({
        status: "success",
        message: "Application sent! We'll review it and follow up soon.",
      });
      setForm(initialForm);
    } catch (err) {
      setState({
        status: "error",
        message: err instanceof Error ? err.message : "Failed to send application. Try again.",
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
        <label htmlFor="ws-company">Company</label>
        <input
          id="ws-company"
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
          <label htmlFor="ws-name" className={labelCls}>
            Name
          </label>
          <input
            id="ws-name"
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
          <label htmlFor="ws-email" className={labelCls}>
            Email
          </label>
          <input
            id="ws-email"
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
        <label htmlFor="ws-phone" className={labelCls}>
          Phone <span className="normal-case font-normal">(optional)</span>
        </label>
        <input
          id="ws-phone"
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
        <label htmlFor="ws-businessName" className={labelCls}>
          Business Name
        </label>
        <input
          id="ws-businessName"
          name="businessName"
          type="text"
          required
          maxLength={150}
          value={form.businessName}
          onChange={handleChange}
          placeholder="Your business name"
          className={inputCls}
          disabled={state.status === "loading"}
        />
      </div>

      <div>
        <label htmlFor="ws-businessType" className={labelCls}>
          Business Type
        </label>
        <div className="relative">
          <select
            id="ws-businessType"
            name="businessType"
            required
            value={form.businessType}
            onChange={handleChange}
            className={`${inputCls} appearance-none pr-10`}
            disabled={state.status === "loading"}
          >
            <option value="" disabled>
              Select a business type
            </option>
            {BUSINESS_TYPES.map((type) => (
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
        <label htmlFor="ws-volume" className={labelCls}>
          Estimated Order Volume
        </label>
        <input
          id="ws-volume"
          name="volume"
          type="text"
          required
          maxLength={200}
          value={form.volume}
          onChange={handleChange}
          placeholder="e.g. 10 cases/month"
          className={inputCls}
          disabled={state.status === "loading"}
        />
      </div>

      <div>
        <label htmlFor="ws-taxId" className={labelCls}>
          Resale Certificate / Tax ID <span className="normal-case font-normal">(optional)</span>
        </label>
        <input
          id="ws-taxId"
          name="taxId"
          type="text"
          maxLength={100}
          value={form.taxId}
          onChange={handleChange}
          placeholder="Resale certificate or tax ID number"
          className={inputCls}
          disabled={state.status === "loading"}
        />
      </div>

      <div>
        <label htmlFor="ws-message" className={labelCls}>
          Anything else? <span className="normal-case font-normal">(optional)</span>
        </label>
        <textarea
          id="ws-message"
          name="message"
          rows={4}
          maxLength={1000}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us more about your business"
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
        {state.status === "loading" ? "Sending…" : "Submit Application"}
      </Button>
    </form>
  );
}
