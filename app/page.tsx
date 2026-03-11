"use client";

import {
  BadgeCheck,
  BadgeDollarSign,
  Boxes,
  CircleGauge,
  ClipboardList,
  Egg,
  Factory,
  FlaskConical,
  HandCoins,
  Menu,
  MapPinned,
  Milk,
  X,
  PackageCheck,
  ShieldCheck,
  Sprout,
  Truck,
  Users,
  Wheat,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const productCards = [
  {
    icon: Egg,
    name: "Layers Mash",
    description: "High-calcium formulation for commercial laying hens and stronger egg output.",
    meta: "From KES 300/bag",
    tag: "70kg - Poultry",
  },
  {
    icon: Milk,
    name: "Dairy Meal",
    description: "Balanced energy and protein blend designed for better milk yields and body condition.",
    meta: "From KES 450/bag",
    tag: "50kg - Livestock",
  },
  {
    icon: Sprout,
    name: "Chick Mash",
    description: "Starter feed for day-old chicks through early growth with high protein support.",
    meta: "From KES 200/bag",
    tag: "25kg - Poultry",
  },
  {
    icon: CircleGauge,
    name: "Beef Finisher",
    description: "Energy-dense ration for faster weight gain in feedlot beef finishing.",
    meta: "From KES 480/bag",
    tag: "50kg - Livestock",
  },
  {
    icon: Wheat,
    name: "Grower Mash",
    description: "Complete growing diet for pig production with strong feed conversion ratios.",
    meta: "From KES 300/bag",
    tag: "50kg - Pigs",
  },
  {
    icon: Boxes,
    name: "Custom Formulation",
    description: "Bespoke feed blends designed by nutritionists for specific breeds or production systems.",
    meta: "Quote on request",
    tag: "Any size - Bespoke",
  },
] as const;

const whyCards = [
  {
    icon: FlaskConical,
    title: "Lab-Tested Quality",
    description: "Every batch is tested for moisture, protein, fibre, and aflatoxin before dispatch.",
  },
  {
    icon: Truck,
    title: "Reliable Delivery",
    description: "Same-day Nairobi dispatch and 24 to 48 hour upcountry delivery through our fleet.",
  },
  {
    icon: ShieldCheck,
    title: "Nutritionist Support",
    description: "Qualified animal nutritionists support feeding programs, ration balancing, and farm visits.",
  },
  {
    icon: HandCoins,
    title: "Flexible Credit Terms",
    description: "Approved clients can operate on structured credit while tracking balances digitally.",
  },
] as const;

const processSteps = [
  {
    number: "1",
    icon: ClipboardList,
    title: "Share Your Needs",
    description: "Tell us your livestock type, production goals, and expected monthly volumes.",
  },
  {
    number: "2",
    icon: BadgeCheck,
    title: "Place Your Order",
    description: "Confirm the right formulation, quantity, and delivery timing with our team.",
  },
  {
    number: "3",
    icon: Factory,
    title: "We Manufacture",
    description: "Production, quality checks, bagging, and release are tracked end to end.",
  },
  {
    number: "4",
    icon: Truck,
    title: "Fast Delivery",
    description: "Dispatch teams and drivers take orders to the farm gate with live status.",
  },
] as const;

const testimonials = [
  {
    quote: "We switched to AgriFeed Layers Mash and our egg production jumped noticeably within one cycle.",
    name: "Mary Kamau",
    role: "Layer Farm - Kiambu",
  },
  {
    quote: "The dairy meal and nutritionist support improved our milk volumes and consistency across the herd.",
    name: "John Otieno",
    role: "Dairy Cooperative - Nakuru",
  },
  {
    quote: "Ordering online is straightforward and dispatch updates make planning much easier for our farm team.",
    name: "Agnes Wanjiru",
    role: "Broiler Farm - Eldoret",
  },
] as const;

const counties = [
  "Nairobi",
  "Kiambu",
  "Nakuru",
  "Kisumu",
  "Uasin Gishu",
  "Mombasa",
  "Nyeri",
  "Meru",
  "Machakos",
  "Kericho",
  "Bungoma",
  "Kakamega",
] as const;

const operationalCapabilities = [
  {
    icon: Boxes,
    title: "Raw material planning",
    description: "Monitor ingredient stock, warehouse balances, and replenishment timing across facilities.",
  },
  {
    icon: Factory,
    title: "Batch production control",
    description: "Schedule runs, release work orders, and follow output quality through the plant.",
  },
  {
    icon: BadgeDollarSign,
    title: "Procurement oversight",
    description: "Coordinate supplier sourcing, approvals, and inbound material readiness before production starts.",
  },
  {
    icon: MapPinned,
    title: "Dispatch coordination",
    description: "Track county deliveries, routes, vehicles, and customer drop schedules with more discipline.",
  },
  {
    icon: PackageCheck,
    title: "Customer account service",
    description: "Keep statements, order history, and fulfilment visibility close to the commercial team.",
  },
  {
    icon: Users,
    title: "People and attendance",
    description: "Support plant staffing, shift readiness, and accountability across teams.",
  },
] as const;

const marqueeItems = [
  "Layers Mash",
  "Dairy Meal",
  "Chick Mash",
  "Grower Mash",
  "Quality Assurance",
  "Nationwide Delivery",
  "Nutritionist Support",
  "Bulk Supply",
] as const;

function BrandBadge({ light = false }: { light?: boolean }) {
  return (
    <div className={`brand-badge ${light ? "light" : ""}`.trim()}>
      <span className="brand-badge-mark">AF</span>
    </div>
  );
}

export default function HomePage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const nav = document.getElementById("site-nav");
    const onScroll = () => {
      nav?.classList.toggle("scrolled", window.scrollY > 40);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll(".fade-up").forEach((element) => observer.observe(element));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  function closeMobileNav() {
    setIsMobileNavOpen(false);
  }

  return (
    <div className="marketing-shell" ref={sectionRef}>
      <header className="site-nav" id="site-nav">
        <div className="marketing-container nav-inner">
          <Link className="brand-mark" href="/">
            <BrandBadge />
            <div>
              <div className="brand-name">AgriFeed Industries</div>
              <div className="brand-sub">Est. 2008 | Nairobi, Kenya</div>
            </div>
          </Link>

          <nav className="site-nav-links">
            <a href="#about">About</a>
            <a href="#products">Products</a>
            <a href="#capabilities">Operations</a>
            <a href="#coverage">Coverage</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="site-nav-actions">
            <Link className="site-btn site-btn-secondary" href="/login/client">
              Client Login
            </Link>
            <button
              aria-label={isMobileNavOpen ? "Close navigation" : "Open navigation"}
              className="mobile-nav-toggle"
              onClick={() => setIsMobileNavOpen((current) => !current)}
              type="button"
            >
              {isMobileNavOpen ? <X size={18} strokeWidth={2} /> : <Menu size={18} strokeWidth={2} />}
            </button>
          </div>
        </div>
        {isMobileNavOpen ? (
          <div className="marketing-container mobile-nav-panel">
            <nav className="mobile-nav-links">
              <a href="#about" onClick={closeMobileNav}>
                About
              </a>
              <a href="#products" onClick={closeMobileNav}>
                Products
              </a>
              <a href="#capabilities" onClick={closeMobileNav}>
                Operations
              </a>
              <a href="#coverage" onClick={closeMobileNav}>
                Coverage
              </a>
              <a href="#contact" onClick={closeMobileNav}>
                Contact
              </a>
            </nav>
            <div className="mobile-nav-cta">
              <Link className="site-btn site-btn-primary" href="/login/client" onClick={closeMobileNav}>
                Client Portal
              </Link>
              <Link className="site-btn site-btn-secondary" href="/dashboard" onClick={closeMobileNav}>
                View Dashboard
              </Link>
            </div>
          </div>
        ) : null}
      </header>

      <section className="marketing-hero">
        <div className="hero-backdrop" />
        <div className="marketing-container hero-grid">
          <div className="fade-up">
            <div className="hero-kicker">Kenya&apos;s trusted animal feed manufacturer</div>
            <h1 className="marketing-title">
              Nourishing Kenya&apos;s livestock, poultry, and the businesses behind them.
            </h1>
            <p className="marketing-copy">
              AgriFeed Industries manufactures premium animal feed for poultry, dairy, beef, piggery, and mixed-farm
              operations across Kenya. We combine nutritional science, dependable production, and disciplined delivery
              so farms, cooperatives, and distributors receive feed they can trust.
            </p>

            <div className="hero-actions">
              <Link className="site-btn site-btn-primary" href="/login/client">
                Client portal
              </Link>
              <Link className="site-btn site-btn-secondary" href="#products">
                View product range
              </Link>
            </div>

            <div className="hero-stats">
              <div>
                <strong>15+</strong>
                <span>Years in operation</span>
              </div>
              <div>
                <strong>40+</strong>
                <span>Counties served</span>
              </div>
              <div>
                <strong>1,200+</strong>
                <span>Active farm clients</span>
              </div>
              <div>
                <strong>98%</strong>
                <span>Delivery success rate</span>
              </div>
            </div>

            <div className="hero-mobile-stack fade-up">
              <div className="hero-aside-card">
                <span className="section-tag">Commercial Access</span>
                <h2>Client ordering and account visibility</h2>
                <p>Approved customers can place repeat orders, review account activity, and follow delivery progress.</p>
                <div className="hero-role-links">
                  <Link href="/login/client">Client Portal</Link>
                  <Link href="#contact">Talk to Sales</Link>
                  <Link href="#coverage">Delivery Reach</Link>
                  <Link href="#products">Product Range</Link>
                </div>
              </div>

              <div className="hero-ops-card">
                <div className="hero-ops-head">
                  <BrandBadge light />
                  <div>
                    <div className="hero-ops-title">Plant operations</div>
                    <div className="hero-ops-sub">Production and dispatch snapshot</div>
                  </div>
                </div>
                <div className="hero-ops-grid">
                  <div>
                    <strong>96 MT</strong>
                    <span>Output today</span>
                  </div>
                  <div>
                    <strong>82%</strong>
                    <span>Plant utilisation</span>
                  </div>
                  <div>
                    <strong>14</strong>
                    <span>Active suppliers</span>
                  </div>
                  <div>
                    <strong>6</strong>
                    <span>Dispatches queued</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="hero-aside">
            <div className="hero-aside-stack fade-up">
              <div className="hero-aside-card">
                <span className="section-tag">Commercial Access</span>
                <h2>Client ordering and account visibility</h2>
                <p>Approved customers can place repeat orders, review account activity, and follow delivery progress.</p>
                <div className="hero-role-links">
                  <Link href="/login/client">Client Portal</Link>
                  <Link href="#contact">Talk to Sales</Link>
                  <Link href="#coverage">Delivery Reach</Link>
                  <Link href="#products">Product Range</Link>
                </div>
              </div>

              <div className="hero-ops-card">
                <div className="hero-ops-head">
                  <BrandBadge light />
                  <div>
                    <div className="hero-ops-title">Plant operations</div>
                    <div className="hero-ops-sub">Production and dispatch snapshot</div>
                  </div>
                </div>
                <div className="hero-ops-grid">
                  <div>
                    <strong>96 MT</strong>
                    <span>Output today</span>
                  </div>
                  <div>
                    <strong>82%</strong>
                    <span>Plant utilisation</span>
                  </div>
                  <div>
                    <strong>14</strong>
                    <span>Active suppliers</span>
                  </div>
                  <div>
                    <strong>6</strong>
                    <span>Dispatches queued</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <div className="marquee-band">
        <div className="marquee-row">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </div>

      <section className="marketing-section" id="about">
        <div className="marketing-container two-column">
          <div className="story-card fade-up">
            <div className="story-pill">ISO 9001:2015</div>
            <div className="story-art">
              <div className="story-art-grid" />
              <div className="story-art-badge">
                <BrandBadge light />
              </div>
            </div>
            <div className="story-inner">
              <div className="story-kicker">Manufacturing Plant, Nairobi</div>
              <h2>Built on science, grown by trust.</h2>
              <p>
                AgriFeed Industries has formulated premium animal feeds since 2008, combining local expertise with
                nutritional science and dependable distribution.
              </p>
              <ul className="story-list">
                <li>KEBS-certified manufacturing processes</li>
                <li>On-site nutritionist and quality control team</li>
                <li>Nationwide depot and transport network</li>
                <li>Same-day Nairobi dispatch for approved orders</li>
              </ul>
            </div>
          </div>

          <div className="section-copy-block fade-up">
            <span className="section-tag">Our Story</span>
            <h2 className="section-title-dark">A manufacturing company built for consistency, scale, and trust.</h2>
            <p>
              We serve farms, cooperatives, and distributors that need dependable feed quality, responsive customer
              support, and predictable delivery schedules. Every stage, from raw material intake to finished bagging,
              is designed around performance in the field.
            </p>
            <p>
              Behind the commercial brand is a disciplined operations backbone that supports procurement, production,
              quality control, dispatch, and account service without turning the website into a software product pitch.
            </p>
            <Link className="text-link" href="#contact">
              Speak with our team
            </Link>
          </div>
        </div>
      </section>

      <section className="marketing-section dark-panel" id="products">
        <div className="marketing-container">
          <span className="section-tag">Our Range</span>
          <h2 className="section-title-light">The right feed for every animal, formulated for real farm performance.</h2>
          <p className="section-copy-light">
            Our core product lines cover commercial poultry, dairy, piggery, beef, and tailored feed programs for
            specialized production systems.
          </p>

          <div className="product-grid">
            {productCards.map((product, index) => (
              <article className="product-tile fade-up" key={product.name} style={{ transitionDelay: `${index * 0.06}s` }}>
                <div className="card-icon-wrap">
                  <div className="card-icon">
                    <product.icon size={18} strokeWidth={1.8} />
                  </div>
                  <span className="card-chip">{product.tag}</span>
                </div>
                <div className="product-name">{product.name}</div>
                <p>{product.description}</p>
                <div className="product-meta-row">
                  <span>{product.meta}</span>
                  <span>Available now</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="marketing-section" id="capabilities">
        <div className="marketing-container">
          <span className="section-tag">Operations Backbone</span>
          <h2 className="section-title-dark">Built on strong production, supply, and service systems.</h2>
          <p className="section-copy-dark">
            The business runs on connected internal workflows that help keep raw materials available, batches on plan,
            deliveries on time, and customer accounts visible to the right teams.
          </p>

          <div className="capability-grid">
            {operationalCapabilities.map((capability, index) => (
              <article className="capability-card fade-up" key={capability.title} style={{ transitionDelay: `${index * 0.05}s` }}>
                <div className="card-icon capability-icon">
                  <capability.icon size={18} strokeWidth={1.8} />
                </div>
                <div className="capability-title">{capability.title}</div>
                <p>{capability.description}</p>
              </article>
            ))}
          </div>

          <div className="capability-cta">
            <Link className="site-btn site-btn-primary" href="/dashboard">
              View operations dashboard
            </Link>
            <Link className="site-btn site-btn-secondary" href="/login/stock-manager">
              Team login
            </Link>
          </div>
        </div>
      </section>

      <section className="marketing-section warm-panel">
        <div className="marketing-container">
          <span className="section-tag">Why AgriFeed</span>
          <h2 className="section-title-dark">Quality you can measure in every bag.</h2>
          <div className="why-grid-marketing">
            {whyCards.map((item, index) => (
              <article className="why-card-marketing fade-up" key={item.title} style={{ transitionDelay: `${index * 0.08}s` }}>
                <div className="card-icon">
                  <item.icon size={18} strokeWidth={1.8} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="marketing-section">
        <div className="marketing-container">
          <span className="section-tag">How It Works</span>
          <h2 className="section-title-dark">From order to farm gate in four steps.</h2>
          <div className="process-grid-marketing">
            {processSteps.map((step, index) => (
              <article className="process-card fade-up" key={step.number} style={{ transitionDelay: `${index * 0.1}s` }}>
                <div className="process-icon">
                  <step.icon size={18} strokeWidth={1.8} />
                </div>
                <div className="process-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="marketing-section" id="coverage">
        <div className="marketing-container">
          <span className="section-tag">Delivery Coverage</span>
          <h2 className="section-title-dark">Delivering across Kenya with dependable logistics coordination.</h2>
          <div className="county-grid">
            {counties.map((county) => (
              <div className="county-chip fade-up" key={county}>
                {county}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="marketing-section dark-panel">
        <div className="marketing-container">
          <span className="section-tag">Client Stories</span>
          <h2 className="section-title-light">Trusted by farms, cooperatives, and distributors.</h2>
          <div className="testimonial-grid">
            {testimonials.map((item, index) => (
              <article className="testimonial-card fade-up" key={item.name} style={{ transitionDelay: `${index * 0.1}s` }}>
                <div className="testimonial-mark">
                  <BadgeCheck size={18} strokeWidth={1.8} />
                </div>
                <p>{item.quote}</p>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="marketing-section" id="contact">
        <div className="marketing-container contact-grid-marketing">
          <div>
            <span className="section-tag">Get In Touch</span>
            <h2 className="section-title-dark">We&apos;d love to hear from you.</h2>
            <div className="contact-stack">
              <div>
                <strong>Head Office &amp; Plant</strong>
                <span>Plot 42, Industrial Area, Nairobi, Kenya</span>
              </div>
              <div>
                <strong>Phone / WhatsApp</strong>
                <span>+254 700 123 456 | +254 733 456 789</span>
              </div>
              <div>
                <strong>Email</strong>
                <span>orders@agrifeedindustries.co.ke | info@agrifeedindustries.co.ke</span>
              </div>
            </div>
          </div>

          <form className="contact-form-marketing">
            <div className="field-grid">
              <input placeholder="Full name" />
              <input placeholder="Phone" />
            </div>
            <input placeholder="Email" type="email" />
            <select defaultValue="Product Enquiry">
              <option>Product Enquiry</option>
              <option>Place an Order</option>
              <option>Delivery / Logistics</option>
              <option>Become a Distributor</option>
              <option>Nutritionist Consultation</option>
            </select>
            <textarea placeholder="Tell us more about your enquiry..." rows={5} />
            <button className="site-btn site-btn-primary" type="button">
              Send message
            </button>
          </form>
        </div>
      </section>

      <footer className="marketing-footer">
        <div className="marketing-container footer-grid-marketing">
          <div>
            <div className="brand-mark footer-brand">
              <BrandBadge light />
              <div>
                <div className="brand-name light">AgriFeed Industries</div>
                <div className="brand-sub">Est. 2008 | Nairobi, Kenya</div>
              </div>
            </div>
            <p>
              Feeding Kenya&apos;s farms since 2008 with premium feed manufacturing, dependable supply, and disciplined service.
            </p>
          </div>

          <div>
            <h3>Products</h3>
            <a href="#products">Layers Mash</a>
            <a href="#products">Dairy Meal</a>
            <a href="#products">Chick Mash</a>
            <a href="#products">Custom Formulation</a>
          </div>

          <div>
            <h3>Business Portals</h3>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/login/owner">Owner Login</Link>
            <Link href="/login/client">Client Login</Link>
            <Link href="/login/stock-manager">Stock Manager</Link>
            <Link href="/login/sales-agent">Sales Agent</Link>
          </div>
        </div>

        <div className="marketing-container footer-bottom">
          <span className="footer-copy">Copyright 2024 AgriFeed Industries Ltd. All rights reserved. | Nairobi, Kenya</span>
          <span className="footer-copy">KEBS KS 735 | ISO 9001:2015 | Registration No. PVT-2008-04821</span>
        </div>
      </footer>
    </div>
  );
}
