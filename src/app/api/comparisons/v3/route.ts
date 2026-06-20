import { NextResponse } from "next/server";

import {
  createComparisonV3,
} from "@/lib/comparison-v3/db";
import { createClient } from "@/lib/supabase/server";
import type {
  V3ClauseCompareResponse,
  V3ClauseStatus,
  V3DiffTokenType,
} from "@/types/comparison-v3";

export async function POST(request: Request) {
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

    const formData = await request.formData();
    const original = formData.get("original");
    const revised = formData.get("revised");

    if (!(original instanceof File) || !(revised instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Both original and revised PDF files are required.",
        },
        { status: 400 }
      );
    }

    if (
      original.type !== "application/pdf" ||
      revised.type !== "application/pdf"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Only PDF files are supported.",
        },
        { status: 400 }
      );
    }

    const engineUrl = getPythonEngineUrl();
    const engineFormData = new FormData();

    engineFormData.append(
      "original_file",
      original,
      original.name
    );
    engineFormData.append(
      "revised_file",
      revised,
      revised.name
    );

    const engineResponse = await fetch(
      `${engineUrl}/v3/compare/clauses`,
      {
        method: "POST",
        body: engineFormData,
      }
    );

    const engineJson =
      (await engineResponse.json().catch(() => null)) as unknown;

    if (!engineResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          message:
            getEngineErrorMessage(engineJson) ??
            "Engine comparison failed.",
        },
        { status: 502 }
      );
    }

    const parsed = parseV3EngineResponse(engineJson);

    if (!parsed) {
      return NextResponse.json(
        {
          success: false,
          message:
            "The comparison engine returned an invalid response.",
        },
        { status: 502 }
      );
    }

    const { comparisonId } = await createComparisonV3({
      supabase,
      userId: user.id,
      title: parsed.document_title,
      originalFileName: original.name,
      revisedFileName: revised.name,
      result: parsed,
    });

    return NextResponse.json({
      success: true,
      comparisonId,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
      },
      { status: 500 }
    );
  }
}

function getPythonEngineUrl() {
  const engineUrl =
    process.env.PYTHON_ENGINE_URL ??
    process.env.NEXT_PUBLIC_CONTRACT_ENGINE_URL;

  if (!engineUrl) {
    throw new Error(
      "Python engine URL is not configured."
    );
  }

  return engineUrl.replace(/\/$/, "");
}

function getEngineErrorMessage(json: unknown) {
  if (
    json &&
    typeof json === "object" &&
    typeof (json as { message?: unknown }).message ===
      "string"
  ) {
    return (json as { message: string }).message;
  }

  return null;
}

function parseV3EngineResponse(
  input: unknown
): V3ClauseCompareResponse | null {
  if (!input || typeof input !== "object") {
    return null;
  }

  const value = input as {
    version?: unknown;
    document_title?: unknown;
    summary?: unknown;
    clauses?: unknown;
  };

  if (
    value.version !== "v3" ||
    !isSummary(value.summary) ||
    !Array.isArray(value.clauses)
  ) {
    return null;
  }

  const clauses = value.clauses.flatMap((clause) => {
    if (!clause || typeof clause !== "object") {
      return [];
    }

    const typedClause = clause as {
      id?: unknown;
      number?: unknown;
      heading?: unknown;
      status?: unknown;
      original_text?: unknown;
      revised_text?: unknown;
      diff_tokens?: unknown;
      page_number_original?: unknown;
      page_number_revised?: unknown;
      order_index?: unknown;
    };

    if (
      typeof typedClause.id !== "string" ||
      !isClauseStatus(typedClause.status) ||
      !Array.isArray(typedClause.diff_tokens) ||
      typeof typedClause.order_index !== "number"
    ) {
      return [];
    }

    const diffTokens = typedClause.diff_tokens.flatMap((token) => {
      if (
        !token ||
        typeof token !== "object" ||
        !isDiffTokenType(
          (token as { type?: unknown }).type
        ) ||
        typeof (token as { text?: unknown }).text !==
          "string"
      ) {
        return [];
      }

      return [
        {
          type: (token as { type: V3DiffTokenType }).type,
          text: (token as { text: string }).text,
        },
      ];
    });

    return [
      {
        id: typedClause.id,
        number:
          typeof typedClause.number === "string"
            ? typedClause.number
            : null,
        heading:
          typeof typedClause.heading === "string"
            ? typedClause.heading
            : null,
        status: typedClause.status,
        original_text:
          typeof typedClause.original_text === "string"
            ? typedClause.original_text
            : null,
        revised_text:
          typeof typedClause.revised_text === "string"
            ? typedClause.revised_text
            : null,
        diff_tokens: diffTokens,
        page_number_original:
          typeof typedClause.page_number_original ===
          "number"
            ? typedClause.page_number_original
            : null,
        page_number_revised:
          typeof typedClause.page_number_revised ===
          "number"
            ? typedClause.page_number_revised
            : null,
        order_index: typedClause.order_index,
      },
    ];
  });

  return {
    version: "v3",
    document_title:
      typeof value.document_title === "string"
        ? value.document_title
        : null,
    summary: value.summary,
    clauses,
  };
}

function isSummary(
  input: unknown
): input is V3ClauseCompareResponse["summary"] {
  if (!input || typeof input !== "object") {
    return false;
  }

  const value = input as Record<string, unknown>;

  return [
    "total_clauses",
    "unchanged_clauses",
    "changed_clauses",
    "added_clauses",
    "deleted_clauses",
    "modified_clauses",
  ].every((key) => typeof value[key] === "number");
}

function isClauseStatus(
  input: unknown
): input is V3ClauseStatus {
  return (
    input === "unchanged" ||
    input === "modified" ||
    input === "added" ||
    input === "deleted"
  );
}

function isDiffTokenType(
  input: unknown
): input is V3DiffTokenType {
  return (
    input === "equal" ||
    input === "insert" ||
    input === "delete"
  );
}
