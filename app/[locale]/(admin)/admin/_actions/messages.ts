"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

async function requireSession() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  return session;
}

export async function markRead(id: string, read = true) {
  await requireSession();
  await prisma.message.update({ where: { id }, data: { read } });
  revalidatePath("/admin/messages");
}

export async function deleteMessage(id: string) {
  await requireSession();
  await prisma.message.delete({ where: { id } });
  revalidatePath("/admin/messages");
}
