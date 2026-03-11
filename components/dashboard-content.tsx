import Link from "next/link";
import {
  activityFeed,
  getDashboardPageById,
  inventoryRows,
  moduleHighlights,
  moduleTables,
  roleCards,
  salesChart,
  summaryCards,
} from "@/data/erp-demo";

type DashboardContentProps = {
  activePageId: string;
};

export function DashboardContent({ activePageId }: DashboardContentProps) {
  const activePage = getDashboardPageById(activePageId) ?? getDashboardPageById("dashboard");
  const highlights = moduleHighlights[activePage!.id] ?? moduleHighlights.dashboard;
  const moduleTable = moduleTables[activePage!.id];

  return (
    <>
      <section className="page-panel">
        <div className="kpi-grid">
          {activePage!.kpis.map((kpi) => (
            <article className={`kpi-card ${kpi.accent ?? ""}`.trim()} key={kpi.label}>
              <div className="kpi-label">{kpi.label}</div>
              <div className="kpi-value">{kpi.value}</div>
              <div className="kpi-sub">{kpi.subtext}</div>
              {kpi.change ? <div className="kpi-change">{kpi.change}</div> : null}
            </article>
          ))}
        </div>

        <div className="grid-2">
          <article className="dashboard-card">
            <h3>{activePage!.label} Focus Areas</h3>
            <div className="summary-list">
              {highlights.map((item) => (
                <div className="summary-item" key={item.title}>
                  <div className="summary-title">{item.title}</div>
                  <div className="summary-meta">{item.detail}</div>
                </div>
              ))}
            </div>
          </article>

          <article className="dashboard-card">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              {activityFeed.map((item) => (
                <div className="activity-item" key={item.title}>
                  <div className="activity-title">{item.title}</div>
                  <div className="activity-time">{item.meta}</div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      {activePage!.id === "dashboard" ? (
        <>
          <section className="page-panel">
            <div className="grid-2">
              <article className="chart-card">
                <h3 className="chart-title">Monthly Sales Demo</h3>
                <div className="bar-chart">
                  {salesChart.map((item) => (
                    <div className="bar-col" key={item.month}>
                      <div className={`bar ${item.accent ?? ""}`.trim()} style={{ height: `${item.height}%` }} />
                      <div className="bar-label">{item.month}</div>
                    </div>
                  ))}
                </div>
              </article>

              <article className="dashboard-card">
                <h3>Module Coverage</h3>
                <div className="summary-list">
                  {summaryCards.map((item) => (
                    <div className="summary-item" key={item.title}>
                      <div className="summary-title">{item.title}</div>
                      <div className="summary-meta">{item.meta}</div>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </section>

          <section className="page-panel">
            <div className="section-head">
              <div>
                <h2 className="section-title">Role Login Entry Points</h2>
                <div className="table-caption">Separate login screens for the demo personas you asked for.</div>
              </div>
            </div>

            <div className="role-grid">
              {roleCards.map((role) => (
                <article className="role-card" key={role.slug}>
                  <div className="mono">{role.icon}</div>
                  <div className="role-title">{role.title}</div>
                  <div className="role-copy">{role.summary}</div>
                  <div className="small" style={{ marginTop: "10px" }}>
                    {role.focus}
                  </div>
                  <footer style={{ marginTop: "18px" }}>
                    <Link className="btn btn-primary" href={`/login/${role.slug}`}>
                      Open login
                    </Link>
                  </footer>
                </article>
              ))}
            </div>
          </section>

          <section className="page-panel">
            <div className="section-head">
              <div>
                <h2 className="section-title">Inventory Snapshot</h2>
                <div className="table-caption">Starter data pulled from the original static prototype.</div>
              </div>
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Item Code</th>
                    <th>Item</th>
                    <th>Category</th>
                    <th>Warehouse</th>
                    <th>Qty</th>
                    <th>Reorder</th>
                    <th>Rate</th>
                    <th>Value</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryRows.map((row) => (
                    <tr key={row[0]}>
                      <td className="primary">{row[0]}</td>
                      <td className="primary">{row[1]}</td>
                      <td>{row[2]}</td>
                      <td>{row[3]}</td>
                      <td>{row[4]}</td>
                      <td>{row[5]}</td>
                      <td>{row[6]}</td>
                      <td>{row[7]}</td>
                      <td>
                        <span className={`badge ${row[8] === "Low Stock" ? "red" : "teal"}`}>{row[8]}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      ) : null}

      {moduleTable ? (
        <section className="page-panel">
          <div className="section-head">
            <div>
              <h2 className="section-title">{moduleTable.title}</h2>
              <div className="table-caption">{moduleTable.caption}</div>
            </div>
          </div>
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
                        {cell}
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
