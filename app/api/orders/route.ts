import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { ensureDemoSchema } from "@/lib/schema";

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export async function GET() {
  try {
    await ensureDemoSchema();
    const sql = getSql();

    const result = await sql.unsafe<{
      id: string;
      order_number: string;
      customer_name: string;
      customer_email: string;
      status: string;
      total_amount: string;
      created_at: string;
      items: OrderItem[];
    }[]>(`
      SELECT id, order_number, customer_name, customer_email, status, total_amount::text, created_at::text, items
      FROM client_orders
      ORDER BY created_at DESC
      LIMIT 20
    `);

    return NextResponse.json({ ok: true, orders: result });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Failed to fetch orders.",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureDemoSchema();
    const sql = getSql();
    const payload = await request.json();

    const items = Array.isArray(payload.items) ? payload.items : [];
    if (items.length === 0) {
      return NextResponse.json({ ok: false, message: "At least one order item is required." }, { status: 400 });
    }

    const orderNumber = `AF-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000 + 1000)}`;
    const subtotalAmount = Number(payload.subtotalAmount ?? 0);
    const vatAmount = Number(payload.vatAmount ?? 0);
    const totalAmount = Number(payload.totalAmount ?? 0);

    const result = await sql.unsafe<{ order_number: string }[]>(
      `
        INSERT INTO client_orders (
          order_number,
          customer_name,
          customer_email,
          customer_phone,
          company_name,
          county,
          delivery_date,
          delivery_address,
          contact_person,
          payment_method,
          status,
          subtotal_amount,
          vat_amount,
          total_amount,
          items
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'submitted', $11, $12, $13, $14::jsonb)
        RETURNING order_number
      `,
      [
        orderNumber,
        payload.customerName ?? "Portal Customer",
        payload.customerEmail ?? "client.demo@agrifeed.app",
        payload.customerPhone ?? null,
        payload.companyName ?? "AgriFeed Demo Ltd",
        payload.county ?? null,
        payload.deliveryDate ?? null,
        payload.deliveryAddress ?? null,
        payload.contactPerson ?? null,
        payload.paymentMethod ?? "credit_account",
        subtotalAmount,
        vatAmount,
        totalAmount,
        JSON.stringify(items),
      ],
    );

    return NextResponse.json({
      ok: true,
      orderNumber: result[0]?.order_number ?? orderNumber,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Failed to create order.",
      },
      { status: 500 },
    );
  }
}
