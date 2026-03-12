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
