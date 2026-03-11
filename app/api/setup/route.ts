import { NextResponse } from "next/server";
import { ensureDemoSchema } from "@/lib/schema";

export async function POST() {
  try {
    await ensureDemoSchema();

    return NextResponse.json({
      ok: true,
      message: "Demo schema is ready.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Failed to initialize schema.",
      },
      { status: 500 },
    );
  }
}
