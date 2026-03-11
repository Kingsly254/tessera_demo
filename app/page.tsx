import Link from "next/link";

const productCards = [
  { name: "Layers Mash", description: "High-calcium formulation for commercial laying hens and stronger egg output.", meta: "From KES 300/bag", tag: "70kg - Poultry" },
  { name: "Dairy Meal", description: "Balanced energy and protein blend designed for better milk yields and body condition.", meta: "From KES 450/bag", tag: "50kg - Livestock" },
  { name: "Chick Mash", description: "Starter feed for day-old chicks through early growth with high protein support.", meta: "From KES 200/bag", tag: "25kg - Poultry" },
  { name: "Beef Finisher", description: "Energy-dense ration for faster weight gain in feedlot beef finishing.", meta: "From KES 480/bag", tag: "50kg - Livestock" },
  { name: "Grower Mash", description: "Complete growing diet for pig production with strong feed conversion ratios.", meta: "From KES 300/bag", tag: "50kg - Pigs" },
  { name: "Custom Formulation", description: "Bespoke feed blends designed by nutritionists for specific breeds or production systems.", meta: "Quote on request", tag: "Any size - Bespoke" },
];

const whyCards = [
  { title: "Lab-Tested Quality", description: "Every batch is tested for moisture, protein, fibre, and aflatoxin before dispatch." },
  { title: "Reliable Delivery", description: "Same-day Nairobi dispatch and 24 to 48 hour upcountry delivery through our fleet." },
  { title: "Nutritionist Support", description: "Qualified animal nutritionists support feeding programs, ration balancing, and farm visits." },
  { title: "Flexible Credit Terms", description: "Approved clients can operate on structured credit while tracking balances digitally." },
];

const processSteps = [
  { number: "1", title: "Create Account", description: "Register your farm or business and get approved for portal access." },
  { number: "2", title: "Place Your Order", description: "Choose products, quantities, and delivery timing from the portal." },
  { number: "3", title: "We Manufacture", description: "Production, quality checks, bagging, and release are tracked end to end." },
  { number: "4", title: "Fast Delivery", description: "Dispatch teams and drivers take orders to the farm gate with live status." },
];

const testimonials = [
  { quote: "We switched to AgriFeed Layers Mash and our egg production jumped noticeably within one cycle.", name: "Mary Kamau", role: "Layer Farm - Kiambu" },
  { quote: "The dairy meal and nutritionist support improved our milk volumes and consistency across the herd.", name: "John Otieno", role: "Dairy Cooperative - Nakuru" },
  { quote: "Ordering online is straightforward and dispatch updates make planning much easier for our farm team.", name: "Agnes Wanjiru", role: "Broiler Farm - Eldoret" },
];

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
];

const erpCapabilities = [
  "Inventory and stock control",
  "Sales and customer management",
  "Suppliers and procurement",
  "Manufacturing and batch planning",
  "Drivers and delivery operations",
  "HR and time attendance",
];

export default function HomePage() {
  return (
    <div className="marketing-shell">
      <header className="site-nav">
        <div className="marketing-container nav-inner">
          <Link className="brand-mark" href="/">
            <div className="brand-badge">AF</div>
            <div>
              <div className="brand-name">AgriFeed Industries</div>
              <div className="brand-sub">Est. 2008 - Nairobi, Kenya</div>
            </div>
          </Link>

          <nav className="site-nav-links">
            <a href="#about">About</a>
            <a href="#products">Products</a>
            <a href="#capabilities">ERP Demo</a>
            <a href="#coverage">Coverage</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="site-nav-actions">
            <Link className="site-btn site-btn-secondary" href="/login/client">
              Client Login
            </Link>
            <Link className="site-btn site-btn-primary" href="/login/owner">
              Demo Login
            </Link>
          </div>
        </div>
      </header>

      <section className="marketing-hero">
        <div className="hero-backdrop" />
        <div className="marketing-container hero-grid">
          <div>
            <div className="hero-kicker">Kenya&apos;s trusted animal feed manufacturer</div>
            <h1 className="marketing-title">
              Nourishing Kenya&apos;s livestock, poultry, and the businesses behind them.
            </h1>
            <p className="marketing-copy">
              AgriFeed Industries combines premium feed manufacturing with a demo ERP platform for inventory, sales,
              manufacturing, suppliers, HR, drivers, and client ordering. This site acts as the proposed company
              landing page and the front door into the dashboard demo.
            </p>
            <div className="hero-actions">
              <Link className="site-btn site-btn-primary" href="/login/client">
                Place order demo
              </Link>
              <Link className="site-btn site-btn-secondary" href="/dashboard">
                View dashboard
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
          </div>

          <aside className="hero-aside">
            <div className="hero-aside-card">
              <div className="section-tag">ERP Demo Access</div>
              <h2>Role-based login pages</h2>
              <p>Open dedicated demo logins for stock manager, sales agent, client, and owner personas.</p>
              <div className="hero-role-links">
                <Link href="/login/stock-manager">Stock Manager</Link>
                <Link href="/login/sales-agent">Sales Agent</Link>
                <Link href="/login/client">Client</Link>
                <Link href="/login/owner">Owner</Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <div className="marquee-band">
        <div className="marquee-row">
          <span>Layers Mash</span>
          <span>Dairy Meal</span>
          <span>Chick Mash</span>
          <span>Grower Mash</span>
          <span>Manufacturing ERP</span>
          <span>HR and Attendance</span>
          <span>Drivers and Delivery</span>
          <span>Sales and Suppliers</span>
        </div>
      </div>

      <section className="marketing-section" id="about">
        <div className="marketing-container two-column">
          <div className="story-card">
            <div className="story-pill">ISO 9001:2015</div>
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

          <div className="section-copy-block">
            <div className="section-tag">Our Story</div>
            <h2 className="section-title-dark">The company site and ERP demo can live in one experience.</h2>
            <p>
              This landing page is structured like a real commercial website, but it also channels users into your ERP
              demo. Prospects can read about the business, explore products, and then log into the dashboard or client
              portal journey.
            </p>
            <p>
              That makes it useful both as a public-facing website concept and as a sales demo environment for showing
              operational capabilities behind the scenes.
            </p>
            <Link className="text-link" href="/login/owner">
              Open owner demo login
            </Link>
          </div>
        </div>
      </section>

      <section className="marketing-section dark-panel" id="products">
        <div className="marketing-container">
          <div className="section-tag">Our Range</div>
          <h2 className="section-title-light">The right feed for every animal and a digital system behind every order.</h2>
          <p className="section-copy-light">
            Core product lines are paired with ERP workflows for stock, manufacturing, pricing, fulfillment, and client service.
          </p>

          <div className="product-grid">
            {productCards.map((product) => (
              <article className="product-tile" key={product.name}>
                <div className="product-name">{product.name}</div>
                <p>{product.description}</p>
                <div className="product-meta-row">
                  <span>{product.meta}</span>
                  <span>{product.tag}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="marketing-section" id="capabilities">
        <div className="marketing-container">
          <div className="section-tag">ERP Capability Demo</div>
          <h2 className="section-title-dark">Modules included in the dashboard demo.</h2>
          <p className="section-copy-dark">
            The internal workspace now covers the broader ERP footprint you asked for, not just stock and sales.
          </p>

          <div className="capability-grid">
            {erpCapabilities.map((capability) => (
              <div className="capability-card" key={capability}>
                {capability}
              </div>
            ))}
          </div>

          <div className="capability-cta">
            <Link className="site-btn site-btn-primary" href="/dashboard">
              Open full dashboard
            </Link>
            <Link className="site-btn site-btn-secondary" href="/login/stock-manager">
              Login first
            </Link>
          </div>
        </div>
      </section>

      <section className="marketing-section warm-panel">
        <div className="marketing-container">
          <div className="section-tag">Why AgriFeed</div>
          <h2 className="section-title-dark">Quality you can measure in every bag.</h2>
          <div className="why-grid-marketing">
            {whyCards.map((item) => (
              <article className="why-card-marketing" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="marketing-section">
        <div className="marketing-container">
          <div className="section-tag">How It Works</div>
          <h2 className="section-title-dark">From order to farm gate in four steps.</h2>
          <div className="process-grid-marketing">
            {processSteps.map((step) => (
              <article className="process-card" key={step.number}>
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
          <div className="section-tag">Delivery Coverage</div>
          <h2 className="section-title-dark">Delivering across Kenya with ERP-backed visibility.</h2>
          <div className="county-grid">
            {counties.map((county) => (
              <div className="county-chip" key={county}>
                {county}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="marketing-section dark-panel">
        <div className="marketing-container">
          <div className="section-tag">Client Stories</div>
          <h2 className="section-title-light">Trusted by farms, cooperatives, and distributors.</h2>
          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <article className="testimonial-card" key={item.name}>
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
            <div className="section-tag">Get In Touch</div>
            <h2 className="section-title-dark">We&apos;d love to hear from you.</h2>
            <div className="contact-stack">
              <div>
                <strong>Head Office & Plant</strong>
                <span>Plot 42, Industrial Area, Nairobi, Kenya</span>
              </div>
              <div>
                <strong>Phone / WhatsApp</strong>
                <span>+254 700 123 456 - +254 733 456 789</span>
              </div>
              <div>
                <strong>Email</strong>
                <span>orders@agrifeedindustries.co.ke - info@agrifeedindustries.co.ke</span>
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
            <div className="brand-name light">AgriFeed Industries</div>
            <p>Feeding Kenya&apos;s farms since 2008 with premium feed manufacturing and a demo-ready digital platform.</p>
          </div>
          <div>
            <h3>Products</h3>
            <a href="#products">Layers Mash</a>
            <a href="#products">Dairy Meal</a>
            <a href="#products">Chick Mash</a>
            <a href="#products">Custom Formulation</a>
          </div>
          <div>
            <h3>ERP Demo</h3>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/login/owner">Owner Login</Link>
            <Link href="/login/client">Client Login</Link>
            <Link href="/login/stock-manager">Stock Login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
