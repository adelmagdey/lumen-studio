"use server";

import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

async function requireSession() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  return session;
}

export async function uploadMedia(formData: FormData) {
  await requireSession();
  const file = formData.get("file") as File;
  if (!file) throw new Error("No file provided");

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
  const filename = `${randomBytes(8).toString("hex")}.${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });
  const filepath = path.join(uploadDir, filename);
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filepath, buffer);

  const media = await prisma.media.create({
    data: {
      filename,
      originalName: file.name,
      mimeType: file.type,
      size: file.size,
      path: `/uploads/${filename}`,
      alt: (formData.get("alt") as string) || null,
    },
  });
  revalidatePath("/admin/media");
  return media;
}

export async function deleteMedia(id: string) {
  await requireSession();
  const media = await prisma.media.findUnique({ where: { id } });
  if (media) {
    try {
      const { unlink } = await import("node:fs/promises");
      const filepath = path.join(process.cwd(), "public", media.path);
      await unlink(filepath);
    } catch {
      // ignore — file may already be gone
    }
    await prisma.media.delete({ where: { id } });
  }
  revalidatePath("/admin/media");
}
