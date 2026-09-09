"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface FormState {
  status: "idle" | "loading" | "success" | "error";
  message: string;
}

interface ItemOption {
  label: string;
  placeholder: string;
}

interface BusinessInquiryFormProps {
  idPrefix: string;
  apiEndpoint: string;
  businessNameLabel: string;
  itemOptions: ItemOption[];
  showTaxId: boolean;
  successMessage: string;
}

export default function BusinessInquiryForm({
  idPrefix,
  apiEndpoint,
  businessNameLabel,
  itemOptions,
  showTaxId,
  successMessage,
}: BusinessInquiryFormProps) {
  const initialForm = {
    name: "",
    email: "",
    phone: "",
    businessName: "",
    taxId: "",
    items: [] as string[],
    itemDetails: {} as Record<string, string>,
    message: "",
    company: "",
  };

  const [form, setForm] = useState(initialForm);
  const [state, setState] = useState<FormState>({ status: "idle", message: "" });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function toggleItem(item: string) {
    setForm((prev) => {
      if (prev.items.includes(item)) {
        const { [item]: _removed, ...restDetails } = prev.itemDetails;
        return { ...prev, items: prev.items.filter((i) => i !== item), itemDetails: restDetails };
      }
      return { ...prev, items: [...prev.items, item] };
    });
  }

  function setItemDetail(item: string, value: string) {
    setForm((prev) => ({
      ...prev,
      itemDetails: { ...prev.itemDetails, [item]: value },
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState({ status: "loading", message: "" });

    try {
      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong");
      }

      setState({ status: "success", message: successMessage });
      setForm(initialForm);
    } catch (err) {
      setState({
        status: "error",
        message: err instanceof Error ? err.message : "Failed to send application. Try again.",
      });
    }
  }

  const inputCls =
    "w-full px-4 py-3 bg-transparent border border-[var(--color-brand-border)] rounded text-sm text-[var(--color-brand-dark)] placeholder:text-[var(--color-brand-muted)] focus:border-[var(--color-brand-dark)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-dark)] transition-colors";
  const labelCls =
    "block text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] mb-2";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot: hidden from real users, bots tend to fill every field */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor={`${idPrefix}-company`}>Company</label>
        <input
          id={`${idPrefix}-company`}
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
          <label htmlFor={`${idPrefix}-name`} className={labelCls}>
            Name
          </label>
          <input
            id={`${idPrefix}-name`}
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
          <label htmlFor={`${idPrefix}-email`} className={labelCls}>
            Email
          </label>
          <input
            id={`${idPrefix}-email`}
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
        <label htmlFor={`${idPrefix}-phone`} className={labelCls}>
          Phone <span className="normal-case font-normal">(optional)</span>
        </label>
        <input
          id={`${idPrefix}-phone`}
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
        <label htmlFor={`${idPrefix}-businessName`} className={labelCls}>
          {businessNameLabel}
        </label>
        <input
          id={`${idPrefix}-businessName`}
          name="businessName"
          type="text"
          required
          maxLength={150}
          value={form.businessName}
          onChange={handleChange}
          placeholder={`Your ${businessNameLabel.toLowerCase()}`}
          className={inputCls}
          disabled={state.status === "loading"}
        />
      </div>

      <div>
        <p className={labelCls}>Items Interested In</p>
        <div className="flex flex-col gap-3">
          {itemOptions.map((item) => (
            <div key={item.label}>
              <label className="flex items-center gap-2 text-sm text-[var(--color-brand-dark)]">
                <input
                  type="checkbox"
                  checked={form.items.includes(item.label)}
                  onChange={() => toggleItem(item.label)}
                  disabled={state.status === "loading"}
                />
                {item.label}
              </label>
              {form.items.includes(item.label) && (
                <input
                  type="text"
                  maxLength={200}
                  value={form.itemDetails[item.label] ?? ""}
                  onChange={(e) => setItemDetail(item.label, e.target.value)}
                  placeholder={item.placeholder}
                  className={`${inputCls} mt-2`}
                  disabled={state.status === "loading"}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {showTaxId && (
        <div>
          <label htmlFor={`${idPrefix}-taxId`} className={labelCls}>
            Resale Certificate / Tax ID <span className="normal-case font-normal">(optional)</span>
          </label>
          <input
            id={`${idPrefix}-taxId`}
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
      )}

      <div>
        <label htmlFor={`${idPrefix}-message`} className={labelCls}>
          Anything else? <span className="normal-case font-normal">(optional)</span>
        </label>
        <textarea
          id={`${idPrefix}-message`}
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
        {state.status === "loading" ? "Sending…" : "Submit"}
      </Button>
    </form>
  );
}
