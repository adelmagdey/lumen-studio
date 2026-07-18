"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { userSchema, type UserInput } from "@/lib/validations";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Forbidden");
  }
  return session;
}

export async function createUser(data: UserInput) {
  await requireAdmin();
  const parsed = userSchema.parse(data);
  const hashed = parsed.password
    ? await bcrypt.hash(parsed.password, 10)
    : null;
  const user = await prisma.user.create({
    data: {
      name: parsed.name,
      email: parsed.email,
      role: parsed.role,
      password: hashed,
    },
  });
  revalidatePath("/admin/users");
  return user;
}

export async function updateUser(id: string, data: UserInput) {
  await requireAdmin();
  const parsed = userSchema.parse(data);
  const hashed = parsed.password
    ? await bcrypt.hash(parsed.password, 10)
    : undefined;
  const user = await prisma.user.update({
    where: { id },
    data: {
      name: parsed.name,
      email: parsed.email,
      role: parsed.role,
      ...(hashed ? { password: hashed } : {}),
    },
  });
  revalidatePath("/admin/users");
  return user;
}

export async function deleteUser(id: string) {
  const session = await requireAdmin();
  if (id === session.user.id) {
    throw new Error("You cannot delete your own account");
  }
  await prisma.user.delete({ where: { id } });
  revalidatePath("/admin/users");
}
