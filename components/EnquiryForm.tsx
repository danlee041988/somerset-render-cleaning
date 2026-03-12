"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { enquirySchema, type EnquiryFormData } from "@/lib/validation";
import type { z } from "zod";

type EnquiryFormInput = z.input<typeof enquirySchema>;

function EnquiryFormInner() {
  const searchParams = useSearchParams();
  const gclid = searchParams.get("gclid") ?? "";

  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormInput, unknown, EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      postcode: "",
      message: "",
      honeypot: "",
      gclid,
    },
  });

  const onSubmit = async (data: EnquiryFormData) => {
    setApiError(null);

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(
          body?.error || "Something went wrong. Please try calling us instead."
        );
      }

      setSubmitted(true);
    } catch (err) {
      setApiError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try calling us instead."
      );
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="rounded-2xl bg-white border border-green-200 p-10 sm:p-14 text-center shadow-sm"
      >
        <CheckCircle className="w-14 h-14 text-brand-green mx-auto mb-5" />
        <h3 className="text-2xl sm:text-3xl font-bold text-brand-charcoal mb-3">
          Thank you!
        </h3>
        <p className="text-brand-slate text-lg leading-relaxed max-w-md mx-auto">
          We&apos;ll be in touch within 24 hours. If it&apos;s urgent, give us a
          call and we&apos;ll sort it straight away.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-2xl bg-white border border-green-200 p-6 sm:p-8 lg:p-10 shadow-sm"
    >
      {/* Name + Phone row */}
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
        <Field label="Your Name" error={errors.name?.message}>
          <input
            {...register("name")}
            type="text"
            autoComplete="name"
            placeholder="e.g. John Smith"
            className={inputClasses(errors.name)}
          />
        </Field>

        <Field label="Phone Number" error={errors.phone?.message}>
          <input
            {...register("phone")}
            type="tel"
            autoComplete="tel"
            placeholder="e.g. 07700 900000"
            className={inputClasses(errors.phone)}
          />
        </Field>
      </div>

      {/* Email */}
      <div className="mt-4 sm:mt-5">
        <Field label="Email Address" error={errors.email?.message}>
          <input
            {...register("email")}
            type="email"
            autoComplete="email"
            placeholder="e.g. john@example.com"
            className={inputClasses(errors.email)}
          />
        </Field>
      </div>

      {/* Postcode */}
      <div className="mt-4 sm:mt-5">
        <Field label="Postcode" error={errors.postcode?.message}>
          <input
            {...register("postcode")}
            type="text"
            autoComplete="postal-code"
            placeholder="e.g. BA6 9TH"
            className={inputClasses(errors.postcode)}
          />
        </Field>
      </div>

      {/* Message */}
      <div className="mt-4 sm:mt-5">
        <Field
          label="Tell Us About Your Property"
          error={errors.message?.message}
          optional
        >
          <textarea
            {...register("message")}
            rows={4}
            placeholder="e.g. Detached house, algae on front render, approx 80m²"
            className={`${inputClasses(errors.message)} resize-none`}
          />
        </Field>
      </div>

      {/* Honeypot — hidden from humans, visible to bots */}
      <div style={{ display: "none" }} aria-hidden="true">
        <label htmlFor="enquiry-hp">Leave blank</label>
        <input
          {...register("honeypot")}
          id="enquiry-hp"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* GCLID */}
      <input {...register("gclid")} type="hidden" />

      {/* Submit */}
      <div className="mt-6 sm:mt-8">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-6 bg-brand-green text-white font-semibold rounded-lg hover:bg-brand-green-dark focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 transition-colors shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed text-base"
        >
          {isSubmitting ? "Sending..." : "Send Enquiry"}
        </button>
      </div>

      {/* API error */}
      {apiError && (
        <p className="mt-3 text-sm text-red-600 text-center" role="alert">
          {apiError}
        </p>
      )}

      {/* Reassurance */}
      <p className="mt-4 text-sm text-brand-slate text-center">
        We&apos;ll call you back, not spam you. No obligation.
      </p>
    </form>
  );
}

/* ─── Field wrapper ─── */

function Field({
  label,
  error,
  optional,
  children,
}: {
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-brand-charcoal mb-1.5">
        {label}
        {optional && (
          <span className="text-brand-slate font-normal ml-1">(optional)</span>
        )}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/* ─── Shared input classes ─── */

function inputClasses(error?: { message?: string }): string {
  const base =
    "w-full rounded-lg border px-4 py-2.5 text-brand-charcoal placeholder:text-slate-400 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green";
  return error
    ? `${base} border-red-300 focus:ring-red-500 focus:border-red-500`
    : `${base} border-slate-200 hover:border-slate-300`;
}

/* ─── Exported section component ─── */

export default function EnquiryForm() {
  return (
    <section id="enquiry" className="py-16 sm:py-20 lg:py-24 bg-brand-green-light">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Heading */}
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-charcoal tracking-tight">
              Get Your Free Quote
            </h2>
            <p className="mt-3 text-brand-slate text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
              Tell us about your property and we&apos;ll get back to you within
              24 hours
            </p>
          </div>

          {/* Form — centred with max-width */}
          <div className="max-w-xl mx-auto">
            <Suspense fallback={<FormSkeleton />}>
              <EnquiryFormInner />
            </Suspense>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Loading skeleton while Suspense resolves ─── */

function FormSkeleton() {
  return (
    <div className="rounded-2xl bg-white border border-green-200 p-6 sm:p-8 lg:p-10 shadow-sm animate-pulse">
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
        <div>
          <div className="h-4 w-20 bg-slate-200 rounded mb-2" />
          <div className="h-10 bg-slate-100 rounded-lg" />
        </div>
        <div>
          <div className="h-4 w-24 bg-slate-200 rounded mb-2" />
          <div className="h-10 bg-slate-100 rounded-lg" />
        </div>
      </div>
      <div className="mt-5">
        <div className="h-4 w-24 bg-slate-200 rounded mb-2" />
        <div className="h-10 bg-slate-100 rounded-lg" />
      </div>
      <div className="mt-5">
        <div className="h-4 w-16 bg-slate-200 rounded mb-2" />
        <div className="h-10 bg-slate-100 rounded-lg" />
      </div>
      <div className="mt-5">
        <div className="h-4 w-32 bg-slate-200 rounded mb-2" />
        <div className="h-24 bg-slate-100 rounded-lg" />
      </div>
      <div className="mt-8">
        <div className="h-12 bg-slate-200 rounded-lg" />
      </div>
    </div>
  );
}
