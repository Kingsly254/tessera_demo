"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Bell,
  Blocks,
  Boxes,
  Calculator,
  ChevronRight,
  Factory,
  LayoutDashboard,
  ListCollapse,
  Megaphone,
  PanelLeftClose,
  PanelLeftOpen,
  PackageSearch,
  Receipt,
  ScanLine,
  Search,
  ScrollText,
  ShieldUser,
  ShoppingCart,
  Sprout,
  SquareUserRound,
  Truck,
  Users,
} from "lucide-react";
import {
  dashboardPages,
  getDashboardPageById,
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

const navIconMap = {
  dashboard: LayoutDashboard,
  manufacturing: Factory,
  inventory: Boxes,
  stocks: ScrollText,
  procurement: PackageSearch,
  purchases: Receipt,
  products: Blocks,
  suppliers: SquareUserRound,
  sales: ShoppingCart,
  distribution: Truck,
  customers: Users,
  hr: ShieldUser,
  attendance: ScanLine,
  cms: Megaphone,
  accounting: Calculator,
  pos: Receipt,
};

const roleUserMap: Record<string, { initials: string; name: string; label: string }> = {
  "stock-manager": { initials: "JO", name: "James Odhiambo", label: "Stock Manager" },
  "sales-agent": { initials: "LN", name: "Lilian Njeri", label: "Sales Agent" },
  client: { initials: "MK", name: "Mary Kamau", label: "Client Portal" },
  owner: { initials: "PM", name: "Peter Mwangi", label: "Owner" },
};

const dashboardNotifications = [
  { title: "Batch BT-8811 is still on quality hold", meta: "Manufacturing | 12 min ago", accent: "red" },
  { title: "Two customer accounts need credit review before dispatch", meta: "Sales | 28 min ago", accent: "amber" },
  { title: "Nairobi warehouse cycle count completed at 98.4% accuracy", meta: "Stock | 1 hr ago", accent: "teal" },
] as const;

function isDemoRole(role: string | undefined): role is keyof typeof roleVisibleModules {
  return Boolean(role && role in roleVisibleModules);
}

function getModuleHref(id: string, demoRole?: string) {
  const basePath = id === "dashboard" ? "/dashboard" : `/dashboard/${id}`;
  return demoRole ? `${basePath}?role=${demoRole}` : basePath;
}

export function DashboardShell({ activePageId, demoRole, children }: DashboardShellProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const activePage = getDashboardPageById(activePageId) ?? dashboardPages[0];
  const activeUser = roleUserMap[demoRole ?? "stock-manager"] ?? roleUserMap["stock-manager"];
  const visibleModuleIds = isDemoRole(demoRole) ? roleVisibleModules[demoRole] : roleVisibleModules.owner;
  const filteredNavigation = Object.fromEntries(
    Object.entries(groupedNavigation)
      .map(([section, pages]) => [section, pages.filter((page) => visibleModuleIds.includes(page.id))])
      .filter(([, pages]) => pages.length > 0),
  ) as Record<string, typeof dashboardPages>;

  useEffect(() => {
    const savedState = window.localStorage.getItem("agrifeed-dashboard-collapsed");
    if (savedState === "true") {
      setIsCollapsed(true);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("agrifeed-dashboard-collapsed", String(isCollapsed));
  }, [isCollapsed]);

  useEffect(() => {
    const savedDensity = window.localStorage.getItem("agrifeed-dashboard-compact");
    if (savedDensity === "true") {
      setIsCompact(true);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("agrifeed-dashboard-compact", String(isCompact));
  }, [isCompact]);

  return (
    <div
      className={`erp-shell shell-has-collapsible-sidebar ${isCollapsed ? "sidebar-collapsed" : ""} ${
        isCompact ? "table-density-compact" : ""
      }`.trim()}
    >
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-badge">
            <div className="logo-icon">
              <Sprout size={18} strokeWidth={2} />
            </div>
            <div>
              <div className="logo-text">AgriFeed</div>
              <div className="logo-sub">Operations Suite</div>
            </div>
          </div>
          <button
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="sidebar-toggle desktop-toggle"
            onClick={() => setIsCollapsed((current) => !current)}
            type="button"
          >
            {isCollapsed ? <PanelLeftOpen size={16} strokeWidth={1.9} /> : <PanelLeftClose size={16} strokeWidth={1.9} />}
          </button>
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
                <span className="nav-icon">
                  {(() => {
                    const Icon = navIconMap[page.id as keyof typeof navIconMap] ?? LayoutDashboard;
                    return <Icon size={16} strokeWidth={1.9} />;
                  })()}
                </span>
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
            <div className="user-info">
              <div className="user-name">{activeUser.name}</div>
              <div className="user-role">{activeUser.label}</div>
            </div>
          </div>
          <div className="sidebar-footer-actions">
            <Link className="sidebar-footer-link" href="/">
              Company Site
            </Link>
            <Link className="sidebar-footer-link" href="/">
              Logout
            </Link>
          </div>
        </div>
      </aside>

      <main className="dashboard-main">
        <div className="topbar">
          <div className="topbar-leading">
            <button
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="sidebar-toggle"
              onClick={() => setIsCollapsed((current) => !current)}
              type="button"
            >
              {isCollapsed ? <PanelLeftOpen size={16} strokeWidth={1.9} /> : <PanelLeftClose size={16} strokeWidth={1.9} />}
            </button>
            <div className="topbar-brand-chip">
              <div className="topbar-brand-icon">
                <Sprout size={14} strokeWidth={2} />
              </div>
              <span>Operations Suite</span>
            </div>
            <div className="page-heading">
              <div className="breadcrumb-trail">
                <span>AgriFeed</span>
                <ChevronRight size={12} strokeWidth={1.8} />
                <span>{activePage.navSection}</span>
                <ChevronRight size={12} strokeWidth={1.8} />
                <span>{activePage.label}</span>
              </div>
              <div className="page-title">{activePage.label}</div>
              <div className="page-subtitle">{activePage.intro}</div>
            </div>
          </div>
          <div className="topbar-actions">
            <button className="dashboard-utility-btn" onClick={() => setIsCompact((current) => !current)} type="button">
              <ListCollapse size={15} strokeWidth={1.9} />
              <span>{isCompact ? "Comfortable" : "Compact"}</span>
            </button>
            <button className="dashboard-utility-btn notification-trigger" onClick={() => setIsNotificationsOpen((current) => !current)} type="button">
              <Bell size={15} strokeWidth={1.9} />
              <span>Alerts</span>
              <span className="notification-count">{dashboardNotifications.length}</span>
            </button>
            <Link className="btn btn-primary" href="/">
              Logout
            </Link>
            <Link className="btn btn-secondary" href="/">
              Company Site
            </Link>
            <div className="search-box">
              <Search size={14} strokeWidth={1.9} />
              <span>Search modules...</span>
            </div>
          </div>
        </div>
        {isNotificationsOpen ? (
          <div className="notifications-panel">
            <div className="notifications-head">
              <div className="section-title">Notifications</div>
              <button className="sidebar-toggle" onClick={() => setIsNotificationsOpen(false)} type="button">
                <PanelLeftClose size={14} strokeWidth={1.9} />
              </button>
            </div>
            <div className="summary-list">
              {dashboardNotifications.map((item) => (
                <div className="notification-item" key={item.title}>
                  <div className={`activity-dot ${item.accent}`.trim()} />
                  <div>
                    <div className="summary-title">{item.title}</div>
                    <div className="summary-meta">{item.meta}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        {children}
      </main>
    </div>
  );
}
