const { readFileSync } = require("fs");
const { resolve } = require("path");
const postgres = require("postgres");

function loadDatabaseUrl() {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  const envPath = resolve(process.cwd(), ".env.local");
  const envText = readFileSync(envPath, "utf8");
  const line = envText
    .split(/\r?\n/)
    .find((entry) => entry.startsWith("DATABASE_URL="));

  if (!line) {
    throw new Error("DATABASE_URL not found in .env.local");
  }

  return line.slice("DATABASE_URL=".length);
}

async function main() {
  const sql = postgres(loadDatabaseUrl(), {
    ssl: "require",
    max: 1,
  });

  try {
    await sql.unsafe(`
      CREATE TABLE IF NOT EXISTS client_orders (
        id BIGSERIAL PRIMARY KEY,
        order_number TEXT NOT NULL UNIQUE,
        customer_name TEXT NOT NULL,
        customer_email TEXT NOT NULL,
        customer_phone TEXT,
        company_name TEXT,
        county TEXT,
        delivery_date DATE,
        delivery_address TEXT,
        contact_person TEXT,
        payment_method TEXT NOT NULL DEFAULT 'credit_account',
        status TEXT NOT NULL DEFAULT 'submitted',
        subtotal_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
        vat_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
        total_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
        items JSONB NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);

    await sql.unsafe(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id BIGSERIAL PRIMARY KEY,
        full_name TEXT NOT NULL,
        phone TEXT,
        email TEXT NOT NULL,
        subject TEXT,
        message TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);

    const orders = await sql.unsafe("SELECT COUNT(*)::text AS count FROM client_orders");
    const contacts = await sql.unsafe("SELECT COUNT(*)::text AS count FROM contact_submissions");

    console.log(JSON.stringify({
      orders: orders[0].count,
      contacts: contacts[0].count,
    }));
  } finally {
    await sql.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
