import Link from "next/link";
import {
  getDashboardPageById,
  moduleTables,
  salesChart,
} from "@/data/erp-demo";

type DashboardContentProps = {
  activePageId: string;
};

const dashboardActivity = [
  { title: "Purchase Order #PO-2024-0312 approved for Dairy Meal replenishment", meta: "2 hours ago", accent: "" },
  { title: "Low stock alert raised for Layers Mash at Kisumu Hub", meta: "4 hours ago", accent: "amber" },
  { title: "Sales Order #SO-2024-0589 dispatched to Nakuru Farmers Co-op", meta: "6 hours ago", accent: "teal" },
  { title: "Delivery #DLV-0214 returned due to a quality issue", meta: "Yesterday, 3:40 PM", accent: "red" },
  { title: "New customer account opened for Rift Valley Poultry Farm", meta: "Yesterday, 10:12 AM", accent: "" },
] as const;

const topSellingProducts = [
  ["Layers Mash 70kg", "1,240", "KES 372,000", "+12%", "green"],
  ["Dairy Meal 50kg", "980", "KES 441,000", "+8%", "green"],
  ["Grower Mash 50kg", "760", "KES 228,000", "-2%", "amber"],
  ["Maize Germ 90kg", "540", "KES 162,000", "+5%", "green"],
  ["Fish Meal 50kg", "320", "KES 224,000", "-9%", "red"],
] as const;

const warehouseCapacity = [
  ["Nairobi Central Warehouse", 78, "default"],
  ["Kisumu Distribution Hub", 91, "amber"],
  ["Nakuru Depot", 52, "default"],
  ["Eldoret Branch Store", 95, "red"],
  ["Mombasa Port Store", 44, "default"],
] as const;

const moduleConfigs: Record<
  string,
  {
    title: string;
    tabs?: string[];
    actions?: { label: string; variant: "primary" | "secondary"; href?: string; newTab?: boolean }[];
    alerts?: { text: string; accent: "amber" | "red" }[];
  }
> = {
  manufacturing: {
    title: "Production Workbench",
    tabs: ["Work Orders", "Batch Status", "Consumption", "Quality Holds"],
    actions: [
      { label: "Release Batch", variant: "primary" },
      { label: "Export Plan", variant: "secondary" },
    ],
    alerts: [{ text: "One batch is on quality hold and awaiting laboratory release.", accent: "red" }],
  },
  inventory: {
    title: "Inventory Snapshot",
    tabs: ["All Items", "Low Stock", "By Warehouse", "By Category"],
    actions: [
      { label: "Export", variant: "secondary" },
      { label: "Add Item", variant: "primary" },
    ],
    alerts: [
      { text: "3 items are below minimum reorder quantity. Review and create purchase orders immediately.", accent: "amber" },
      { text: "Eldoret Branch Store is at 95% capacity. Consider transfer or urgent sales push.", accent: "red" },
    ],
  },
  stocks: {
    title: "Stock Ledger",
    actions: [
      { label: "Filter Date", variant: "secondary" },
      { label: "Export CSV", variant: "secondary" },
      { label: "Stock Entry", variant: "primary" },
    ],
  },
  procurement: {
    title: "Purchase Requisitions & RFQs",
    tabs: ["All", "Draft", "Submitted", "Approved", "Ordered"],
    actions: [{ label: "New Requisition", variant: "primary" }],
  },
  purchases: {
    title: "Purchase Orders",
    actions: [
      { label: "Export", variant: "secondary" },
      { label: "Create PO", variant: "primary" },
    ],
  },
  products: {
    title: "Item Master",
    actions: [
      { label: "Update Price List", variant: "secondary" },
      { label: "Add Item", variant: "primary" },
    ],
  },
  suppliers: {
    title: "Supplier Register",
    actions: [
      { label: "Scorecard Export", variant: "secondary" },
      { label: "Add Supplier", variant: "primary" },
    ],
  },
  sales: {
    title: "Sales Orders",
    tabs: ["All Orders", "Pending", "Processing", "Delivered", "Cancelled"],
    actions: [
      { label: "Export", variant: "secondary" },
      { label: "New Order", variant: "primary" },
    ],
  },
  distribution: {
    title: "Active Delivery Notes",
    actions: [{ label: "Schedule Dispatch", variant: "primary" }],
  },
  customers: {
    title: "Customer Accounts",
    tabs: ["Accounts", "Credit Review", "Statements", "Collections"],
    actions: [
      { label: "Export Statements", variant: "secondary" },
      { label: "Add Customer", variant: "primary" },
    ],
  },
  hr: {
    title: "HRMS Workbench",
    tabs: ["Employees", "Leave", "Payroll Prep", "Recruitment"],
    actions: [
      { label: "Download Staff List", variant: "secondary" },
      { label: "Add Employee", variant: "primary" },
    ],
  },
  attendance: {
    title: "Time Attendance",
    tabs: ["Clock-ins", "Absences", "Overtime", "Exceptions"],
    actions: [
      { label: "Export Attendance", variant: "secondary" },
      { label: "Close Shift", variant: "primary" },
    ],
  },
  cms: {
    title: "Content Management",
    tabs: ["Website", "Campaigns", "Dealer Notices", "Downloads"],
    actions: [
      { label: "Publish Queue", variant: "secondary" },
      { label: "Create Content", variant: "primary" },
    ],
  },
  accounting: {
    title: "Finance Control",
    tabs: ["Receivables", "Payables", "Journals", "Exceptions"],
    actions: [
      { label: "Export Finance View", variant: "secondary" },
      { label: "New Journal", variant: "primary" },
    ],
    alerts: [{ text: "Two finance postings are waiting for review before period close.", accent: "amber" }],
  },
  pos: {
    title: "Point of Sale",
    tabs: ["Walk-In Sales", "Till Summary", "Returns", "Receipts"],
    actions: [
      { label: "Open POS Page", variant: "primary", href: "/pos", newTab: true },
      { label: "Export Receipts", variant: "secondary" },
    ],
  },
};

function renderStatusCell(cell: string, isLast: boolean) {
  if (!isLast) {
    return cell;
  }

  if (/active|approved|matched|confirmed|completed|delivered|ready|present|received|ordered|live|posted|clear/i.test(cell)) {
    return <span className="badge badge-green">{cell}</span>;
  }

  if (/pending|review|loading|scheduled|quote|hold|credit|draft|partial|processing|transit|follow/i.test(cell)) {
    return <span className="badge badge-amber">{cell}</span>;
  }

  if (/rejected|blocked|absent|exception|late|failed|overdue|returned/i.test(cell)) {
    return <span className="badge badge-red">{cell}</span>;
  }

  return cell;
}

export function DashboardContent({ activePageId }: DashboardContentProps) {
  const activePage = getDashboardPageById(activePageId) ?? getDashboardPageById("dashboard");
  const moduleTable = moduleTables[activePage!.id];
  const moduleConfig = moduleConfigs[activePage!.id];

  return (
    <>
      <section className="page-panel">
        <div className="kpi-grid">
          {activePage!.kpis.map((kpi) => (
            <article className={`kpi-card ${kpi.accent ?? ""}`.trim()} key={kpi.label}>
              <div className="kpi-label">{kpi.label}</div>
              <div className="kpi-value">{kpi.value}</div>
              <div className="kpi-sub">{kpi.subtext}</div>
              {kpi.change ? <div className={`kpi-change ${kpi.accent === "red" ? "down" : "up"}`}>{kpi.change}</div> : null}
            </article>
          ))}
        </div>
      </section>

      {activePage!.id === "dashboard" ? (
        <>
          <section className="page-panel">
            <div className="grid-2">
              <article className="chart-card">
                <h3 className="chart-title">Monthly Sales - Bags Sold (MT)</h3>
                <div className="bar-chart">
                  {salesChart.map((item) => (
                    <div className="bar-col" key={item.month}>
                      <div className={`bar ${item.accent ?? ""}`.trim()} style={{ height: `${item.height}%` }} />
                      <div className="bar-label">{item.month}</div>
                    </div>
                  ))}
                </div>
              </article>

              <article className="chart-card">
                <h3 className="chart-title">Recent Activity</h3>
                {dashboardActivity.map((item) => (
                  <div className="activity-item activity-feed-item" key={item.title}>
                    <div className={`activity-dot ${item.accent}`.trim()} />
                    <div>
                      <div className="activity-text">{item.title}</div>
                      <div className="activity-time">{item.meta}</div>
                    </div>
                  </div>
                ))}
              </article>
            </div>
          </section>

          <section className="page-panel">
            <div className="grid-2">
              <div>
                <div className="section-head">
                  <div className="section-title">Top Selling Products</div>
                  <button className="btn btn-secondary small-btn" type="button">
                    View All
                  </button>
                </div>
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Bags Sold</th>
                        <th>Revenue</th>
                        <th>vs Target</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topSellingProducts.map((row) => (
                        <tr key={row[0]}>
                          <td className="primary">{row[0]}</td>
                          <td>{row[1]}</td>
                          <td>{row[2]}</td>
                          <td>
                            <span className={`badge badge-${row[4]}`}>{row[3]}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <div className="section-head">
                  <div className="section-title">Warehouse Capacity</div>
                </div>
                <div className="chart-card">
                  {warehouseCapacity.map((row) => (
                    <div className="stat-row" key={row[0]}>
                      <div className="stat-row-track">
                        <div className="stat-row-label">{row[0]}</div>
                        <div className="progress-bar">
                          <div className={`progress-fill ${row[2] === "default" ? "" : row[2]}`.trim()} style={{ width: `${row[1]}%` }} />
                        </div>
                      </div>
                      <div className="stat-row-value">{row[1]}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      ) : null}

      {moduleTable ? (
        <section className="page-panel">
          {moduleConfig?.alerts?.map((alert) => (
            <div className={`alert alert-${alert.accent}`.trim()} key={alert.text}>
              {alert.text}
            </div>
          ))}

          <div className="section-head">
            <div className="section-title">{moduleConfig?.title ?? moduleTable.title}</div>
            {moduleConfig?.actions ? (
              <div className="module-actions">
                {moduleConfig.actions.map((action) => (
                  action.href ? (
                    <Link
                      className={`btn ${action.variant === "primary" ? "btn-primary" : "btn-secondary"}`}
                      href={action.href}
                      key={action.label}
                      rel={action.newTab ? "noreferrer" : undefined}
                      target={action.newTab ? "_blank" : undefined}
                    >
                      {action.label}
                    </Link>
                  ) : (
                    <button className={`btn ${action.variant === "primary" ? "btn-primary" : "btn-secondary"}`} key={action.label} type="button">
                      {action.label}
                    </button>
                  )
                ))}
              </div>
            ) : null}
          </div>

          {moduleConfig?.tabs ? (
            <div className="tabs">
              {moduleConfig.tabs.map((tab, index) => (
                <div className={`tab ${index === 0 ? "active" : ""}`.trim()} key={tab}>
                  {tab}
                </div>
              ))}
            </div>
          ) : null}

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  {moduleTable.headers.map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {moduleTable.rows.map((row) => (
                  <tr key={row.join("-")}>
                    {row.map((cell, index) => (
                      <td className={index < 2 ? "primary" : undefined} key={`${cell}-${index}`}>
                        {renderStatusCell(cell, index === row.length - 1)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}
    </>
  );
}
