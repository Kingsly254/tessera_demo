"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { DashboardShell } from "@/components/dashboard-shell";

type DashboardLayoutShellProps = {
  children: React.ReactNode;
};

export function DashboardLayoutShell({ children }: DashboardLayoutShellProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const parts = pathname.split("/").filter(Boolean);
  const moduleId = parts[1] ?? "dashboard";
  const role = searchParams.get("role") ?? undefined;

  return <DashboardShell activePageId={moduleId} demoRole={role}>{children}</DashboardShell>;
}
