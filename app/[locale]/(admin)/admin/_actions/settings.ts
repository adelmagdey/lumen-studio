"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { settingSchema, type SettingInput } from "@/lib/validations";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Forbidden");
  }
  return session;
}

export async function updateSetting(data: SettingInput) {
  await requireAdmin();
  const parsed = settingSchema.parse(data);
  await prisma.setting.upsert({
    where: { key: parsed.key },
    update: { value: parsed.value },
    create: parsed,
  });
  revalidatePath("/admin/settings");
  revalidatePath("/", "layout");
}
