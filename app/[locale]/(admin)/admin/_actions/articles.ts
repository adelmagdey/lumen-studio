"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { articleSchema, type ArticleInput } from "@/lib/validations";

async function requireSession() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function createArticle(
  data: ArticleInput & { authorId: string }
) {
  await requireSession();
  const parsed = articleSchema.parse(data);
  const article = await prisma.article.create({
    data: { ...parsed, authorId: data.authorId },
  });
  revalidatePath("/admin/articles");
  revalidatePath("/");
  return article;
}

export async function updateArticle(id: string, data: ArticleInput) {
  await requireSession();
  const parsed = articleSchema.parse(data);
  const article = await prisma.article.update({
    where: { id },
    data: parsed,
  });
  revalidatePath("/admin/articles");
  revalidatePath(`/admin/articles/${id}`);
  return article;
}

export async function deleteArticle(id: string) {
  await requireSession();
  await prisma.article.delete({ where: { id } });
  revalidatePath("/admin/articles");
  revalidatePath("/");
}

export async function toggleArticlePublished(id: string, published: boolean) {
  await requireSession();
  await prisma.article.update({ where: { id }, data: { published } });
  revalidatePath("/admin/articles");
}
