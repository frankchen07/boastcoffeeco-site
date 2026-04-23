"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface FormState {
  status: "idle" | "loading" | "success" | "error";
  message: string;
}

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [state, setState] = useState<FormState>({ status: "idle", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
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

      setState({ status: "success", message: "Message sent! We'll get back to you soon." });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setState({
        status: "error",
        message: err instanceof Error ? err.message : "Failed to send message. Try again.",
      });
    }
  }

  const inputCls =
    "w-full px-4 py-3 bg-transparent border border-[var(--color-brand-border)] rounded text-sm text-[var(--color-brand-dark)] placeholder:text-[var(--color-brand-muted)] focus:outline-none focus:border-[var(--color-brand-dark)] transition-colors";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] mb-2">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          className={inputCls}
          disabled={state.status === "loading"}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] mb-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="your@email.com"
          className={inputCls}
          disabled={state.status === "loading"}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="How can we help?"
          className={`${inputCls} resize-none`}
          disabled={state.status === "loading"}
        />
      </div>

      {state.message && (
        <p
          className={`text-sm ${
            state.status === "success"
              ? "text-green-700"
              : "text-red-600"
          }`}
        >
          {state.message}
        </p>
      )}

      <Button
        type="submit"
        disabled={state.status === "loading"}
        className="w-full"
        size="lg"
      >
        {state.status === "loading" ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
