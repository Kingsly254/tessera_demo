import Link from "next/link";
import {
  dashboardPages,
  getDashboardPageById,
  roleActionLabels,
  roleDashboardBriefs,
  roleVisibleModules,
} from "@/data/erp-demo";

type DashboardShellProps = {
  activePageId: string;
  demoRole?: string;
  children: React.ReactNode;
};

const groupedNavigation = dashboardPages.reduce<Record<string, typeof dashboardPages>>((acc, page) => {
  acc[page.navSection] ??= [];
  acc[page.navSection].push(page);
  return acc;
}, {});

const roleUserMap: Record<string, { initials: string; name: string; label: string }> = {
  "stock-manager": { initials: "SM", name: "James Odhiambo", label: "Stock Manager Demo" },
  "sales-agent": { initials: "SA", name: "Lilian Njeri", label: "Sales Agent Demo" },
  client: { initials: "CL", name: "Mary Kamau", label: "Client Portal Demo" },
  owner: { initials: "OW", name: "Peter Mwangi", label: "Owner Demo" },
};

function isDemoRole(role: string | undefined): role is keyof typeof roleVisibleModules {
  return Boolean(role && role in roleVisibleModules);
}

function getModuleHref(id: string, demoRole?: string) {
  const basePath = id === "dashboard" ? "/dashboard" : `/dashboard/${id}`;
  return demoRole ? `${basePath}?role=${demoRole}` : basePath;
}

export function DashboardShell({ activePageId, demoRole, children }: DashboardShellProps) {
  const activePage = getDashboardPageById(activePageId) ?? dashboardPages[0];
  const activeUser = roleUserMap[demoRole ?? "stock-manager"] ?? roleUserMap["stock-manager"];
  const roleBrief = demoRole && demoRole in roleDashboardBriefs
    ? roleDashboardBriefs[demoRole as keyof typeof roleDashboardBriefs]
    : roleDashboardBriefs.owner;
  const visibleModuleIds = isDemoRole(demoRole) ? roleVisibleModules[demoRole] : roleVisibleModules.owner;
  const actionLabels = isDemoRole(demoRole) ? roleActionLabels[demoRole] : roleActionLabels.owner;
  const filteredNavigation = Object.fromEntries(
    Object.entries(groupedNavigation)
      .map(([section, pages]) => [section, pages.filter((page) => visibleModuleIds.includes(page.id))])
      .filter(([, pages]) => pages.length > 0),
  ) as Record<string, typeof dashboardPages>;

  return (
    <div className="erp-shell">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-badge">
            <div className="logo-icon">AF</div>
            <div>
              <div className="logo-text">AgriFeed</div>
              <div className="logo-sub">ERP Platform</div>
            </div>
          </div>
        </div>

        {Object.entries(filteredNavigation).map(([section, pages]) => (
          <div className="sidebar-section" key={section}>
            <div className="sidebar-label">{section}</div>
            {pages.map((page) => (
              <Link
                className={`nav-item ${page.id === activePage.id ? "active" : ""}`}
                href={getModuleHref(page.id, demoRole)}
                key={page.id}
              >
                <span>{page.label}</span>
                {page.badge ? (
                  <span className={`nav-badge ${page.badge.accent ?? ""}`.trim()}>{page.badge.text}</span>
                ) : null}
              </Link>
            ))}
          </div>
        ))}

        <div className="sidebar-bottom">
          <div className="user-card">
            <div className="user-avatar">{activeUser.initials}</div>
            <div>
              <div className="logo-text" style={{ fontSize: "0.95rem" }}>
                {activeUser.name}
              </div>
              <div className="user-role">{activeUser.label}</div>
            </div>
          </div>
        </div>
      </aside>

      <main className="dashboard-main">
        <div className="topbar">
          <div>
            <div className="page-title">{activePage.label}</div>
            <div className="small">{activePage.intro}</div>
            <div className="small" style={{ marginTop: "4px" }}>
              {roleBrief.title}: {roleBrief.detail}
            </div>
          </div>
          <div className="topbar-actions">
            <div className="search-box">Search records...</div>
            <Link className="btn btn-secondary" href={getModuleHref("dashboard", demoRole)}>
              {actionLabels.overview}
            </Link>
            <Link className="btn btn-primary" href="/">
              {actionLabels.home}
            </Link>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
