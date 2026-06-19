import { NextResponse } from "next/server";
import { signupSchema } from "@/schemas/signupSchema";
import { validate } from "@/lib/validate";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = validate(signupSchema, body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          errors: result.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { email, password, fullName } = result.data;
    const supabase = await createClient();
    const origin =
      req.headers.get("origin") ??
      process.env.NEXT_PUBLIC_SITE_URL;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          fullName,
        },
        emailRedirectTo: `${origin}/auth/callback?flow=signup`,
      },
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

    if (
      data.user &&
      Array.isArray(data.user.identities) &&
      data.user.identities.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Account already exists. Please log in or reset your password.",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
