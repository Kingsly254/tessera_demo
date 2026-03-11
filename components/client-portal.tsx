"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Bell,
  ChevronRight,
  CircleUserRound,
  House,
  ListCollapse,
  PanelLeftClose,
  PanelLeftOpen,
  PackagePlus,
  ReceiptText,
  Search,
  Sprout,
  Truck,
} from "lucide-react";
import {
  clientOrderCatalog,
  clientAccountRows,
  clientDeliveryRows,
  clientOrderRows,
  clientPortalPages,
} from "@/data/erp-demo";

type ClientPortalProps = {
  pageId: string;
};

function getPortalHref(id: string) {
  return id === "overview" ? "/portal" : `/portal/${id}`;
}

const portalIconMap = {
  overview: House,
  "new-order": PackagePlus,
  orders: ReceiptText,
  deliveries: Truck,
  account: CircleUserRound,
} as const;

const portalNotifications = [
  { title: "Dispatch DSP-4401 is scheduled for tomorrow morning", meta: "Delivery | 20 min ago", accent: "teal" },
  { title: "Your latest order is awaiting commercial confirmation", meta: "Orders | 47 min ago", accent: "amber" },
  { title: "Updated customer statement is now available", meta: "Account | 2 hrs ago", accent: "" },
] as const;

export function ClientPortal({ pageId }: ClientPortalProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const page = clientPortalPages.find((entry) => entry.id === pageId) ?? clientPortalPages[0];
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrderNumber, setSubmittedOrderNumber] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(clientOrderCatalog.map((item) => [item.id, 0])),
  );
  const [deliveryForm, setDeliveryForm] = useState({
    county: "Kiambu",
    date: "2026-03-12",
    address: "Sunrise Poultry Farm, Ruiru",
    contact: "+254 700 123 456",
    payment: "Credit Account",
  });

  const selectedItems = clientOrderCatalog.filter((item) => quantities[item.id] > 0);
  const subtotal = selectedItems.reduce((sum, item) => sum + item.price * quantities[item.id], 0);
  const vat = Math.round(subtotal * 0.16);
  const total = subtotal + vat;

  useEffect(() => {
    const savedState = window.localStorage.getItem("agrifeed-portal-collapsed");
    if (savedState === "true") {
      setIsCollapsed(true);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("agrifeed-portal-collapsed", String(isCollapsed));
  }, [isCollapsed]);

  useEffect(() => {
    const savedDensity = window.localStorage.getItem("agrifeed-portal-compact");
    if (savedDensity === "true") {
      setIsCompact(true);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("agrifeed-portal-compact", String(isCompact));
  }, [isCompact]);

  function changeQty(id: string, delta: number) {
    setQuantities((current) => ({
      ...current,
      [id]: Math.max(0, (current[id] ?? 0) + delta),
    }));
  }

  function resetOrderFlow() {
    setStep(1);
    setIsSubmitting(false);
    setSubmittedOrderNumber(null);
    setSubmitError(null);
    setQuantities(Object.fromEntries(clientOrderCatalog.map((item) => [item.id, 0])));
  }

  async function submitOrder() {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: "Mary Kamau",
          customerEmail: "client.demo@agrifeed.app",
          customerPhone: deliveryForm.contact,
          companyName: "Sunrise Poultry Farm",
          county: deliveryForm.county,
          deliveryDate: deliveryForm.date,
          deliveryAddress: deliveryForm.address,
          contactPerson: "Mary Kamau",
          paymentMethod: deliveryForm.payment,
          subtotalAmount: subtotal,
          vatAmount: vat,
          totalAmount: total,
          items: selectedItems.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: quantities[item.id],
          })),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.message ?? "Failed to submit order.");
      }

      setSubmittedOrderNumber(result.orderNumber ?? null);
      setStep(4);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Failed to submit order.");
    } finally {
      setIsSubmitting(false);
    }
  }

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
              <div className="logo-sub">Client Workspace</div>
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

        <div className="sidebar-section">
          <div className="sidebar-label">Customer Workspace</div>
          {clientPortalPages.map((item) => (
            <Link className={`nav-item ${page.id === item.id ? "active" : ""}`} href={getPortalHref(item.id)} key={item.id}>
              <span className="nav-icon">
                {(() => {
                  const Icon = portalIconMap[item.id as keyof typeof portalIconMap] ?? House;
                  return <Icon size={16} strokeWidth={1.9} />;
                })()}
              </span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="sidebar-bottom">
          <div className="user-card">
            <div className="user-avatar">MK</div>
            <div className="user-info">
              <div className="user-name">Mary Kamau</div>
              <div className="user-role">Sunrise Poultry Farm</div>
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
              <span>Client Workspace</span>
            </div>
            <div className="page-heading">
              <div className="breadcrumb-trail">
                <span>AgriFeed</span>
                <ChevronRight size={12} strokeWidth={1.8} />
                <span>Client Workspace</span>
                <ChevronRight size={12} strokeWidth={1.8} />
                <span>{page.label}</span>
              </div>
              <div className="page-title">{page.label}</div>
              <div className="page-subtitle">{page.intro}</div>
              <div className="page-subtitle">
                Client portal priority: orders, deliveries, account visibility, and self-service history.
              </div>
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
              <span className="notification-count">{portalNotifications.length}</span>
            </button>
            <Link className="btn btn-primary" href="/">
              Logout
            </Link>
            <Link className="btn btn-secondary" href="/">
              Company site
            </Link>
            <div className="search-box">
              <Search size={14} strokeWidth={1.9} />
              <span>Search orders...</span>
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
              {portalNotifications.map((item) => (
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

        <section className="page-panel">
          <div className="kpi-grid">
            {page.kpis.map((kpi) => {
              const accent = "accent" in kpi ? kpi.accent : undefined;

              return (
                <article className={`kpi-card ${accent ?? ""}`.trim()} key={kpi.label}>
                <div className="kpi-label">{kpi.label}</div>
                <div className="kpi-value">{kpi.value}</div>
                <div className="kpi-sub">{kpi.subtext}</div>
                </article>
              );
            })}
          </div>
        </section>

        {page.id === "overview" ? (
          <section className="page-panel">
            <div className="grid-2">
              <article className="dashboard-card">
                <h3>Recent Orders</h3>
                <div className="summary-list">
                  {clientOrderRows.map((row) => (
                    <div className="summary-item" key={row[0]}>
                      <div className="summary-title">{row[0]}</div>
                      <div className="summary-meta">{row[1]} - {row[2]} - {row[4]}</div>
                    </div>
                  ))}
                </div>
              </article>

              <article className="dashboard-card">
                <h3>Upcoming Deliveries</h3>
                <div className="summary-list">
                  {clientDeliveryRows.map((row) => (
                    <div className="summary-item" key={row[0]}>
                      <div className="summary-title">{row[0]}</div>
                      <div className="summary-meta">{row[1]} - {row[2]} - {row[5]}</div>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </section>
        ) : null}

        {page.id === "new-order" ? (
          <>
            <section className="page-panel">
              <div className="section-head">
                <div>
                  <h2 className="section-title">Order Builder</h2>
                  <div className="table-caption">Create a fresh feed order for your farm or business account.</div>
                </div>
              </div>

              <div className="summary-list" style={{ marginBottom: "18px" }}>
                <div className="summary-item">
                  <div className="summary-title">Step {step} of 4</div>
                  <div className="summary-meta">
                    {step === 1 && "Choose products and quantities."}
                    {step === 2 && "Add delivery and receiving details."}
                    {step === 3 && "Review the order before submission."}
                    {step === 4 && "Order submitted successfully."}
                  </div>
                </div>
              </div>

              {step === 1 ? (
                <div className="summary-list">
                  {clientOrderCatalog.map((item) => (
                    <div className="summary-item" key={item.id}>
                      <div className="summary-title">{item.name}</div>
                      <div className="summary-meta">{item.description}</div>
                      <div className="topbar-actions">
                        <span className="pill">KES {item.price}/bag</span>
                        <button className="btn btn-secondary" onClick={() => changeQty(item.id, -1)} type="button">
                          -
                        </button>
                        <span className="small">Qty: {quantities[item.id]}</span>
                        <button className="btn btn-primary" onClick={() => changeQty(item.id, 1)} type="button">
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

              {step === 2 ? (
                <div className="summary-list">
                  <div className="field-grid">
                    <input
                      onChange={(event) => setDeliveryForm((current) => ({ ...current, county: event.target.value }))}
                      value={deliveryForm.county}
                    />
                    <input
                      onChange={(event) => setDeliveryForm((current) => ({ ...current, date: event.target.value }))}
                      type="date"
                      value={deliveryForm.date}
                    />
                  </div>
                  <input
                    onChange={(event) => setDeliveryForm((current) => ({ ...current, address: event.target.value }))}
                    value={deliveryForm.address}
                  />
                  <input
                    onChange={(event) => setDeliveryForm((current) => ({ ...current, contact: event.target.value }))}
                    value={deliveryForm.contact}
                  />
                  <select
                    onChange={(event) => setDeliveryForm((current) => ({ ...current, payment: event.target.value }))}
                    value={deliveryForm.payment}
                  >
                    <option>Credit Account</option>
                    <option>Cash on Delivery</option>
                    <option>M-Pesa</option>
                    <option>Bank Transfer</option>
                  </select>
                </div>
              ) : null}

              {step === 3 ? (
                <div className="grid-2">
                  <article className="dashboard-card">
                    <h3>Order Review</h3>
                    <div className="summary-list">
                      {selectedItems.map((item) => (
                        <div className="summary-item" key={item.id}>
                          <div className="summary-title">
                            {item.name} x {quantities[item.id]}
                          </div>
                          <div className="summary-meta">KES {(item.price * quantities[item.id]).toLocaleString()}</div>
                        </div>
                      ))}
                    </div>
                  </article>
                  <article className="dashboard-card">
                    <h3>Delivery & Charges</h3>
                    <div className="summary-list">
                      <div className="summary-item">
                        <div className="summary-title">County</div>
                        <div className="summary-meta">{deliveryForm.county}</div>
                      </div>
                      <div className="summary-item">
                        <div className="summary-title">Delivery Date</div>
                        <div className="summary-meta">{deliveryForm.date}</div>
                      </div>
                      <div className="summary-item">
                        <div className="summary-title">Payment</div>
                        <div className="summary-meta">{deliveryForm.payment}</div>
                      </div>
                      <div className="summary-item">
                        <div className="summary-title">Total</div>
                        <div className="summary-meta">
                          KES {subtotal.toLocaleString()} + VAT KES {vat.toLocaleString()} = KES {total.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              ) : null}

              {step === 4 ? (
                <div className="dashboard-card">
                  <h3>Order Submitted</h3>
                  <div className="summary-list">
                    <div className="summary-item">
                      <div className="summary-title">Reference</div>
                      <div className="summary-meta">{submittedOrderNumber ?? "Pending confirmation"}</div>
                    </div>
                    <div className="summary-item">
                      <div className="summary-title">Next step</div>
                      <div className="summary-meta">Sales and dispatch teams will confirm scheduling and release.</div>
                    </div>
                    {submitError ? (
                      <div className="summary-item">
                        <div className="summary-title">Submission error</div>
                        <div className="summary-meta">{submitError}</div>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null}

              {submitError && step < 4 ? (
                <div className="summary-item" style={{ marginTop: "12px" }}>
                  <div className="summary-title">Submission error</div>
                  <div className="summary-meta">{submitError}</div>
                </div>
              ) : null}

              <div className="topbar-actions" style={{ marginTop: "18px" }}>
                {step > 1 && step < 4 ? (
                  <button className="btn btn-secondary" onClick={() => setStep((current) => (current - 1) as 1 | 2 | 3)} type="button">
                    Back
                  </button>
                ) : null}
                {step === 1 ? (
                  <button className="btn btn-primary" disabled={selectedItems.length === 0} onClick={() => setStep(2)} type="button">
                    Continue to delivery
                  </button>
                ) : null}
                {step === 2 ? (
                  <button className="btn btn-primary" onClick={() => setStep(3)} type="button">
                    Review order
                  </button>
                ) : null}
                {step === 3 ? (
                  <button className="btn btn-primary" disabled={isSubmitting} onClick={submitOrder} type="button">
                    {isSubmitting ? "Submitting..." : "Submit order"}
                  </button>
                ) : null}
                {step === 4 ? (
                  <>
                    <Link className="btn btn-secondary" href="/portal/orders">
                      View orders
                    </Link>
                    <button className="btn btn-primary" onClick={resetOrderFlow} type="button">
                      Place another
                    </button>
                  </>
                ) : null}
              </div>
            </section>

            {selectedItems.length > 0 && step < 4 ? (
              <section className="page-panel">
                <div className="section-head">
                  <div>
                    <h2 className="section-title">Order Summary</h2>
                    <div className="table-caption">Live estimate based on selected products.</div>
                  </div>
                </div>
                <div className="summary-list">
                  <div className="summary-item">
                    <div className="summary-title">Items selected</div>
                    <div className="summary-meta">{selectedItems.map((item) => `${item.name} x ${quantities[item.id]}`).join(", ")}</div>
                  </div>
                  <div className="summary-item">
                    <div className="summary-title">Subtotal</div>
                    <div className="summary-meta">KES {subtotal.toLocaleString()}</div>
                  </div>
                  <div className="summary-item">
                    <div className="summary-title">VAT</div>
                    <div className="summary-meta">KES {vat.toLocaleString()}</div>
                  </div>
                  <div className="summary-item">
                    <div className="summary-title">Estimated Total</div>
                    <div className="summary-meta">KES {total.toLocaleString()}</div>
                  </div>
                </div>
              </section>
            ) : null}
          </>
        ) : null}

        {page.id === "orders" ? (
          <section className="page-panel">
            <div className="section-head">
              <div>
                <h2 className="section-title">Order History</h2>
                <div className="table-caption">Orders placed by Sunrise Poultry Farm.</div>
              </div>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {clientOrderRows.map((row) => (
                    <tr key={row[0]}>
                      <td className="primary">{row[0]}</td>
                      <td>{row[1]}</td>
                      <td>{row[2]}</td>
                      <td>{row[3]}</td>
                      <td>{row[4]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        {page.id === "deliveries" ? (
          <section className="page-panel">
            <div className="section-head">
              <div>
                <h2 className="section-title">Delivery Schedule</h2>
                <div className="table-caption">Current and recent dispatch visibility for your account.</div>
              </div>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Dispatch</th>
                    <th>Date</th>
                    <th>Destination</th>
                    <th>Window</th>
                    <th>Driver</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {clientDeliveryRows.map((row) => (
                    <tr key={row[0]}>
                      <td className="primary">{row[0]}</td>
                      <td>{row[1]}</td>
                      <td>{row[2]}</td>
                      <td>{row[3]}</td>
                      <td>{row[4]}</td>
                      <td>{row[5]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        {page.id === "account" ? (
          <section className="page-panel">
            <div className="grid-2">
              <article className="dashboard-card">
                <h3>Account Profile</h3>
                <div className="summary-list">
                  {clientAccountRows.map((row) => (
                    <div className="summary-item" key={row[0]}>
                      <div className="summary-title">{row[0]}</div>
                      <div className="summary-meta">{row[1]}</div>
                    </div>
                  ))}
                </div>
              </article>

              <article className="dashboard-card">
                <h3>Portal Actions</h3>
                <div className="summary-list">
                  <div className="summary-item">
                    <div className="summary-title">Request statement</div>
                    <div className="summary-meta">Email a customer statement and payment summary.</div>
                  </div>
                  <div className="summary-item">
                    <div className="summary-title">Contact sales</div>
                    <div className="summary-meta">Raise a reorder or dispatch question with the sales desk.</div>
                  </div>
                  <div className="summary-item">
                    <div className="summary-title">Update contacts</div>
                    <div className="summary-meta">Keep receiving phone numbers and site details current.</div>
                  </div>
                </div>
              </article>
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}
