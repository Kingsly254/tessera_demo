import Link from "next/link";
import { notFound } from "next/navigation";
import { roleCards } from "@/data/erp-demo";

type RolePageProps = {
  params: Promise<{
    role: string;
  }>;
};

const placeholderCreds: Record<string, { email: string; password: string }> = {
  "stock-manager": { email: "stock.demo@agrifeed.app", password: "demo123" },
  "sales-agent": { email: "sales.demo@agrifeed.app", password: "demo123" },
  client: { email: "client.demo@agrifeed.app", password: "demo123" },
  owner: { email: "owner.demo@agrifeed.app", password: "demo123" },
};

export function generateStaticParams() {
  return roleCards.map((role) => ({ role: role.slug }));
}

export default async function RoleLoginPage({ params }: RolePageProps) {
  const { role } = await params;
  const roleConfig = roleCards.find((entry) => entry.slug === role);
  const creds = placeholderCreds[role];

  if (!roleConfig || !creds) {
    notFound();
  }

  const targetPath = role === "client" ? "/portal" : "/dashboard";

  return (
    <div className="login-shell">
      <div className="login-card">
        <section className="login-panel">
          <div className="pill">Role portal</div>
          <h1 className="hero-title" style={{ fontSize: "clamp(2.2rem, 4vw, 3.8rem)", marginTop: "18px" }}>
            {roleConfig.title} demo login
          </h1>
          <p className="hero-copy">
            {roleConfig.summary} This route is ready for you to connect to real authentication when you move beyond
            static demos.
          </p>

          <div className="summary-list" style={{ marginTop: "24px" }}>
            <div className="summary-item">
              <div className="summary-title">Primary workflow focus</div>
              <div className="summary-meta">{roleConfig.focus}</div>
            </div>
            <div className="summary-item">
              <div className="summary-title">Starter credential</div>
              <div className="summary-meta">{creds.email}</div>
            </div>
            <div className="summary-item">
              <div className="summary-title">Demo password</div>
              <div className="summary-meta">{creds.password}</div>
            </div>
          </div>
        </section>

        <section className="auth-card">
          <div className="section-label">Sign in</div>
          <h2 className="auth-title">Access {roleConfig.title.toLowerCase()} workspace</h2>
          <p className="small">Static form for demos. Submit handling can be wired to NextAuth, JWT, or your Node API.</p>

          <form action={targetPath} className="auth-form">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input defaultValue={creds.email} id="email" name="email" type="email" />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input defaultValue={creds.password} id="password" name="password" type="password" />
            </div>
            <div className="field">
              <label htmlFor="company">Company</label>
              <input defaultValue="AgriFeed Demo Ltd" id="company" name="company" type="text" />
            </div>
            {role !== "client" ? <input name="role" type="hidden" value={role} /> : null}
            <div className="auth-actions">
              <button className="btn btn-primary" type="submit">
                Enter dashboard
              </button>
              <Link className="btn btn-secondary" href="/">
                Back home
              </Link>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
