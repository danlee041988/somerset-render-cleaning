# Somerset Render Cleaning Website — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a single-page landing site at somersetrendercleaning.co.uk that captures render cleaning enquiries via a simple form, backed by SWC's trust infrastructure.

**Architecture:** Standalone Next.js 15 App Router project. Single landing page composed of 8 section components. Form submissions POST to an API route that emails Dan and logs to Google Sheets. Deployed on Vercel with domain from 20i.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS 3.4, Framer Motion, React Hook Form, Zod, googleapis (Sheets + Gmail), Vercel

**Spec:** `docs/superpowers/specs/2026-03-12-render-cleaning-site-design.md`

**Reference codebase:** `~/Projects/SWC/somerset-window-cleaning-site/` (for Google Sheets client pattern, Gmail API pattern, Tailwind config, next.config.mjs image optimisation)

---

## Chunk 1: Project Scaffold & Config

### Task 1: Initialise Next.js project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.mjs`, `tailwind.config.ts`, `app/globals.css`, `app/layout.tsx`, `app/page.tsx`, `.gitignore`, `.env.example`

- [ ] **Step 1: Create Next.js project**

```bash
cd ~/Projects/somerset-render-cleaning
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm
```

Accept defaults. This scaffolds the project with Next.js 15, Tailwind, TypeScript, App Router.

- [ ] **Step 2: Install dependencies**

```bash
npm install framer-motion react-hook-form zod googleapis @hookform/resolvers lucide-react
```

- [ ] **Step 3: Verify dev server starts**

```bash
npm run dev
```

Expected: Server starts on localhost:3000, default Next.js page renders.

- [ ] **Step 4: Commit**

```bash
git init
git add .
git commit -m "feat: initialise Next.js 15 project with dependencies"
```

---

### Task 2: Configure Tailwind theme and brand tokens

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Update Tailwind config with brand colours and Inter font**

`tailwind.config.ts`:
```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./config/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#16a34a",
          "green-dark": "#15803d",
          "green-light": "#dcfce7",
          charcoal: "#0f172a",
          slate: "#475569",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 2: Update globals.css — strip defaults, add base styles**

`app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    @apply bg-white text-brand-charcoal antialiased;
  }
}
```

- [ ] **Step 3: Verify build succeeds**

```bash
npm run build
```

Expected: Build completes with no errors.

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts app/globals.css
git commit -m "feat: configure Tailwind brand colours and base styles"
```

---

### Task 3: Create site config and root layout

**Files:**
- Create: `config/site.ts`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create site config**

`config/site.ts`:
```ts
export const siteConfig = {
  name: "Somerset Render Cleaning",
  tagline: "A specialist service from Somerset Window Cleaning",
  description:
    "Professional render cleaning across Somerset. Specialist softwash treatment removes algae and black spots. £5M insured, 224 five-star reviews. Free quotes.",
  url: "https://www.somersetrendercleaning.co.uk",
  swcUrl: "https://www.somersetwindowcleaning.co.uk",
  phone: "01onal 749900", // SWC number at launch — swap to RingCentral later
  email: "info@somersetrendercleaning.co.uk",
  address: {
    street: "Meare",
    region: "Somerset",
    postcode: "BA6 9TH",
    country: "GB",
  },
  trust: {
    reviewCount: 224,
    rating: 5.0,
    established: 2019,
    insurance: "£5M",
  },
  legal: {
    tradingName: "Dan Lee t/a Somerset Render Cleaning",
    entity: "Sole Trader",
  },
} as const;
```

- [ ] **Step 2: Update root layout with Inter font, metadata, and structure**

`app/layout.tsx`:
```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Render Cleaning Somerset | Professional Softwash | Somerset Render Cleaning",
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: "Somerset Render Cleaning",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Create placeholder page.tsx**

`app/page.tsx`:
```tsx
export default function Home() {
  return (
    <main>
      <h1>Somerset Render Cleaning</h1>
      <p>Site under construction</p>
    </main>
  );
}
```

- [ ] **Step 4: Verify dev server renders correctly**

```bash
npm run dev
```

Expected: Page renders with "Somerset Render Cleaning" heading, Inter font applied.

- [ ] **Step 5: Commit**

```bash
git add config/site.ts app/layout.tsx app/page.tsx
git commit -m "feat: add site config, root layout with Inter font and metadata"
```

---

### Task 4: Configure next.config.mjs for images and security

**Files:**
- Modify: `next.config.mjs`

- [ ] **Step 1: Update next.config.mjs**

`next.config.mjs`:
```mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  compress: true,
  productionBrowserSourceMaps: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
```

- [ ] **Step 2: Create .env.example**

`.env.example`:
```
# Google Sheets (service account)
GOOGLE_SHEETS_CLIENT_EMAIL=
GOOGLE_SHEETS_PRIVATE_KEY=
GOOGLE_SHEETS_SPREADSHEET_ID=

# Gmail (OAuth2 base64-encoded credentials)
GMAIL_CREDENTIALS_BASE64=
GMAIL_TOKEN_BASE64=

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=

# Site
NEXT_PUBLIC_SITE_URL=https://www.somersetrendercleaning.co.uk
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: Build completes successfully.

- [ ] **Step 4: Commit**

```bash
git add next.config.mjs .env.example
git commit -m "feat: configure image optimisation, security headers, env template"
```

---

### Task 5: Set up GitHub repo and Vercel project

**Files:** None (infrastructure only)

- [ ] **Step 1: Create GitHub repository**

```bash
cd ~/Projects/somerset-render-cleaning
gh repo create danlee041988/somerset-render-cleaning --public --source=. --push
```

- [ ] **Step 2: Create Vercel project and link**

```bash
npx vercel link
```

Select: Create new project, link to `danlee041988/somerset-render-cleaning`.

- [ ] **Step 3: Set environment variables on Vercel**

Copy values from SWC's Vercel project for the shared credentials (Google Sheets service account, Gmail OAuth). Set via Vercel dashboard or CLI:

```bash
vercel env add GOOGLE_SHEETS_CLIENT_EMAIL production
vercel env add GOOGLE_SHEETS_PRIVATE_KEY production
vercel env add GOOGLE_SHEETS_SPREADSHEET_ID production
vercel env add GMAIL_CREDENTIALS_BASE64 production
vercel env add GMAIL_TOKEN_BASE64 production
vercel env add NEXT_PUBLIC_SITE_URL production
# GA4 measurement ID — set after creating the new GA4 property
```

- [ ] **Step 4: Deploy to verify**

```bash
npx vercel --prod
```

Expected: Deploys successfully, accessible at Vercel preview URL.

- [ ] **Step 5: Commit any Vercel config files**

```bash
git add .vercel/project.json
git commit -m "chore: link Vercel project"
```

---

## Chunk 2: UI Components (use @frontend-design skill)

> **Note:** Invoke the `frontend-design` skill when building these components. It produces polished, production-grade interfaces. Give it the design spec context (brand colours, Clean & Green direction, co-branded approach) and let it handle the visual design decisions.

### Task 6: Source stock placeholder images

**Files:**
- Create: `public/images/hero.webp`
- Create: `public/images/before-1.webp`, `public/images/after-1.webp`
- Create: `public/images/before-2.webp`, `public/images/after-2.webp`
- Create: `public/images/before-3.webp`, `public/images/after-3.webp`

- [ ] **Step 1: Source images from Unsplash/Pexels**

Search for: "rendered house exterior UK", "dirty render wall", "clean render house", "softwash cleaning house". Download 7 images:
- 1 hero image (clean rendered property, landscape, 1920px wide)
- 3 before images (dirty/algae-covered render)
- 3 after images (clean render)

- [ ] **Step 2: Convert to WebP, resize to max 1920px wide**

```bash
cd ~/Projects/somerset-render-cleaning/public/images
for f in *.jpg *.jpeg *.png; do
  npx sharp-cli -i "$f" -o "${f%.*}.webp" --format webp --quality 80 --width 1920
done
```

Or use an online converter if sharp-cli is not available. Save as `.webp` files.

- [ ] **Step 3: Commit**

```bash
git add public/images/
git commit -m "feat: add stock placeholder images for hero and before/after gallery"
```

---

### Task 7: Build Header component

**Files:**
- Create: `components/Header.tsx`

- [ ] **Step 1: Invoke @frontend-design and build Header**

Context for the skill: Sticky header with background blur on scroll. Left: green "SR" monogram + "Somerset Render Cleaning" + "A specialist service from Somerset Window Cleaning" subtext. Right: phone number + green "Free Quote" CTA button that scrolls to `#enquiry`. Mobile: hamburger not needed (single page) — just phone icon + CTA. Brand: green-600, Inter font.

- [ ] **Step 2: Verify renders correctly at all breakpoints**

```bash
npm run dev
```

Check at 375px (mobile), 768px (tablet), 1280px (desktop).

- [ ] **Step 3: Commit**

```bash
git add components/Header.tsx
git commit -m "feat: add sticky Header with co-branding and CTA"
```

---

### Task 8: Build Hero section

**Files:**
- Create: `components/Hero.tsx`

- [ ] **Step 1: Invoke @frontend-design and build Hero**

Context: Two-column layout (text left, image right). Headline: "Professional Render Cleaning Across Somerset". Subtext from spec. Two CTAs: "Get a Free Quote" (green, scrolls to #enquiry), "View Our Work" (outlined, scrolls to #gallery). Stock hero image with `next/image`. Stacks vertically on mobile (text above image). Subtle Framer Motion fade-in on load.

- [ ] **Step 2: Verify responsive layout**

Desktop: side-by-side. Mobile: stacked. Image loads with blur placeholder.

- [ ] **Step 3: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: add Hero section with headline, CTAs, and hero image"
```

---

### Task 9: Build TrustBar component

**Files:**
- Create: `components/TrustBar.tsx`

- [ ] **Step 1: Invoke @frontend-design and build TrustBar**

Context: Full-width dark strip (`bg-brand-charcoal`). 4 trust signals in a row (omit BWCA at launch): "224 Five-Star Reviews", "£5M Insured", "Veteran-Owned", "Est. 2019". Use Lucide icons. Wraps to 2 rows on mobile. Trust stats sourced from `siteConfig.trust`.

- [ ] **Step 2: Commit**

```bash
git add components/TrustBar.tsx
git commit -m "feat: add TrustBar with SWC trust signals"
```

---

### Task 10: Build BeforeAfter gallery

**Files:**
- Create: `components/BeforeAfter.tsx`

- [ ] **Step 1: Invoke @frontend-design and build BeforeAfter**

Context: Section with heading "See the Difference", subtitle "Real results from properties across Somerset". 3 cards in a row (stacks on mobile). Each card: side-by-side before/after images using `next/image`, location caption below (e.g., "3-bed semi, Glastonbury"). Images from `public/images/before-N.webp` and `after-N.webp`. Framer Motion fade-in on scroll. `id="gallery"` for scroll target.

- [ ] **Step 2: Commit**

```bash
git add components/BeforeAfter.tsx
git commit -m "feat: add before/after gallery section"
```

---

### Task 11: Build Process section

**Files:**
- Create: `components/Process.tsx`

- [ ] **Step 1: Invoke @frontend-design and build Process**

Context: 3-step horizontal layout (stacks vertically on mobile). Each step: numbered circle (1, 2, 3) in green, title, description. Content from spec: Assess, Treat, Rinse & Protect. Light grey background (`bg-slate-50`). Subtle stagger animation on scroll.

- [ ] **Step 2: Commit**

```bash
git add components/Process.tsx
git commit -m "feat: add 3-step process section"
```

---

### Task 12: Build WhyUs section

**Files:**
- Create: `components/WhyUs.tsx`

- [ ] **Step 1: Invoke @frontend-design and build WhyUs**

Context: 2x2 grid of feature cards. Each card: icon, title, description. Content from spec: Specialist Equipment, Fully Insured, 224 Five-Star Reviews, Safe for Plants & Pets. White background, cards in `bg-slate-50` with rounded corners. Lucide icons.

- [ ] **Step 2: Commit**

```bash
git add components/WhyUs.tsx
git commit -m "feat: add Why Choose Us feature cards"
```

---

### Task 13: Build FAQ accordion

**Files:**
- Create: `components/FAQ.tsx`

- [ ] **Step 1: Invoke @frontend-design and build FAQ**

Context: Expandable accordion. 5 questions from spec. Each item: question text (bold), click to expand/collapse answer. Framer Motion for smooth expand animation. Answers — write factual, concise content during implementation. Include FAQPage JSON-LD structured data for SEO.

FAQ answers to write:
1. **How long does a render clean last?** — 3-5 years depending on location, exposure, and render type. North-facing walls may need retreating sooner.
2. **Will softwash damage my render?** — No. Softwash uses low pressure (unlike jet washing) with biodegradable biocides. Safe for all render types including K-rend, monocouche, and silicone.
3. **How much does render cleaning cost?** — Typical 3-bed semi from £250-400 depending on size and access. We provide free quotes after assessing your property.
4. **What's the difference between softwash and pressure washing?** — Pressure washing blasts dirt off with force and can damage render. Softwash uses gentle low-pressure application of biocide that kills algae at the root, with longer-lasting results.
5. **Do you cover my area?** — We cover all of central Somerset including Glastonbury, Street, Wells, Shepton Mallet, Frome, Midsomer Norton, and surrounding villages. Contact us to check.

- [ ] **Step 2: Commit**

```bash
git add components/FAQ.tsx
git commit -m "feat: add FAQ accordion with structured data"
```

---

### Task 14: Build Footer

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 1: Invoke @frontend-design and build Footer**

Context: Dark background (`bg-brand-charcoal`). Two columns. Left: "Somerset Render Cleaning" heading, "Dan Lee t/a Somerset Render Cleaning", "A specialist service from Somerset Window Cleaning" (linked to siteConfig.swcUrl). Right: phone, email, Privacy Policy link. Copyright year dynamic.

- [ ] **Step 2: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: add Footer with legal disclosure and contact info"
```

---

## Chunk 3: Enquiry Form & API

### Task 15: Create Zod validation schema

**Files:**
- Create: `lib/validation.ts`

- [ ] **Step 1: Write validation schema**

`lib/validation.ts`:
```ts
import { z } from "zod";

export const enquirySchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters")
    .trim(),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .max(20, "Phone number too long")
    .trim(),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(254, "Email too long")
    .trim()
    .toLowerCase(),
  postcode: z
    .string()
    .min(5, "Please enter a valid postcode")
    .max(10, "Postcode too long")
    .trim()
    .toUpperCase(),
  message: z
    .string()
    .max(1000, "Message must be under 1000 characters")
    .trim()
    .optional()
    .default(""),
  honeypot: z.string().max(0, "Bot detected").optional().default(""),
  gclid: z.string().max(200).optional().default(""),
});

export type EnquiryFormData = z.infer<typeof enquirySchema>;
```

- [ ] **Step 2: Commit**

```bash
git add lib/validation.ts
git commit -m "feat: add Zod validation schema for enquiry form"
```

---

### Task 16: Create Google Sheets client

**Files:**
- Create: `lib/google-sheets.ts`

Reference: `~/Projects/SWC/somerset-window-cleaning-site/lib/services/google-sheets/client.ts`

- [ ] **Step 1: Write Google Sheets client**

`lib/google-sheets.ts`:
```ts
import { google } from "googleapis";

function getClient() {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL?.trim();
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.trim().replaceAll("\\n", "\n");
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim();

  if (!clientEmail || !privateKey || !spreadsheetId) {
    console.warn("[Google Sheets] Configuration missing");
    return null;
  }

  const auth = new google.auth.GoogleAuth({
    credentials: { client_email: clientEmail, private_key: privateKey },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return { sheets: google.sheets({ version: "v4", auth }), spreadsheetId };
}

export async function appendRenderLead(data: {
  name: string;
  phone: string;
  email: string;
  postcode: string;
  message: string;
  gclid: string;
  timestamp: string;
}) {
  const client = getClient();
  if (!client) {
    console.error("[Google Sheets] Cannot append — client not configured");
    return;
  }

  const row = [
    data.timestamp,
    data.name,
    data.email,
    `'${data.phone}`, // Prefix with ' to prevent Excel date formatting
    data.postcode,
    data.message,
    data.gclid,
    "New",
  ];

  await client.sheets.spreadsheets.values.append({
    spreadsheetId: client.spreadsheetId,
    range: "Render Leads!A:H",
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] },
  });
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/google-sheets.ts
git commit -m "feat: add Google Sheets client for render leads"
```

---

### Task 17: Create Gmail notification sender

**Files:**
- Create: `lib/gmail.ts`

Reference: `~/Projects/SWC/somerset-window-cleaning-site/lib/services/email/gmail.ts`

- [ ] **Step 1: Write Gmail sender — simplified from SWC pattern**

`lib/gmail.ts`:
```ts
import { google } from "googleapis";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function authorize() {
  if (!process.env.GMAIL_CREDENTIALS_BASE64 || !process.env.GMAIL_TOKEN_BASE64) {
    throw new Error("Gmail credentials not found in environment");
  }

  const credentials = JSON.parse(
    Buffer.from(process.env.GMAIL_CREDENTIALS_BASE64, "base64").toString("utf-8")
  );
  const token = JSON.parse(
    Buffer.from(process.env.GMAIL_TOKEN_BASE64, "base64").toString("utf-8")
  );

  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  oAuth2Client.setCredentials(token);

  if (!token.access_token || (token.expiry_date && token.expiry_date < Date.now())) {
    const { credentials: refreshed } = await oAuth2Client.refreshAccessToken();
    oAuth2Client.setCredentials(refreshed);
  }

  return oAuth2Client;
}

export async function sendEnquiryNotification(data: {
  name: string;
  phone: string;
  email: string;
  postcode: string;
  message: string;
}) {
  const auth = await authorize();
  const gmail = google.gmail({ version: "v1", auth });

  const htmlBody = `
    <h2>New Render Cleaning Enquiry</h2>
    <table style="border-collapse:collapse;font-family:sans-serif;">
      <tr><td style="padding:8px;font-weight:bold;">Name</td><td style="padding:8px;">${escapeHtml(data.name)}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Phone</td><td style="padding:8px;">${escapeHtml(data.phone)}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;">${escapeHtml(data.email)}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Postcode</td><td style="padding:8px;">${escapeHtml(data.postcode)}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Message</td><td style="padding:8px;">${escapeHtml(data.message || "No message")}</td></tr>
    </table>
    <p style="color:#64748b;font-size:12px;margin-top:16px;">From somersetrendercleaning.co.uk</p>
  `.trim();

  const from = "info@somersetwindowcleaning.co.uk";
  const to = "info@somersetwindowcleaning.co.uk";
  const subject = `Render Cleaning Enquiry — ${data.name} (${data.postcode})`;

  const message = [
    `From: Somerset Render Cleaning <${from}>`,
    `To: ${to}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    "Content-Type: text/html; charset=utf-8",
    "",
    htmlBody,
  ].join("\r\n");

  const raw = Buffer.from(message).toString("base64url");

  await gmail.users.messages.send({
    userId: "me",
    requestBody: { raw },
  });
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/gmail.ts
git commit -m "feat: add Gmail notification for render enquiries"
```

---

### Task 18: Create API route for form submission

**Files:**
- Create: `app/api/enquiry/route.ts`
- Create: `lib/rate-limit.ts`

- [ ] **Step 1: Write in-memory rate limiter**

`lib/rate-limit.ts`:
```ts
const requests = new Map<string, number[]>();
const WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const MAX_REQUESTS = 5;

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = requests.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    return true;
  }

  recent.push(now);
  requests.set(ip, recent);
  return false;
}
```

- [ ] **Step 2: Write API route**

`app/api/enquiry/route.ts`:
```ts
import { NextRequest, NextResponse } from "next/server";
import { enquirySchema } from "@/lib/validation";
import { appendRenderLead } from "@/lib/google-sheets";
import { sendEnquiryNotification } from "@/lib/gmail";
import { isRateLimited } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a few minutes." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = enquirySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = result.data;

    // Reject honeypot submissions silently
    if (data.honeypot) {
      return NextResponse.json({ success: true });
    }

    const timestamp = new Date().toLocaleString("en-GB", {
      timeZone: "Europe/London",
    });

    // Fire and forget — don't let one failure block the other
    const [sheetsResult, emailResult] = await Promise.allSettled([
      appendRenderLead({ ...data, timestamp }),
      sendEnquiryNotification(data),
    ]);

    if (sheetsResult.status === "rejected") {
      console.error("[Enquiry] Google Sheets error:", sheetsResult.reason);
    }
    if (emailResult.status === "rejected") {
      console.error("[Enquiry] Gmail error:", emailResult.reason);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Enquiry] Unexpected error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try calling us instead." },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 3: Verify API route responds**

```bash
npm run dev
curl -X POST http://localhost:3000/api/enquiry \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","phone":"01234567890","email":"test@test.com","postcode":"BA6 9TH","message":"test"}'
```

Expected: `{"success":true}` (may log Sheets/Gmail errors if env vars not set locally — that's fine).

- [ ] **Step 4: Commit**

```bash
git add lib/rate-limit.ts app/api/enquiry/route.ts
git commit -m "feat: add enquiry API route with validation, rate limiting, Sheets + Gmail"
```

---

### Task 19: Build EnquiryForm component

**Files:**
- Create: `components/EnquiryForm.tsx`

- [ ] **Step 1: Invoke @frontend-design and build EnquiryForm**

Context: Client component (`"use client"`). React Hook Form with Zod resolver. Fields: name, phone, email, postcode, message (textarea, optional). Hidden honeypot field (CSS `display:none`). Capture GCLID from URL via `useSearchParams()` — store in hidden field. Green submit button "Send Enquiry". Reassurance text below: "We'll call you back, not spam you. No obligation." Success state: replace form with green confirmation message. Error state: inline red message below submit button. `id="enquiry"` on the section wrapper. Green-tinted background (`bg-green-50`).

- [ ] **Step 2: Test form submission end-to-end locally**

Fill form, submit, verify API route receives data. Check browser console for errors.

- [ ] **Step 3: Commit**

```bash
git add components/EnquiryForm.tsx
git commit -m "feat: add enquiry form with validation, honeypot, and GCLID capture"
```

---

## Chunk 4: Assembly, SEO, and Deploy

### Task 20: Assemble landing page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Compose all sections into page.tsx**

`app/page.tsx`:
```tsx
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import BeforeAfter from "@/components/BeforeAfter";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
import EnquiryForm from "@/components/EnquiryForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <BeforeAfter />
        <Process />
        <WhyUs />
        <EnquiryForm />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Verify full page renders and scrolls correctly**

```bash
npm run dev
```

Check: all sections render, scroll CTAs work (#enquiry, #gallery), form submits, mobile responsive.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble full landing page from all sections"
```

---

### Task 21: Add structured data, sitemap, robots, and 404

**Files:**
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Create: `app/not-found.tsx`
- Create: `lib/structured-data.ts`

- [ ] **Step 1: Write structured data helper**

`lib/structured-data.ts`:
```ts
import { siteConfig } from "@/config/site";

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.street,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postcode,
      addressCountry: siteConfig.address.country,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.trust.rating,
      reviewCount: siteConfig.trust.reviewCount,
      bestRating: 5,
    },
    priceRange: "££",
  };
}

export function getFAQSchema(
  items: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
```

- [ ] **Step 2: Add structured data to layout.tsx**

Add to `app/layout.tsx` inside `<body>`:
```tsx
import { getLocalBusinessSchema } from "@/lib/structured-data";

// Inside the body, before {children}:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(getLocalBusinessSchema()),
  }}
/>
```

- [ ] **Step 3: Write sitemap.ts**

`app/sitemap.ts`:
```ts
import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
```

- [ ] **Step 4: Write robots.ts**

`app/robots.ts`:
```ts
import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
```

- [ ] **Step 5: Write not-found.tsx**

`app/not-found.tsx`:
```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold text-brand-charcoal">Page not found</h1>
      <p className="mt-4 text-brand-slate">
        The page you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-brand-green px-6 py-3 font-semibold text-white hover:bg-brand-green-dark"
      >
        Back to Home
      </Link>
    </div>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add lib/structured-data.ts app/sitemap.ts app/robots.ts app/not-found.tsx app/layout.tsx
git commit -m "feat: add structured data, sitemap, robots.txt, and 404 page"
```

---

### Task 22: Add privacy policy page

**Files:**
- Create: `app/privacy/page.tsx`

- [ ] **Step 1: Write privacy policy page**

Adapt from SWC's privacy policy structure. Key points: data controller is Dan Lee t/a Somerset Render Cleaning, data collected (name, phone, email, postcode, message), stored in Google Sheets, used for quoting purposes only, not shared with third parties, retention 3 years, right to erasure via email.

- [ ] **Step 2: Commit**

```bash
git add app/privacy/page.tsx
git commit -m "feat: add privacy policy page"
```

---

### Task 23: Point domain to Vercel and deploy

**Files:** None (infrastructure)

- [ ] **Step 1: Update 20i nameservers**

Log into 20i → somersetrendercleaning.co.uk → Manage → DNS/Nameservers. Change to:
- `ns1.vercel-dns.com`
- `ns2.vercel-dns.com`

- [ ] **Step 2: Add domain in Vercel**

```bash
npx vercel domains add somersetrendercleaning.co.uk
npx vercel domains add www.somersetrendercleaning.co.uk
```

Or add via Vercel dashboard: Project Settings → Domains.

- [ ] **Step 3: Wait for DNS propagation and SSL**

```bash
dig somersetrendercleaning.co.uk NS
```

Expected: Shows Vercel nameservers. May take up to 48 hours but usually under 1 hour.

- [ ] **Step 4: Deploy to production**

```bash
git push origin main
```

Vercel auto-deploys on push.

- [ ] **Step 5: Verify live site**

Check: https://www.somersetrendercleaning.co.uk loads, all sections render, form submits, SSL working.

---

### Task 24: Create "Render Leads" tab in Google Sheets

**Files:** None (Google Sheets configuration)

- [ ] **Step 1: Open the SWC Google Sheets spreadsheet**

Add a new tab called "Render Leads" with headers in row 1:

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| Timestamp | Name | Email | Phone | Postcode | Message | GCLID | Status |

- [ ] **Step 2: Test end-to-end form submission on live site**

Submit a test enquiry on the live site. Verify:
- Row appears in "Render Leads" tab
- Email notification received at info@somersetwindowcleaning.co.uk

---

### Task 25: Run launch checklist

- [ ] **Step 1: Verify all launch checklist items**

1. Domain nameservers → Vercel ✓
2. SSL certificate ✓ (auto-provisioned)
3. Form submission → email + Sheets ✓
4. Stock images in place ✓
5. Analytics tracking live (check GA4 realtime)
6. Mobile responsive (test on real phone)
7. Lighthouse audit: `npx lighthouse https://www.somersetrendercleaning.co.uk --output html` — target > 90 all categories
8. Legal text correct — "Dan Lee t/a Somerset Render Cleaning"
9. SWC phone number displayed
10. Privacy policy accessible at /privacy

- [ ] **Step 2: Fix any issues found**

- [ ] **Step 3: Update project file**

Mark "Build render landing page/microsite" as complete in `~/hq/projects/render-cleaning.md` Phase 2.

- [ ] **Step 4: Final commit if any fixes**

```bash
git add -A
git commit -m "fix: launch checklist fixes"
git push origin main
```

---

## Summary

| Chunk | Tasks | What it delivers |
|-------|-------|-----------------|
| 1: Scaffold & Config | 1-5 | Working Next.js project on GitHub + Vercel |
| 2: UI Components | 6-14 | All 8 page sections built with @frontend-design |
| 3: Form & API | 15-19 | Working enquiry form → email + Google Sheets |
| 4: Assembly & Deploy | 20-25 | Live site at somersetrendercleaning.co.uk |

**Total tasks:** 25
**Estimated implementation:** Use subagent-driven-development for parallel execution of independent tasks within each chunk.
