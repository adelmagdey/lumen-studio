"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Github, Twitter, Linkedin } from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { contactSchema, type ContactInput } from "@/lib/validations";

export function Contact() {
  const t = useTranslations("contact");
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      toast.success(t("success"));
      reset();
    } catch {
      toast.error(t("error"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Section id="contact" spacing="xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-2xl text-center"
      >
        <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
          {t("title")}
        </h2>
        <p className="mt-4 text-pretty text-base text-muted-foreground sm:text-lg">
          {t("subtitle")}
        </p>
      </motion.div>

      <div className="mt-12 grid gap-6 lg:grid-cols-5">
        {/* Info */}
        <Card glass className="p-0 lg:col-span-2">
          <CardContent className="p-8">
            <h3 className="text-lg font-semibold">{t("info.title")}</h3>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 text-[var(--color-brand-400)]" />
                <div>
                  <div className="text-muted-foreground">
                    {t("info.emailLabel")}
                  </div>
                  <a
                    href="mailto:hello@lumen.studio"
                    className="font-medium hover:text-foreground"
                  >
                    hello@lumen.studio
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 text-[var(--color-brand-400)]" />
                <div>
                  <div className="text-muted-foreground">
                    {t("info.phoneLabel")}
                  </div>
                  <a
                    href="tel:+1-555-0100"
                    className="font-medium hover:text-foreground"
                  >
                    +1 (555) 010-0100
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-[var(--color-brand-400)]" />
                <div>
                  <div className="text-muted-foreground">
                    {t("info.addressLabel")}
                  </div>
                  <span className="font-medium">
                    221B Bond Street, London
                  </span>
                </div>
              </li>
            </ul>

            <div className="mt-8">
              <div className="text-sm text-muted-foreground">
                {t("info.followUs")}
              </div>
              <div className="mt-3 flex gap-2">
                {[Twitter, Github, Linkedin].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form */}
        <Card glass className="p-0 lg:col-span-3">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name">{t("name")}</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    className="mt-1.5"
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">{t("email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="mt-1.5"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="subject">{t("subject")}</Label>
                <Input
                  id="subject"
                  {...register("subject")}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="message">{t("message")}</Label>
                <Textarea
                  id="message"
                  rows={5}
                  {...register("message")}
                  className="mt-1.5"
                  aria-invalid={!!errors.message}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.message.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                variant="gradient"
                size="lg"
                disabled={submitting}
                className="w-full sm:w-auto"
              >
                {submitting ? (
                  t("sending")
                ) : (
                  <>
                    {t("send")}
                    <Send className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
