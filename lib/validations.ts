import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().email("Invalid email address"),
  subject: z.string().max(120).optional().or(z.literal("")),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message too long"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const articleSchema = z.object({
  slug: z
    .string()
    .min(3)
    .max(120)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, hyphens"),
  titleEn: z.string().min(1).max(200),
  titleAr: z.string().min(1).max(200),
  excerptEn: z.string().max(500).optional().or(z.literal("")),
  excerptAr: z.string().max(500).optional().or(z.literal("")),
  contentEn: z.string().min(1),
  contentAr: z.string().min(1),
  coverImage: z.string().url().optional().or(z.literal("")),
  tags: z.string().max(200).optional().or(z.literal("")),
  published: z.boolean().default(false),
});

export const projectSchema = z.object({
  slug: z
    .string()
    .min(3)
    .max(120)
    .regex(/^[a-z0-9-]+$/),
  titleEn: z.string().min(1).max(200),
  titleAr: z.string().min(1).max(200),
  descriptionEn: z.string().min(1).max(2000),
  descriptionAr: z.string().min(1).max(2000),
  image: z.string().url().optional().or(z.literal("")),
  category: z.string().max(60).optional().or(z.literal("")),
  technologies: z.string().max(200).optional().or(z.literal("")),
  liveUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  featured: z.boolean().default(false),
  order: z.number().int().min(0).max(999).default(0),
});

export const userSchema = z.object({
  name: z.string().min(1).max(80),
  email: z.string().email(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100)
    .optional()
    .or(z.literal("")),
  role: z.enum(["USER", "ADMIN", "EDITOR"]).default("USER"),
});

export const settingSchema = z.object({
  key: z.string().min(1).max(60),
  value: z.string().max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ArticleInput = z.infer<typeof articleSchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
export type UserInput = z.infer<typeof userSchema>;
export type SettingInput = z.infer<typeof settingSchema>;
