import { getSql } from "@/lib/db";

export async function ensureDemoSchema() {
  const sql = getSql();

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
}
