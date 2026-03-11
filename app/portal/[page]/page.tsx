import { notFound } from "next/navigation";
import { ClientPortal } from "@/components/client-portal";
import { clientPortalPages } from "@/data/erp-demo";

type ClientPortalPageProps = {
  params: Promise<{
    page: string;
  }>;
};

export function generateStaticParams() {
  return clientPortalPages.filter((page) => page.id !== "overview").map((page) => ({ page: page.id }));
}

export default async function ClientPortalPage({ params }: ClientPortalPageProps) {
  const routeParams = await params;
  const page = clientPortalPages.find((entry) => entry.id === routeParams.page);

  if (!page || page.id === "overview") {
    notFound();
  }

  return <ClientPortal pageId={page.id} />;
}
