"use client";

import Link from "next/link";
import {
  CreditCard,
  Minus,
  Plus,
  Receipt,
  ScanBarcode,
  Search,
  ShoppingBasket,
  Sprout,
} from "lucide-react";

const quickItems = [
  { name: "Layers Mash 70kg", price: "KES 300", sku: "AF-LM-70" },
  { name: "Dairy Meal 50kg", price: "KES 450", sku: "AF-DM-50" },
  { name: "Chick Mash 25kg", price: "KES 200", sku: "AF-CM-25" },
  { name: "Grower Mash 50kg", price: "KES 300", sku: "AF-GM-50" },
];

const liveReceipts = [
  ["POS-22014", "Walk-In Client", "Layers Mash x 6", "Cash", "KES 1,800"],
  ["POS-22013", "Walk-In Client", "Dairy Meal x 3", "M-Pesa", "KES 1,350"],
  ["POS-22012", "Kasarani Agrovet", "Chick Mash x 10", "Card", "KES 2,000"],
];

export function PosWorkspace() {
  return (
    <div className="shell dashboard-shell-view pos-view">
      <section className="section dashboard-stage">
        <div className="pos-shell">
          <header className="pos-header">
            <div className="logo-badge">
              <div className="logo-icon">
                <Sprout size={18} strokeWidth={2} />
              </div>
              <div>
                <div className="logo-text">AgriFeed POS</div>
                <div className="logo-sub">Retail Counter Workspace</div>
              </div>
            </div>

            <div className="pos-header-actions">
              <div className="search-box">
                <Search size={14} strokeWidth={1.9} />
                <span>Search SKU or receipt...</span>
              </div>
              <Link className="btn btn-secondary" href="/dashboard/pos" rel="noreferrer" target="_blank">
                POS Module
              </Link>
              <Link className="btn btn-primary" href="/">
                Logout
              </Link>
            </div>
          </header>

          <div className="pos-grid">
            <section className="chart-card">
              <div className="section-head">
                <div className="section-title">Quick Sale</div>
                <span className="badge badge-teal">Till Open</span>
              </div>

              <div className="summary-list">
                {quickItems.map((item) => (
                  <div className="summary-item pos-item" key={item.sku}>
                    <div>
                      <div className="summary-title">{item.name}</div>
                      <div className="summary-meta">{item.sku} | {item.price}</div>
                    </div>
                    <div className="pos-qty-actions">
                      <button className="btn btn-secondary" type="button">
                        <Minus size={14} />
                      </button>
                      <span className="pill">1</span>
                      <button className="btn btn-primary" type="button">
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="chart-card">
              <div className="section-head">
                <div className="section-title">Current Basket</div>
                <span className="badge badge-amber">Walk-In Sale</span>
              </div>

              <div className="summary-list">
                <div className="summary-item">
                  <div className="summary-title">Receipt</div>
                  <div className="summary-meta">POS-22015 | Retail Counter 1</div>
                </div>
                <div className="summary-item">
                  <div className="summary-title">Items</div>
                  <div className="summary-meta">Layers Mash x 2, Chick Mash x 4</div>
                </div>
                <div className="summary-item">
                  <div className="summary-title">Subtotal</div>
                  <div className="summary-meta">KES 1,400</div>
                </div>
                <div className="summary-item">
                  <div className="summary-title">VAT</div>
                  <div className="summary-meta">KES 224</div>
                </div>
                <div className="summary-item">
                  <div className="summary-title">Total</div>
                  <div className="summary-meta">KES 1,624</div>
                </div>
              </div>

              <div className="pos-payments">
                <button className="btn btn-secondary" type="button">
                  <CreditCard size={14} />
                  Card
                </button>
                <button className="btn btn-secondary" type="button">
                  <ScanBarcode size={14} />
                  M-Pesa
                </button>
                <button className="btn btn-primary" type="button">
                  <Receipt size={14} />
                  Complete Sale
                </button>
              </div>
            </section>
          </div>

          <section className="page-panel">
            <div className="section-head">
              <div className="section-title">Recent Walk-In Receipts</div>
              <span className="table-caption">Direct counter-service sales posted through POS.</span>
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Receipt</th>
                    <th>Client</th>
                    <th>Items</th>
                    <th>Payment</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {liveReceipts.map((row) => (
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

          <section className="page-panel">
            <div className="kpi-grid">
              <article className="kpi-card">
                <div className="kpi-label">Till Sales Today</div>
                <div className="kpi-value">KES 184K</div>
                <div className="kpi-sub">Retail counters and dealer desk</div>
              </article>
              <article className="kpi-card teal">
                <div className="kpi-label">Receipts Posted</div>
                <div className="kpi-value">46</div>
                <div className="kpi-sub">Completed POS transactions</div>
              </article>
              <article className="kpi-card amber">
                <div className="kpi-label">Average Basket</div>
                <div className="kpi-value">KES 4,000</div>
                <div className="kpi-sub">Current day retail mix</div>
              </article>
              <article className="kpi-card">
                <div className="kpi-label">Top Channel</div>
                <div className="kpi-value">
                  <ShoppingBasket size={20} strokeWidth={1.9} />
                </div>
                <div className="kpi-sub">Walk-in retail counter</div>
              </article>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
