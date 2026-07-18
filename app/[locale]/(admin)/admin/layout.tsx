import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { AdminShell } from "./_components/admin-shell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/en/login");
  }
  return (
    <AdminShell
      user={{
        name: session.user.name ?? "Admin",
        email: session.user.email ?? "",
        role: session.user.role,
      }}
      onSignOut={async () => {
        "use server";
        await signOut({ redirectTo: "/en" });
      }}
    >
      {children}
    </AdminShell>
  );
}
