import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.name}`,
  description: "Privacy policy for Somerset Render Cleaning",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <Link
          href="/"
          className="mb-8 inline-block text-brand-green hover:underline"
        >
          ← Back to Home
        </Link>

        <h1 className="mb-8 text-4xl font-bold text-brand-charcoal">
          Privacy Policy
        </h1>

        <div className="prose prose-slate max-w-none">
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-brand-charcoal">
              Data Controller
            </h2>
            <p className="text-brand-slate">
              {siteConfig.legal.tradingName}
              <br />
              {siteConfig.address.street}, {siteConfig.address.region},{" "}
              {siteConfig.address.postcode}
              <br />
              Email: {siteConfig.email}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-brand-charcoal">
              What Data We Collect
            </h2>
            <p className="mb-4 text-brand-slate">
              When you submit an enquiry through our website, we collect:
            </p>
            <ul className="list-inside list-disc space-y-2 text-brand-slate">
              <li>Your name</li>
              <li>Phone number</li>
              <li>Email address</li>
              <li>Postcode</li>
              <li>Message content</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-brand-charcoal">
              How We Store Your Data
            </h2>
            <p className="text-brand-slate">
              Your enquiry is stored securely in Google Sheets and sent to our
              business email. We use industry-standard security measures to
              protect your information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-brand-charcoal">
              Why We Process Your Data
            </h2>
            <p className="text-brand-slate">
              We collect and process your personal data solely to respond to
              your enquiry and provide you with a quote for our render cleaning
              services. We have a legitimate business interest in responding to
              customer enquiries.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-brand-charcoal">
              Third-Party Sharing
            </h2>
            <p className="text-brand-slate">
              We do not sell, rent, or share your personal data with third
              parties for marketing purposes. Your data is only accessed by
              authorised personnel within {siteConfig.legal.tradingName}.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-brand-charcoal">
              Data Retention
            </h2>
            <p className="text-brand-slate">
              We retain enquiry data for up to 3 years for business records and
              customer service purposes. After this period, data is securely
              deleted.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-brand-charcoal">
              Your Rights
            </h2>
            <p className="mb-4 text-brand-slate">
              Under the UK GDPR, you have the right to:
            </p>
            <ul className="list-inside list-disc space-y-2 text-brand-slate">
              <li>Request access to your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data (right to erasure)</li>
              <li>Object to processing of your data</li>
              <li>Request restriction of processing</li>
            </ul>
            <p className="mt-4 text-brand-slate">
              To exercise any of these rights, please contact us at{" "}
              {siteConfig.email}.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-brand-charcoal">
              Cookies
            </h2>
            <p className="text-brand-slate">
              We use Google Analytics 4 (GA4) to understand how visitors use
              our website. This service uses cookies to collect anonymised
              information about your visit, including pages viewed, time on
              site, and how you arrived at the site. This helps us improve the
              website experience. You can opt out of Google Analytics tracking
              by installing the{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                className="text-brand-green hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Analytics Opt-out Browser Add-on
              </a>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-brand-charcoal">
              Changes to This Policy
            </h2>
            <p className="text-brand-slate">
              We may update this privacy policy from time to time. Any changes
              will be posted on this page with an updated revision date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-brand-charcoal">
              Contact Us
            </h2>
            <p className="text-brand-slate">
              If you have any questions about this privacy policy or how we
              handle your data, please contact us at {siteConfig.email}.
            </p>
          </section>

          <p className="mt-12 text-sm text-brand-slate">
            Last updated: March 2026
          </p>
        </div>
      </div>
    </div>
  );
}
