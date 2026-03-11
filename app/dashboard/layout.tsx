import { DashboardLayoutShell } from "@/components/dashboard-layout-shell";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="shell">
      <section className="section" style={{ paddingTop: "32px" }}>
        <DashboardLayoutShell>{children}</DashboardLayoutShell>
      </section>
    </div>
  );
}
