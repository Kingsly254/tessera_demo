import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { ensureDemoSchema } from "@/lib/schema";

export async function POST(request: NextRequest) {
  try {
    await ensureDemoSchema();
    const sql = getSql();
    const payload = await request.json();

    if (!payload.fullName || !payload.email || !payload.message) {
      return NextResponse.json(
        { ok: false, message: "fullName, email, and message are required." },
        { status: 400 },
      );
    }

    await sql.unsafe(
      `
        INSERT INTO contact_submissions (full_name, phone, email, subject, message)
        VALUES ($1, $2, $3, $4, $5)
      `,
      [
        payload.fullName,
        payload.phone ?? null,
        payload.email,
        payload.subject ?? null,
        payload.message,
      ],
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Failed to submit contact form.",
      },
      { status: 500 },
    );
  }
}
