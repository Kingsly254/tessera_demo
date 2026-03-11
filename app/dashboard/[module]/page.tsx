import { notFound } from "next/navigation";
import { DashboardContent } from "@/components/dashboard-content";
import { dashboardPages, getDashboardPageById } from "@/data/erp-demo";

type ModuleDashboardPageProps = {
  params: Promise<{
    module: string;
  }>;
};

export function generateStaticParams() {
  return dashboardPages
    .filter((page) => page.id !== "dashboard")
    .map((page) => ({ module: page.id }));
}

export default async function ModuleDashboardPage({ params }: ModuleDashboardPageProps) {
  const routeParams = await params;
  const page = getDashboardPageById(routeParams.module);

  if (!page || page.id === "dashboard") {
    notFound();
  }

  return <DashboardContent activePageId={page.id} />;
}
