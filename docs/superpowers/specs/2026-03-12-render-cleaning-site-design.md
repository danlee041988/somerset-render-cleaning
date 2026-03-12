# Somerset Render Cleaning — Website Design Spec

> Date: 2026-03-12
> Status: Approved
> Owner: Dan Lee

---

## Overview

Single-page landing site for **somersetrendercleaning.co.uk** — a specialist render cleaning marketing brand backed by Somerset Window Cleaning (SWC). The site captures enquiries from Google Ads and organic search, funnelling leads to Dan for phone follow-up and quoting.

**Not a separate business.** Dan Lee is a sole trader. "Somerset Render Cleaning" is a trading name of Dan Lee (t/a Somerset Window Cleaning). Same person, same insurance, same team.

---

## Goals

1. **Capture render cleaning enquiries** via a simple contact form
2. **Rank for "render cleaning Somerset"** and related local search terms
3. **Serve as a Google Ads landing page** with high conversion rate
4. **Leverage SWC trust signals** (224 reviews, £5m insured, est. 2019, veteran-owned)
5. **Launch fast** — single page, minimal complexity, iterate later

## Non-Goals

- No online booking or pricing calculator (jobs need site survey)
- No multi-page site at launch (expand later if needed)
- No separate Google Business Profile (hybrid strategy — one GBP)
- No customer accounts or login
- No blog at launch

---

## Technical Architecture

### Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 15 (App Router) | Matches SWC site, image optimisation, SSR for SEO |
| Styling | Tailwind CSS 3.4 | Matches SWC site version, proven config-file approach |
| Animation | Framer Motion | Subtle scroll animations, before/after transitions |
| Deployment | Vercel | Auto-deploy from GitHub, free SSL, edge CDN |
| Domain | somersetrendercleaning.co.uk (20i) | Nameservers pointed to Vercel |
| Repository | github.com/danlee041988/somerset-render-cleaning | Standalone repo, independent from SWC |
| Images | Stock placeholders (Unsplash/Pexels) | Swapped for real before/afters as jobs complete |

### Project Structure

```
somerset-render-cleaning/
├── app/
│   ├── layout.tsx              # Root layout, fonts, metadata, analytics
│   ├── page.tsx                # Single landing page (all sections)
│   ├── globals.css             # Tailwind + custom styles
│   ├── sitemap.ts              # Single-page sitemap
│   ├── robots.ts               # robots.txt
│   ├── not-found.tsx            # Branded 404 → redirects to home
│   └── api/
│       └── enquiry/route.ts    # Form submission endpoint
├── components/
│   ├── Header.tsx              # Sticky nav: logo, phone, CTA
│   ├── Hero.tsx                # Hero section with headline + image
│   ├── TrustBar.tsx            # Dark strip: reviews, insurance, veteran, est.
│   ├── BeforeAfter.tsx         # Before/after gallery (3 comparisons)
│   ├── Process.tsx             # 3-step process (Assess → Treat → Rinse)
│   ├── WhyUs.tsx               # 4 feature cards grid
│   ├── EnquiryForm.tsx         # Contact form (React Hook Form + Zod)
│   ├── FAQ.tsx                 # Expandable accordion (5 questions)
│   └── Footer.tsx              # Legal disclosure, contact, SWC link
├── lib/
│   ├── validation.ts           # Zod schema for form data
│   └── analytics.ts            # GA4 + conversion tracking helpers
├── public/
│   └── images/                 # Stock placeholder photos (WebP, max 1920px wide)
├── config/
│   └── site.ts                 # Site metadata, contact info, trust stats (review count as single constant)
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
└── package.json
```

### Form Submission Flow

```
User fills form (name, phone, email, postcode, message)
  → Client-side Zod validation
  → POST /api/enquiry
  → Server validates + rate limits (in-memory, acceptable for v1 traffic)
  → Email notification to info@somersetwindowcleaning.co.uk (Gmail API)
  → Store lead in Google Sheets ("Render Leads" tab in SWC spreadsheet)
  → Return success response
  → Client shows confirmation message
  → Error state: inline error message below submit button, retry encouraged
```

**Backend infrastructure:** Reuse SWC's existing Google API credentials chain — `google-oauth-client-id`, `google-oauth-client-secret`, `google-api-refresh-token` (account: info@somersetwindowcleaning.co.uk) from macOS Keychain. Same Google Sheets spreadsheet as SWC (env var `GOOGLE_SHEETS_SPREADSHEET_ID`), new tab "Render Leads". Gmail API sends notification to info@somersetwindowcleaning.co.uk.

**Rate limiting:** In-memory rate limiting (e.g. simple Map with IP + timestamp). Acceptable for v1 traffic volumes. No Upstash dependency. Upgrade to Upstash if traffic/spam warrants it.

**GCLID tracking:** Captured from `?gclid=` URL parameter on page load via `useSearchParams()`. Stored in a hidden form field. Passed to `/api/enquiry` and saved in the Google Sheets row alongside the lead data. Used for Google Ads conversion attribution.

**Required environment variables (Vercel):**
- `GOOGLE_OAUTH_CLIENT_ID` — from Keychain
- `GOOGLE_OAUTH_CLIENT_SECRET` — from Keychain
- `GOOGLE_API_REFRESH_TOKEN` — from Keychain (info@ account)
- `GOOGLE_SHEETS_SPREADSHEET_ID` — same as SWC
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — new GA4 property (see Analytics)
- `NEXT_PUBLIC_SITE_URL` — https://www.somersetrendercleaning.co.uk

**No Notion integration at launch.** Keep it simple. Add later if render lead volume justifies it.

**No reCAPTCHA at launch.** Simple honeypot field for bot detection. Add reCAPTCHA if spam becomes an issue.

### DNS Setup

1. Log into 20i → somersetrendercleaning.co.uk → DNS settings
2. Change nameservers to Vercel: `ns1.vercel-dns.com`, `ns2.vercel-dns.com`
3. Add domain in Vercel project settings
4. Vercel auto-provisions SSL certificate

---

## Visual Design

### Brand Identity

| Element | Value |
|---------|-------|
| Primary colour | `#16a34a` (green-600) — fresh, clean association |
| Dark accent | `#0f172a` (slate-900) — trust bar, footer |
| Background | `#ffffff` / `#f8fafc` — alternating white/light grey sections |
| Text | `#0f172a` (headings), `#475569` (body) |
| Font (headings) | Inter — bold, clean, excellent `next/font` support |
| Font (body) | Inter — regular weight |
| Logo | "SR" monogram in green square + "Somerset Render Cleaning" text |
| Co-branding | "A specialist service from Somerset Window Cleaning" below logo |

### Style Direction

Clean & Green — white backgrounds, green accent colour, light and approachable. Distinct from SWC's red/charcoal palette but complementary. Professional without being corporate.

### Co-Branding Approach

- Header: Somerset Render Cleaning logo with "A specialist service from Somerset Window Cleaning" subtext
- Trust bar: References SWC's 224 reviews, insurance, established date
- Footer: "Dan Lee t/a Somerset Render Cleaning" + link to somersetwindowcleaning.co.uk
- Overall feel: specialist brand with trusted parent company backing

---

## Page Sections (top to bottom)

### 1. Header (sticky)

- Left: SR logo + "Somerset Render Cleaning" + SWC subtext
- Right: Phone number (SWC number at launch) + "Free Quote" CTA button
- Sticky on scroll with subtle background blur

### 2. Hero

- **Headline:** "Professional Render Cleaning Across Somerset"
- **Subtext:** "Specialist softwash treatment that removes algae, black spots, and weathering — restoring your property's exterior to like-new condition."
- **CTA 1:** "Get a Free Quote" (scrolls to form)
- **CTA 2:** "View Our Work" (scrolls to gallery)
- **Image:** Stock photo of a clean rendered property (right side on desktop, below text on mobile)

### 3. Trust Bar

Dark background strip with 5 trust signals in a row:
- ⭐ 224 Five-Star Reviews
- 🛡️ £5M Insured
- 🏅 Veteran-Owned
- 📅 Est. 2019
- Omit BWCA badge at launch. Add when Dan + Dylan complete SW5 certification.

### 4. Before & After Gallery

- 3 side-by-side before/after comparisons
- Stock placeholder images at launch, labelled for replacement
- Each card: before image | after image + location caption (e.g., "3-bed semi, Glastonbury")
- Optional: image comparison slider (drag to reveal)

### 5. How It Works (3-Step Process)

Three numbered steps with icons:
1. **Assess** — "Free site survey. We check your render type, identify growth, and plan the treatment."
2. **Treat** — "Low-pressure softwash with biocide solution. Kills algae and organic growth at the root."
3. **Rinse & Protect** — "Gentle rinse reveals clean render. Biocide continues working for months, preventing regrowth."

### 6. Why Choose Us

4 feature cards in a 2x2 grid:
- 🧪 **Specialist Equipment** — "Professional softwash systems — not a jet wash from Screwfix"
- 🛡️ **Fully Insured** — "£5 million public liability. Your property is protected."
- ⭐ **224 Five-Star Reviews** — "Backed by Somerset Window Cleaning's proven track record"
- 🌿 **Safe for Plants & Pets** — "Biodegradable solutions that won't harm your garden"

### 7. Enquiry Form

Green-tinted background section. Centred form:
- **Fields:** Name, Phone, Email, Postcode, Message (optional textarea)
- **Honeypot:** Hidden field for bot detection
- **Submit:** "Send Enquiry" green button
- **Reassurance:** "We'll call you back, not spam you. No obligation."
- **Validation:** Client-side Zod, server-side validation
- **Success state:** Replace form with confirmation message

### 8. FAQ

5 expandable accordion items:
1. How long does a render clean last?
2. Will softwash damage my render?
3. How much does render cleaning cost?
4. What's the difference between softwash and pressure washing?
5. Do you cover my area?

Answers to be written during implementation — factual, concise, SEO-friendly.

### 9. Footer

Dark background. Two columns:
- Left: "Somerset Render Cleaning" / "Dan Lee t/a Somerset Render Cleaning" / "A specialist service from Somerset Window Cleaning" (linked)
- Right: Phone number / email / Privacy Policy link

---

## SEO & Analytics

### Metadata

- **Title:** "Render Cleaning Somerset | Professional Softwash | Somerset Render Cleaning"
- **Description:** "Professional render cleaning across Somerset. Specialist softwash treatment removes algae and black spots. £5M insured, 224 five-star reviews. Free quotes."
- **Open Graph:** Custom OG image with brand + before/after preview

### Structured Data (JSON-LD)

- LocalBusiness schema
- Service schema (render cleaning)
- FAQPage schema (for FAQ section)

### Analytics

- **Google Analytics 4:** New, separate GA4 property (not shared with SWC). Measures render site traffic independently. Property to be created in Google Analytics before implementation.
- **Google Ads conversion tracking:** Form submission = conversion event. Track via GA4 + Google Ads tag.
- **GCLID:** Captured from URL params on page load, stored with lead in Google Sheets (see Form Submission Flow).

---

## Mobile Responsive

- Hero: stacks vertically (text above image)
- Trust bar: wraps to 2 rows
- Before/after: stacks to single column, swipeable
- Form: full-width fields
- Sticky mobile CTA: phone button fixed to bottom of screen

---

## Launch Checklist

1. Domain nameservers pointed to Vercel
2. SSL certificate provisioned
3. Form submission working (email notification + Google Sheets)
4. Stock images in place with replacement plan
5. Analytics and conversion tracking live
6. Mobile responsive tested
7. Lighthouse score > 90 (performance, accessibility, SEO)
8. Legal text correct (sole trader disclosure)
9. SWC phone number displayed (swap to RingCentral later)
10. Privacy policy: add `/privacy` page naming Dan Lee t/a Somerset Render Cleaning as data controller, covering form data collection (name, phone, email, postcode), storage in Google Sheets, and retention. Can mirror SWC's policy structure adapted for this trading name.

---

## Future Enhancements (not in scope for launch)

- Dedicated RingCentral phone number
- Real before/after photos from completed jobs
- Google Ads campaigns pointing to this page
- Additional pages (gallery, blog, location sub-pages)
- Notion CRM integration
- reCAPTCHA (if spam becomes an issue)
- Review embedding from Google
- WhatsApp button
- BWCA certification badge (after course completion)

---

*Spec written: 2026-03-12*
*Approved by: Dan Lee*
