type PortalLayoutProps = {
  children: React.ReactNode;
};

export default function PortalLayout({ children }: PortalLayoutProps) {
  return (
    <div className="shell dashboard-shell-view">
      <section className="section dashboard-stage">{children}</section>
    </div>
  );
}
