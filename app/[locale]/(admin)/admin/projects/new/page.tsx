import { getTranslations } from "next-intl/server";
import { ProjectForm } from "../_components/project-form";

export default async function NewProjectPage() {
  const t = await getTranslations("admin");
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">
        {t("newProject")}
      </h1>
      <ProjectForm />
    </div>
  );
}
