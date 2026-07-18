"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { projectSchema, type ProjectInput } from "@/lib/validations";

async function requireSession() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  return session;
}

export async function createProject(data: ProjectInput) {
  await requireSession();
  const parsed = projectSchema.parse(data);
  const project = await prisma.project.create({ data: parsed });
  revalidatePath("/admin/projects");
  revalidatePath("/");
  return project;
}

export async function updateProject(id: string, data: ProjectInput) {
  await requireSession();
  const parsed = projectSchema.parse(data);
  const project = await prisma.project.update({ where: { id }, data: parsed });
  revalidatePath("/admin/projects");
  revalidatePath(`/admin/projects/${id}`);
  return project;
}

export async function deleteProject(id: string) {
  await requireSession();
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
  revalidatePath("/");
}
