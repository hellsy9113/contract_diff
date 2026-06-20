import { NextResponse } from "next/server";

import { deleteComparisonV3 } from "@/lib/comparison-v3/db";
import { createClient } from "@/lib/supabase/server";

export async function DELETE(
  _request: Request,
  context: {
    params: Promise<{
      comparisonId: string;
    }>;
  }
) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        { status: 401 }
      );
    }

    const { comparisonId } = await context.params;

    await deleteComparisonV3({
      supabase,
      userId: user.id,
      comparisonId,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Could not delete comparison.",
      },
      { status: 500 }
    );
  }
}
