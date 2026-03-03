# Somerset Render Cleaning — Site Design

## Overview
Single-page landing site for Somerset Render Cleaning, a separate business from SWC. Render cleaning is the core service; other exterior cleaning (patios, driveways, decking, roofs) mentioned as secondary offerings in small print.

## Tech Stack
- Next.js 14 (App Router)
- Tailwind CSS
- Vercel deployment
- No database, no auth, no CMS

## Sections (top to bottom)

### 1. Hero
Full-width background image (placeholder). Headline focused on render cleaning. Subline about transforming dirty, algae-stained renders. CTA button scrolls to quote form.

### 2. What We Do (Render Cleaning Focus)
Detailed section on render cleaning expertise: K-rend, silicone render, monocouche, traditional render. Soft wash process explanation. Why renders need specialist cleaning (not pressure washing).

### 3. Before & After Gallery
Side-by-side image comparisons with CSS slider. Placeholder images for now — Dan will add real photos later.

### 4. Why Choose Us
Trust signals: veteran-owned, fully insured, local Somerset business, soft wash specialists (no pressure washer damage), free quotes.

### 5. How It Works
3-step process: Get a Quote → We Visit & Assess → Render Transformed.

### 6. Testimonials
Placeholder testimonial cards. Dan will add real testimonials later.

### 7. Quote Form
Fields: name, email, phone, postcode, message. Sends via API route (console log for now, email wiring later).

### 8. Footer
Business name, phone, email, Somerset service area. Small print: "We also offer patio, driveway, decking, and roof cleaning — get in touch for details."

## Design Direction
- Dark charcoal/slate palette with vibrant accent (electric blue or green)
- Clean, modern typography
- Mobile-first responsive
- Placeholder stock images (Unsplash render/exterior cleaning)

## File Structure
```
/app/page.tsx              — single page, all sections
/app/layout.tsx            — metadata, fonts, global styles
/app/api/quote/route.ts    — form handler (console log)
/components/Hero.tsx
/components/WhatWeDo.tsx
/components/Gallery.tsx
/components/WhyChooseUs.tsx
/components/HowItWorks.tsx
/components/Testimonials.tsx
/components/QuoteForm.tsx
/components/Footer.tsx
/components/Navigation.tsx
```

## Out of Scope
- Blog, CMS, database, authentication
- Email sending (form logs to console; wired up later)
- Real photos (placeholders only)
- SEO area pages (single page only)
