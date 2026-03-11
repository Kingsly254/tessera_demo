export type Accent = "default" | "amber" | "teal" | "red";

export type Kpi = {
  label: string;
  value: string;
  subtext: string;
  change?: string;
  accent?: Accent;
};

export type DashboardPage = {
  id: string;
  label: string;
  navSection: string;
  badge?: { text: string; accent?: "amber" | "red" };
  intro: string;
  kpis: Kpi[];
};

export type ModuleHighlight = {
  title: string;
  detail: string;
};

export type ModuleTable = {
  title: string;
  caption: string;
  headers: string[];
  rows: string[][];
};

export type DemoRole = "stock-manager" | "sales-agent" | "owner";

export const roleCards = [
  {
    slug: "stock-manager",
    title: "Stock Manager",
    icon: "INV",
    summary: "Track warehouse balances, reorder points, write-offs, and stock transfers.",
    focus: "Inventory, bin cards, stock ledger, supplier receipts",
  },
  {
    slug: "sales-agent",
    title: "Sales Agent",
    icon: "SAL",
    summary: "Create quotations, manage sales orders, reserve stock, and follow deliveries.",
    focus: "Leads, quotations, orders, route dispatch, payment follow-up",
  },
  {
    slug: "client",
    title: "Client",
    icon: "CLI",
    summary: "Review orders, statements, delivery status, and account interactions.",
    focus: "Self-service portal, invoices, order status, account history",
  },
  {
    slug: "owner",
    title: "Owner",
    icon: "OWN",
    summary: "See company-wide performance, approvals, margins, and operational exceptions.",
    focus: "Dashboards, approvals, profitability, alerts, executive controls",
  },
] as const;

export const roleDefaultModule: Record<DemoRole, string> = {
  "stock-manager": "inventory",
  "sales-agent": "sales",
  owner: "dashboard",
};

export const roleDashboardBriefs: Record<DemoRole, { title: string; detail: string }> = {
  "stock-manager": {
    title: "Operations priority",
    detail: "Lead with stock balances, stock ledger, procurement, and manufacturing readiness.",
  },
  "sales-agent": {
    title: "Commercial priority",
    detail: "Lead with sales orders, customers, pricing, and dispatch coordination.",
  },
  owner: {
    title: "Executive priority",
    detail: "Lead with company-wide KPIs, approvals, profitability, and operational exceptions.",
  },
};

export const roleActionLabels: Record<DemoRole, { overview: string; home: string }> = {
  "stock-manager": { overview: "Operations home", home: "Back to site" },
  "sales-agent": { overview: "Sales home", home: "Back to site" },
  owner: { overview: "Executive home", home: "Back to site" },
};

export const featureCards = [
  {
    title: "Inventory Control",
    copy: "Multi-warehouse balances, low-stock alerts, stock valuation, and traceable movements.",
  },
  {
    title: "Sales Flow",
    copy: "Quotation to cash walkthroughs, order approvals, dispatch visibility, and customer statements.",
  },
  {
    title: "Procurement",
    copy: "Requisitions, RFQs, purchase approvals, supplier scorecards, and inbound receiving.",
  },
  {
    title: "Owner Insights",
    copy: "Operational health metrics, exception reporting, role-based approvals, and margin snapshots.",
  },
] as const;

export const dashboardPages: DashboardPage[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    navSection: "Overview",
    intro: "Executive overview of inventory health, sales velocity, approvals, and operational workload.",
    kpis: [
      { label: "Total Stock Value", value: "KES 4.2M", subtext: "Across 6 warehouses", change: "Up 8.4% vs last month" },
      { label: "Pending Purchases", value: "12", subtext: "Orders awaiting approval", change: "3 new this week", accent: "amber" },
      { label: "Sales This Month", value: "KES 1.8M", subtext: "84 orders fulfilled", change: "Up 12.1% vs last month", accent: "teal" },
      { label: "Low Stock Alerts", value: "3", subtext: "Items below reorder level", change: "Needs immediate action", accent: "red" },
    ],
  },
  {
    id: "inventory",
    label: "Inventory Management",
    navSection: "Operations",
    badge: { text: "3", accent: "amber" },
    intro: "Item master visibility, warehouse balances, reorder thresholds, and valuation snapshots.",
    kpis: [
      { label: "SKU Count", value: "248", subtext: "Active feed products" },
      { label: "Low Stock Items", value: "3", subtext: "Require replenishment", accent: "red" },
      { label: "Avg Turnover", value: "21 days", subtext: "Fast-moving inventory", accent: "teal" },
      { label: "Cycle Count Accuracy", value: "97.8%", subtext: "Last 30 days", accent: "amber" },
    ],
  },
  {
    id: "stocks",
    label: "Stock Ledger",
    navSection: "Operations",
    intro: "Every stock-in and stock-out transaction across the warehouse network.",
    kpis: [
      { label: "Total Stock Units", value: "8,387", subtext: "Bags across all stores" },
      { label: "Transfers", value: "7", subtext: "In transit this week", accent: "amber" },
      { label: "Ledger Value", value: "KES 4.2M", subtext: "At current cost", accent: "teal" },
      { label: "Write-offs", value: "18", subtext: "Damaged or expired", accent: "red" },
    ],
  },
  {
    id: "procurement",
    label: "Procurement",
    navSection: "Operations",
    badge: { text: "5" },
    intro: "Demand capture through RFQ, supplier selection, and purchase approval workflow.",
    kpis: [
      { label: "Open RFQs", value: "5", subtext: "Awaiting supplier quotes" },
      { label: "Pending Approvals", value: "3", subtext: "Purchase orders", accent: "amber" },
      { label: "MTD Spend", value: "KES 680K", subtext: "Material purchases", accent: "teal" },
      { label: "Active Suppliers", value: "14", subtext: "Approved vendors" },
    ],
  },
  {
    id: "purchases",
    label: "Purchases",
    navSection: "Operations",
    intro: "Receiving, quality checks, supplier invoices, and procurement performance tracking.",
    kpis: [
      { label: "Receipts This Week", value: "17", subtext: "Completed GRNs" },
      { label: "Late Deliveries", value: "2", subtext: "Supplier exceptions", accent: "red" },
      { label: "Invoice Match Rate", value: "96%", subtext: "3-way match success", accent: "teal" },
      { label: "Avg Lead Time", value: "4.2 days", subtext: "From PO to receipt", accent: "amber" },
    ],
  },
  {
    id: "sales",
    label: "Sales Orders",
    navSection: "Commerce",
    badge: { text: "2", accent: "red" },
    intro: "Quotation, order booking, stock reservation, invoicing, and customer delivery tracking.",
    kpis: [
      { label: "Open Orders", value: "26", subtext: "Pending fulfillment" },
      { label: "Orders Ready", value: "9", subtext: "Available for dispatch", accent: "teal" },
      { label: "Credit Holds", value: "2", subtext: "Require owner review", accent: "red" },
      { label: "MTD Revenue", value: "KES 1.8M", subtext: "Booked order value", accent: "amber" },
    ],
  },
  {
    id: "distribution",
    label: "Distribution",
    navSection: "Commerce",
    intro: "Route planning, truck allocation, proof of delivery, and last-mile exception tracking.",
    kpis: [
      { label: "Scheduled Dispatches", value: "14", subtext: "Next 48 hours" },
      { label: "On-Time Delivery", value: "93%", subtext: "This month", accent: "teal" },
      { label: "Failed Deliveries", value: "1", subtext: "Needs re-route", accent: "red" },
      { label: "Fleet Utilization", value: "78%", subtext: "Available capacity", accent: "amber" },
    ],
  },
  {
    id: "drivers",
    label: "Drivers",
    navSection: "Commerce",
    intro: "Driver assignment, route readiness, proof of delivery status, and transport performance.",
    kpis: [
      { label: "Active Drivers", value: "12", subtext: "Assigned to current fleet" },
      { label: "Routes Today", value: "9", subtext: "Planned dispatch runs", accent: "teal" },
      { label: "Delivery Exceptions", value: "1", subtext: "Needs reassignment", accent: "red" },
      { label: "Avg Route Completion", value: "94%", subtext: "Monthly performance", accent: "amber" },
    ],
  },
  {
    id: "manufacturing",
    label: "Manufacturing",
    navSection: "Operations",
    intro: "Production planning, batch execution, raw material consumption, and output traceability.",
    kpis: [
      { label: "Open Work Orders", value: "18", subtext: "Queued for production" },
      { label: "Plant Utilization", value: "82%", subtext: "Current week", accent: "teal" },
      { label: "Batch Rejections", value: "1", subtext: "Quality hold", accent: "red" },
      { label: "Output Today", value: "96 MT", subtext: "Finished feed volume", accent: "amber" },
    ],
  },
  {
    id: "hr",
    label: "HR",
    navSection: "People",
    intro: "Staff records, leave approvals, payroll readiness, and departmental staffing visibility.",
    kpis: [
      { label: "Employees", value: "86", subtext: "Across plant, sales, and logistics" },
      { label: "Open Leave Requests", value: "6", subtext: "Awaiting action", accent: "amber" },
      { label: "Recruitment Openings", value: "3", subtext: "Driver and plant roles", accent: "teal" },
      { label: "Disciplinary Cases", value: "1", subtext: "Requires HR review", accent: "red" },
    ],
  },
  {
    id: "attendance",
    label: "Time Attendance",
    navSection: "People",
    intro: "Shift attendance, overtime, lateness monitoring, and payroll input capture.",
    kpis: [
      { label: "Clock-ins Today", value: "79", subtext: "Recorded before 8:00 AM" },
      { label: "Absent Staff", value: "4", subtext: "Across all locations", accent: "red" },
      { label: "Overtime Hours", value: "26", subtext: "This week", accent: "amber" },
      { label: "Attendance Rate", value: "95%", subtext: "Monthly average", accent: "teal" },
    ],
  },
  {
    id: "products",
    label: "Products",
    navSection: "Master Data",
    intro: "Item master definitions, packaging units, prices, and feed formulation references.",
    kpis: [
      { label: "Product Lines", value: "8", subtext: "Feed categories" },
      { label: "Active SKUs", value: "248", subtext: "Saleable items" },
      { label: "Price Lists", value: "4", subtext: "By region and segment", accent: "amber" },
      { label: "Recent Updates", value: "11", subtext: "Last 7 days", accent: "teal" },
    ],
  },
  {
    id: "suppliers",
    label: "Suppliers",
    navSection: "Master Data",
    intro: "Supplier profiles, approval status, negotiated terms, and performance scoring.",
    kpis: [
      { label: "Approved Suppliers", value: "14", subtext: "Ready for sourcing" },
      { label: "Contracts Expiring", value: "2", subtext: "Within 30 days", accent: "amber" },
      { label: "Blocked Vendors", value: "1", subtext: "Quality issue", accent: "red" },
      { label: "Avg Supplier Score", value: "89%", subtext: "Quality and lead time", accent: "teal" },
    ],
  },
  {
    id: "customers",
    label: "Customers",
    navSection: "Master Data",
    intro: "Customer accounts, credit controls, account statements, and service history.",
    kpis: [
      { label: "Active Customers", value: "128", subtext: "Trading this quarter" },
      { label: "Overdue Accounts", value: "7", subtext: "Require follow-up", accent: "red" },
      { label: "New Accounts", value: "12", subtext: "Last 30 days", accent: "teal" },
      { label: "Avg Collection", value: "22 days", subtext: "Receivables cycle", accent: "amber" },
    ],
  },
];

export const roleVisibleModules: Record<DemoRole, string[]> = {
  "stock-manager": ["dashboard", "inventory", "stocks", "procurement", "purchases", "manufacturing", "products", "suppliers"],
  "sales-agent": ["dashboard", "sales", "distribution", "drivers", "customers", "products"],
  owner: dashboardPages.map((page) => page.id),
};

export const moduleHighlights: Record<string, ModuleHighlight[]> = {
  dashboard: [
    { title: "Executive snapshot", detail: "Margin, stock risk, dispatch load, and pending approvals in one place." },
    { title: "Role-based access", detail: "Owner, client, sales, and stock manager demo personas." },
    { title: "Capability walkthrough", detail: "Use this route as the master overview during demos." },
  ],
  inventory: [
    { title: "Warehouse balances", detail: "See quantity on hand per location and reorder thresholds." },
    { title: "Valuation readiness", detail: "Keep demo-ready inventory value and movement snapshots." },
    { title: "Cycle count control", detail: "Track count accuracy and low-stock exceptions." },
  ],
  stocks: [
    { title: "Ledger traceability", detail: "Every stock movement ties back to a receiving, sale, or transfer." },
    { title: "Transfer visibility", detail: "Monitor inter-branch movement and in-transit balances." },
    { title: "Write-off review", detail: "Capture damaged and expired stock for management review." },
  ],
  procurement: [
    { title: "Demand capture", detail: "RFQs and requisitions flow into supplier selection." },
    { title: "Approvals", detail: "Owner and procurement approval points are visible in one screen." },
    { title: "Supplier response", detail: "Compare quote turnaround and negotiated terms." },
  ],
  purchases: [
    { title: "Receipt workflow", detail: "Goods receipt, invoice matching, and exception tracking." },
    { title: "Lead time tracking", detail: "Demo supplier performance by order-to-receipt cycle time." },
    { title: "Invoice control", detail: "Show 3-way match readiness before payment." },
  ],
  sales: [
    { title: "Order capture", detail: "Quotations convert into orders with stock reservation visibility." },
    { title: "Credit control", detail: "Flag customer orders that require owner approval." },
    { title: "Revenue tracking", detail: "Booked revenue and dispatch-ready orders stay visible." },
  ],
  distribution: [
    { title: "Route planning", detail: "Coordinate dispatch windows, truck allocation, and deliveries." },
    { title: "Proof of delivery", detail: "Track last-mile completion and failed-delivery exceptions." },
    { title: "Service level", detail: "Use on-time performance metrics in demos." },
  ],
  drivers: [
    { title: "Driver roster", detail: "Assign routes, monitor availability, and review completion rates." },
    { title: "Exception handling", detail: "Surface late departures and delivery disruptions quickly." },
    { title: "Transport linkage", detail: "Tie drivers directly to distribution and dispatch workflows." },
  ],
  manufacturing: [
    { title: "Batch planning", detail: "Work orders, BOM-style consumption, and output tracking." },
    { title: "Plant visibility", detail: "Show utilization, rejects, and current production load." },
    { title: "Traceability", detail: "Connect finished goods to raw materials and work orders." },
  ],
  hr: [
    { title: "People records", detail: "Department staffing, leave requests, and recruitment pipeline." },
    { title: "Approvals", detail: "Use HR workflows as part of the owner demo story." },
    { title: "Payroll readiness", detail: "Attendance and staff status feed payroll preparation." },
  ],
  attendance: [
    { title: "Clock-in tracking", detail: "Monitor who reported on time across plant and field teams." },
    { title: "Overtime control", detail: "Surface extra hours before payroll closes." },
    { title: "Absence alerts", detail: "Highlight staffing gaps that affect production or delivery." },
  ],
  products: [
    { title: "Product master", detail: "Maintain formulations, units, and commercial pack sizes." },
    { title: "Pricing", detail: "Demo regional price lists and recent product updates." },
    { title: "Category management", detail: "Keep feed families and SKUs organized for sales teams." },
  ],
  suppliers: [
    { title: "Supplier register", detail: "Approved vendors, terms, status, and performance scorecards." },
    { title: "Contract timing", detail: "Flag agreements nearing renewal or review." },
    { title: "Risk management", detail: "Block underperforming vendors while preserving sourcing history." },
  ],
  customers: [
    { title: "Account history", detail: "Statements, receivables, and service interactions by customer." },
    { title: "Collections", detail: "Monitor overdue accounts and collection cycle trends." },
    { title: "Growth tracking", detail: "New accounts and active customers support sales storytelling." },
  ],
};

export const inventoryRows = [
  ["ITM-0001", "Layers Mash 70kg", "Poultry Feed", "Nairobi Central", "1,420", "150", "KES 300", "KES 426,000", "In Stock"],
  ["ITM-0002", "Dairy Meal 50kg", "Livestock Feed", "Kisumu Hub", "42", "80", "KES 450", "KES 18,900", "Low Stock"],
  ["ITM-0003", "Grower Mash 50kg", "Poultry Feed", "Nakuru Depot", "680", "120", "KES 300", "KES 204,000", "In Stock"],
  ["ITM-0004", "Fish Meal 50kg", "Aquaculture", "Mombasa Port", "540", "60", "KES 700", "KES 378,000", "In Stock"],
];

export const moduleTables: Record<string, ModuleTable> = {
  inventory: {
    title: "Inventory Snapshot",
    caption: "Starter inventory records for demo walkthroughs.",
    headers: ["Item Code", "Item", "Category", "Warehouse", "Qty", "Reorder", "Rate", "Value", "Status"],
    rows: inventoryRows,
  },
  stocks: {
    title: "Stock Ledger",
    caption: "Illustrative stock movement log across warehouses.",
    headers: ["Date", "Voucher", "Reference", "Item", "Warehouse", "In", "Out", "Balance", "Rate"],
    rows: [
      ["10-Mar-2026", "Purchase Receipt", "PREC-0521", "Layers Mash 70kg", "Nairobi Central", "500", "-", "1,420", "KES 300"],
      ["10-Mar-2026", "Sales Delivery", "DN-0891", "Dairy Meal 50kg", "Kisumu Hub", "-", "80", "42", "KES 450"],
      ["09-Mar-2026", "Stock Transfer", "STE-0112", "Grower Mash 50kg", "Nakuru to Eldoret", "-", "120", "680", "KES 300"],
    ],
  },
  procurement: {
    title: "RFQ Pipeline",
    caption: "High-level procurement activity for the demo.",
    headers: ["Req No", "Date", "Item", "Qty", "Supplier Stage", "Requested By", "Priority", "Status"],
    rows: [
      ["PR-2026-0031", "10 Mar 2026", "Dairy Meal 50kg", "500", "RFQ Sent", "J. Odhiambo", "Urgent", "Pending Quote"],
      ["PR-2026-0030", "09 Mar 2026", "Chick Mash 25kg", "300", "Approval", "A. Wanjiku", "Urgent", "Pending Approval"],
      ["PR-2026-0029", "08 Mar 2026", "Maize Germ", "200", "Ordered", "M. Kiprop", "Medium", "Ordered"],
    ],
  },
  purchases: {
    title: "Purchase Receipts",
    caption: "Goods receipt and invoice-matching examples.",
    headers: ["Receipt", "Supplier", "Date", "Items", "Invoice", "Match", "Amount", "Status"],
    rows: [
      ["GRN-2201", "Nairobi Grains", "10 Mar 2026", "4", "INV-9931", "3-way", "KES 420,000", "Matched"],
      ["GRN-2200", "Lake Feeds RM", "09 Mar 2026", "2", "INV-9930", "2-way", "KES 185,000", "Pending"],
      ["GRN-2198", "Protein Source Ltd", "08 Mar 2026", "3", "INV-9922", "3-way", "KES 268,000", "Approved"],
    ],
  },
  sales: {
    title: "Open Sales Orders",
    caption: "Sales and credit-control demo records.",
    headers: ["Order", "Customer", "Date", "Items", "Amount", "Credit", "Dispatch", "Status"],
    rows: [
      ["SO-8121", "Green Valley Layers", "10 Mar 2026", "3", "KES 82,400", "Clear", "Ready", "Confirmed"],
      ["SO-8118", "Sunrise Dairy Co-op", "09 Mar 2026", "2", "KES 61,000", "Hold", "Pending", "Credit Review"],
      ["SO-8110", "Rift Poultry Hub", "08 Mar 2026", "5", "KES 148,500", "Clear", "Assigned", "In Fulfillment"],
    ],
  },
  distribution: {
    title: "Dispatch Board",
    caption: "Delivery planning and route execution sample.",
    headers: ["Dispatch", "Route", "Truck", "Driver", "Stops", "Window", "Load", "Status"],
    rows: [
      ["DSP-4401", "Nairobi North", "KDE 214A", "P. Mwangi", "6", "08:00-12:00", "82%", "Loading"],
      ["DSP-4400", "Nakuru East", "KDC 783M", "J. Kiptoo", "4", "09:00-15:00", "76%", "In Transit"],
      ["DSP-4398", "Kiambu West", "KDG 112R", "S. Njeri", "5", "07:30-11:30", "91%", "Delivered"],
    ],
  },
  drivers: {
    title: "Driver Schedule",
    caption: "Driver assignments linked to active dispatches.",
    headers: ["Driver", "Vehicle", "Route", "Shift", "Trips", "POD Rate", "Status"],
    rows: [
      ["Peter Mwangi", "KDE 214A", "Nairobi North", "Day", "3", "98%", "Assigned"],
      ["Jane Kiptoo", "KDC 783M", "Nakuru East", "Day", "2", "95%", "On Route"],
      ["Samuel Njeri", "KDG 112R", "Kiambu West", "Day", "4", "100%", "Available"],
    ],
  },
  manufacturing: {
    title: "Production Orders",
    caption: "Manufacturing and batch execution examples.",
    headers: ["WO", "Product", "Batch", "Planned Qty", "Completed", "Line", "QC", "Status"],
    rows: [
      ["WO-3011", "Layers Mash 70kg", "BT-8821", "1,200 bags", "820 bags", "Line 2", "Passed", "Running"],
      ["WO-3010", "Dairy Meal 50kg", "BT-8818", "800 bags", "800 bags", "Line 1", "Passed", "Completed"],
      ["WO-3008", "Chick Mash 25kg", "BT-8811", "600 bags", "420 bags", "Line 3", "Hold", "QC Review"],
    ],
  },
  hr: {
    title: "HR Workbench",
    caption: "People management snapshots for demos.",
    headers: ["Employee", "Department", "Location", "Status", "Leave", "Manager", "Next Action"],
    rows: [
      ["Lilian Njeri", "Sales", "Nairobi", "Active", "0", "P. Mwangi", "Quarter review"],
      ["John Kiptoo", "Logistics", "Nakuru", "Active", "2 days", "A. Kamau", "Approve overtime"],
      ["Agnes Wambui", "Production", "Nairobi", "Probation", "0", "M. Otieno", "Confirm onboarding"],
    ],
  },
  attendance: {
    title: "Attendance Log",
    caption: "Clock-in and overtime sample data.",
    headers: ["Employee", "Department", "Shift", "Clock In", "Clock Out", "OT Hours", "Status"],
    rows: [
      ["Lilian Njeri", "Sales", "Day", "07:42", "17:10", "0.5", "Present"],
      ["John Kiptoo", "Logistics", "Day", "07:58", "18:30", "1.5", "Present"],
      ["Agnes Wambui", "Production", "Day", "-", "-", "0", "Absent"],
    ],
  },
  products: {
    title: "Product Master",
    caption: "Commercial and master-data examples.",
    headers: ["SKU", "Name", "Category", "Pack", "Price List", "Warehouse", "Status"],
    rows: [
      ["ITM-0001", "Layers Mash", "Poultry", "70kg", "Nairobi Retail", "Central", "Active"],
      ["ITM-0002", "Dairy Meal", "Livestock", "50kg", "Upcountry Bulk", "Kisumu", "Active"],
      ["ITM-0003", "Broiler Finisher", "Poultry", "50kg", "Distributor", "Nakuru", "Active"],
    ],
  },
  suppliers: {
    title: "Supplier Register",
    caption: "Supplier management data used in procurement demos.",
    headers: ["Supplier", "Category", "Terms", "Lead Time", "Score", "Contract", "Status"],
    rows: [
      ["Nairobi Grains", "Maize", "30 days", "3 days", "92%", "Jun 2026", "Approved"],
      ["Protein Source Ltd", "Fishmeal", "14 days", "5 days", "88%", "Sep 2026", "Approved"],
      ["Lake Feeds RM", "Premix", "Cash", "2 days", "71%", "Apr 2026", "Review"],
    ],
  },
  customers: {
    title: "Customer Accounts",
    caption: "Customer and receivables examples.",
    headers: ["Customer", "Segment", "County", "Credit Limit", "Balance", "Last Order", "Status"],
    rows: [
      ["Green Valley Layers", "Farm", "Kiambu", "KES 150,000", "KES 21,000", "10 Mar 2026", "Active"],
      ["Sunrise Dairy Co-op", "Co-op", "Nakuru", "KES 350,000", "KES 82,000", "09 Mar 2026", "Credit Hold"],
      ["Rift Poultry Hub", "Distributor", "Uasin Gishu", "KES 500,000", "KES 0", "08 Mar 2026", "Active"],
    ],
  },
};

export function getDashboardPageById(id: string) {
  return dashboardPages.find((page) => page.id === id);
}

export const clientPortalPages = [
  {
    id: "overview",
    label: "Overview",
    intro: "Track your recent orders, deliveries, balances, and account activity.",
    kpis: [
      { label: "Open Orders", value: "3", subtext: "Awaiting dispatch or delivery", accent: "amber" as const },
      { label: "Delivered This Month", value: "12", subtext: "Completed farm deliveries", accent: "teal" as const },
      { label: "Outstanding Balance", value: "KES 21,000", subtext: "Current receivable status", accent: "red" as const },
      { label: "Credit Limit", value: "KES 150,000", subtext: "Approved customer facility" },
    ],
  },
  {
    id: "new-order",
    label: "Place Order",
    intro: "Build a new order, choose delivery details, and submit it for processing.",
    kpis: [
      { label: "Available Products", value: "6", subtext: "Ready for portal ordering" },
      { label: "Lead Time", value: "1-2 days", subtext: "Typical order to delivery window", accent: "amber" as const },
      { label: "Payment Mode", value: "Credit / Cash", subtext: "Based on account profile", accent: "teal" as const },
      { label: "Dispatch Cutoff", value: "11:00 AM", subtext: "For same-day Nairobi planning" },
    ],
  },
  {
    id: "orders",
    label: "My Orders",
    intro: "Review order history, statuses, quantities, and estimated delivery timing.",
    kpis: [
      { label: "Orders This Quarter", value: "18", subtext: "Placed through sales and portal channels" },
      { label: "In Fulfillment", value: "2", subtext: "Allocated and preparing dispatch", accent: "amber" as const },
      { label: "Delivered", value: "14", subtext: "Completed successfully", accent: "teal" as const },
      { label: "Pending Approval", value: "1", subtext: "Sales review in progress", accent: "red" as const },
    ],
  },
  {
    id: "deliveries",
    label: "Deliveries",
    intro: "Follow dispatch windows, delivery routes, and proof-of-delivery updates.",
    kpis: [
      { label: "Scheduled Deliveries", value: "2", subtext: "Within the next 72 hours", accent: "amber" as const },
      { label: "Last POD Rate", value: "100%", subtext: "Successful proof of delivery capture", accent: "teal" as const },
      { label: "Delayed Deliveries", value: "0", subtext: "No active customer exceptions" },
      { label: "Primary Route", value: "Kiambu North", subtext: "Most frequent delivery zone" },
    ],
  },
  {
    id: "account",
    label: "My Account",
    intro: "See account profile, contact details, limits, and statement summary.",
    kpis: [
      { label: "Account Status", value: "Active", subtext: "Approved for portal ordering", accent: "teal" as const },
      { label: "Primary Contact", value: "Mary Kamau", subtext: "Authorized account user" },
      { label: "Credit Terms", value: "30 Days", subtext: "Current customer agreement", accent: "amber" as const },
      { label: "Overdue Amount", value: "KES 0", subtext: "No overdue invoices" },
    ],
  },
] as const;

export const clientOrderCatalog = [
  { id: "layers", name: "Layers Mash 70kg", price: 300, description: "High-calcium poultry feed for laying hens." },
  { id: "dairy", name: "Dairy Meal 50kg", price: 450, description: "Balanced energy and protein blend for dairy herds." },
  { id: "chick", name: "Chick Mash 25kg", price: 200, description: "Starter feed for day-old chicks through early growth." },
  { id: "beef", name: "Beef Finisher 50kg", price: 480, description: "Energy-dense finishing ration for beef cattle." },
  { id: "grower", name: "Grower Mash 50kg", price: 300, description: "Growing ration for pigs with strong feed conversion." },
  { id: "broiler", name: "Broiler Finisher 50kg", price: 320, description: "Finisher feed for broiler operations near slaughter stage." },
] as const;

export const clientOrderRows = [
  ["AF-2026-0581", "10 Mar 2026", "Layers Mash x 50", "KES 19,200", "Delivered"],
  ["AF-2026-0540", "03 Mar 2026", "Dairy Meal x 30", "KES 16,200", "Delivered"],
  ["AF-2026-0498", "24 Feb 2026", "Layers Mash x 100", "KES 52,500", "In Fulfillment"],
];

export const clientDeliveryRows = [
  ["DSP-4401", "11 Mar 2026", "Kiambu", "08:00-12:00", "Peter Mwangi", "Scheduled"],
  ["DSP-4398", "08 Mar 2026", "Ruiru", "07:30-11:30", "Samuel Njeri", "Delivered"],
  ["DSP-4388", "01 Mar 2026", "Limuru", "09:00-13:00", "Jane Kiptoo", "Delivered"],
];

export const clientAccountRows = [
  ["Business Name", "Sunrise Poultry Farm"],
  ["County", "Kiambu"],
  ["Primary Contact", "Mary Kamau"],
  ["Phone", "+254 700 123 456"],
  ["Email", "mary@sunrisepoultry.co.ke"],
  ["Credit Limit", "KES 150,000"],
];

export const salesChart = [
  { month: "Aug", height: 55 },
  { month: "Sep", height: 70 },
  { month: "Oct", height: 60 },
  { month: "Nov", height: 80 },
  { month: "Dec", height: 65 },
  { month: "Jan", height: 90 },
  { month: "Feb", height: 75 },
  { month: "Mar", height: 85, accent: "amber" as const },
];

export const activityFeed = [
  { title: "Purchase requisition PR-2024-0031 submitted for Dairy Meal 50kg", meta: "10 minutes ago - Procurement" },
  { title: "Delivery note DN-0891 marked in transit to Kisumu Hub", meta: "32 minutes ago - Distribution" },
  { title: "Low stock alert triggered for Chick Mash 25kg at Eldoret Branch", meta: "1 hour ago - Inventory" },
  { title: "Client statement generated for Green Valley Layers Ltd", meta: "Today - Accounts" },
];

export const summaryCards = [
  { title: "Demo roles", meta: "Stock manager, sales agent, client, owner" },
  { title: "Core workflows", meta: "Inventory, procurement, sales, distribution, master data" },
  { title: "Use case", meta: "Clickable demo for meetings, walkthroughs, and capability previews" },
];
