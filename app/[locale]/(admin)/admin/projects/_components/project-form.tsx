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
import { projectSchema, type ProjectInput } from "@/lib/validations";
import { slugify } from "@/lib/utils";
import { createProject, updateProject } from "../../_actions/projects";

interface Props {
  initial?: ProjectInput & { id: string };
}

export function ProjectForm({ initial }: Props) {
  const t = useTranslations("admin");
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: initial ?? {
      slug: "",
      titleEn: "",
      titleAr: "",
      descriptionEn: "",
      descriptionAr: "",
      image: "",
      category: "",
      technologies: "",
      liveUrl: "",
      githubUrl: "",
      featured: false,
      order: 0,
    },
  });

  const titleEn = watch("titleEn");

  const onSubmit = async (data: ProjectInput) => {
    setSubmitting(true);
    try {
      if (initial?.id) {
        await updateProject(initial.id, data);
        toast.success(t("updateSuccess"));
      } else {
        await createProject(data);
        toast.success(t("createSuccess"));
      }
      router.push("/en/admin/projects");
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
          </div>
          <div>
            <Label htmlFor="descriptionEn">{t("descriptionEn")}</Label>
            <Textarea
              id="descriptionEn"
              rows={4}
              {...register("descriptionEn")}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="descriptionAr">{t("descriptionAr")}</Label>
            <Textarea
              id="descriptionAr"
              rows={4}
              {...register("descriptionAr")}
              className="mt-1.5"
              dir="rtl"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <Label htmlFor="slug">{t("slug")}</Label>
            <Input id="slug" {...register("slug")} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="image">{t("image")}</Label>
            <Input id="image" {...register("image")} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="category">{t("category")}</Label>
            <Input id="category" {...register("category")} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="technologies">{t("technologies")}</Label>
            <Input
              id="technologies"
              {...register("technologies")}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="liveUrl">{t("liveUrl")}</Label>
            <Input id="liveUrl" {...register("liveUrl")} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="githubUrl">{t("githubUrl")}</Label>
            <Input id="githubUrl" {...register("githubUrl")} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="order">{t("order")}</Label>
            <Input
              id="order"
              type="number"
              {...register("order", { valueAsNumber: true })}
              className="mt-1.5"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              id="featured"
              type="checkbox"
              {...register("featured")}
              className="h-4 w-4 rounded border-border"
            />
            <Label htmlFor="featured" className="cursor-pointer">
              {t("featured")}
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
