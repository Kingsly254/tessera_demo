import { DashboardContent } from "@/components/dashboard-content";
import { redirect } from "next/navigation";
import { roleDefaultModule } from "@/data/erp-demo";

type DashboardPageProps = {
  searchParams?: Promise<{
    role?: string;
  }>;
};

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const params = (await searchParams) ?? {};
  const role = params.role;

  if (role && role in roleDefaultModule && roleDefaultModule[role as keyof typeof roleDefaultModule] !== "dashboard") {
    redirect(`/dashboard/${roleDefaultModule[role as keyof typeof roleDefaultModule]}?role=${role}`);
  }

  return <DashboardContent activePageId="dashboard" />;
}
