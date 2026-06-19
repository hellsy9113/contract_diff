import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const flow =
    requestUrl.searchParams.get("flow") ??
    requestUrl.searchParams.get("type");

  if (!code) {
    return NextResponse.redirect(
      new URL("/login?error=missing_code", requestUrl)
    );
  }

  const supabase = await createClient();
  const { error } =
    await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      new URL(
        "/login?error=invalid_or_expired_link",
        requestUrl
      )
    );
  }

  if (flow === "recovery") {
    return NextResponse.redirect(
      new URL("/reset-password", requestUrl)
    );
  }

  await supabase.auth.signOut();

  return NextResponse.redirect(
    new URL("/login?verified=true", requestUrl)
  );
}
