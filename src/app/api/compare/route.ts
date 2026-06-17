import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      message:
        "Contract comparison is handled by the Python engine at NEXT_PUBLIC_CONTRACT_ENGINE_URL.",
    },
    { status: 501 }
  );
}
