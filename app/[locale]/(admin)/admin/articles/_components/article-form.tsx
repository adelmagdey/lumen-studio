"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { articleSchema, type ArticleInput } from "@/lib/validations";
import { slugify } from "@/lib/utils";
import { createArticle, updateArticle } from "../../_actions/articles";

interface Props {
  authorId: string;
  initial?: ArticleInput & { id: string };
}

export function ArticleForm({ authorId, initial }: Props) {
  const t = useTranslations("admin");
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ArticleInput>({
    resolver: zodResolver(articleSchema),
    defaultValues: initial ?? {
      slug: "",
      titleEn: "",
      titleAr: "",
      excerptEn: "",
      excerptAr: "",
      contentEn: "",
      contentAr: "",
      coverImage: "",
      tags: "",
      published: false,
    },
  });

  const titleEn = watch("titleEn");

  const onSubmit = async (data: ArticleInput) => {
    setSubmitting(true);
    try {
      if (initial?.id) {
        await updateArticle(initial.id, data);
        toast.success(t("updateSuccess"));
      } else {
        await createArticle({ ...data, authorId });
        toast.success(t("createSuccess"));
      }
      router.push("/en/admin/articles");
      router.refresh();
    } catch (e) {
      toast.error((e as Error).message ?? "Error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div>
            <Label htmlFor="titleEn">{t("titleEn")}</Label>
            <Input
              id="titleEn"
              {...register("titleEn")}
              onBlur={() => {
                if (!initial && titleEn) setValue("slug", slugify(titleEn));
              }}
              className="mt-1.5"
            />
            {errors.titleEn && (
              <p className="mt-1 text-xs text-destructive">
                {errors.titleEn.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="titleAr">{t("titleAr")}</Label>
            <Input id="titleAr" {...register("titleAr")} className="mt-1.5" dir="rtl" />
            {errors.titleAr && (
              <p className="mt-1 text-xs text-destructive">
                {errors.titleAr.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="excerptEn">{t("excerptEn")}</Label>
            <Textarea
              id="excerptEn"
              rows={2}
              {...register("excerptEn")}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="excerptAr">{t("excerptAr")}</Label>
            <Textarea
              id="excerptAr"
              rows={2}
              {...register("excerptAr")}
              className="mt-1.5"
              dir="rtl"
            />
          </div>
          <div>
            <Label htmlFor="contentEn">{t("contentEn")}</Label>
            <Textarea
              id="contentEn"
              rows={12}
              {...register("contentEn")}
              className="mt-1.5 font-mono text-sm"
            />
            {errors.contentEn && (
              <p className="mt-1 text-xs text-destructive">
                {errors.contentEn.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="contentAr">{t("contentAr")}</Label>
            <Textarea
              id="contentAr"
              rows={12}
              {...register("contentAr")}
              className="mt-1.5 font-mono text-sm"
              dir="rtl"
            />
            {errors.contentAr && (
              <p className="mt-1 text-xs text-destructive">
                {errors.contentAr.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <Label htmlFor="slug">{t("slug")}</Label>
            <Input id="slug" {...register("slug")} className="mt-1.5" />
            {errors.slug && (
              <p className="mt-1 text-xs text-destructive">
                {errors.slug.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="coverImage">{t("coverImage")}</Label>
            <Input
              id="coverImage"
              {...register("coverImage")}
              className="mt-1.5"
              placeholder="https://..."
            />
          </div>
          <div>
            <Label htmlFor="tags">{t("tags")}</Label>
            <Input id="tags" {...register("tags")} className="mt-1.5" />
          </div>
          <div className="flex items-center gap-2">
            <input
              id="published"
              type="checkbox"
              {...register("published")}
              className="h-4 w-4 rounded border-border"
            />
            <Label htmlFor="published" className="cursor-pointer">
              {t("published")}
            </Label>
          </div>
          <div className="flex flex-col gap-2 pt-4">
            <Button type="submit" variant="gradient" disabled={submitting}>
              {submitting ? "…" : t("save")}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.back()}
            >
              {t("cancel")}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
