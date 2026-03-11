import { Suspense } from "react";
import { DashboardLayoutShell } from "@/components/dashboard-layout-shell";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="shell dashboard-shell-view">
      <section className="section dashboard-stage">
        <Suspense fallback={<div className="erp-shell" />}>
          <DashboardLayoutShell>{children}</DashboardLayoutShell>
        </Suspense>
      </section>
    </div>
  );
}
