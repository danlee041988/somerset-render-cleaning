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
