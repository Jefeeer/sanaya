import { redirect } from "next/navigation";
import { auth, isStaff } from "@/lib/auth";
import { label } from "@/lib/contract";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  // Authoritative gate — never rely on hidden UI. Non-staff are redirected.
  if (!session?.user || !isStaff(session.user.role)) redirect("/admin/login");

  // Live badge for pending work. Cheap indexed count; keeps the nav actionable.
  const newCount = await prisma.inquiry.count({ where: { status: "NEW" } });

  return (
    <AdminShell
      user={{ name: session.user.name ?? "Admin", role: label(session.user.role) }}
      newCount={newCount}
    >
      {children}
    </AdminShell>
  );
}
