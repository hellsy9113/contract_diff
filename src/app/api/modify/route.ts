import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const { email } = await req.json();

  const origin =
    req.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL;

  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?flow=recovery`,
  });

  if (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    message:
      "If an account exists for this email, a password reset link has been sent.",
  });
}