import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";

import type {
  SavedComparisonClauseV3,
  SavedComparisonV3,
  V3ClauseCompareResponse,
} from "@/types/comparison-v3";

import {
  getComparisonTitleV3,
  mapClauseRow,
  mapClauseToInsertRow,
  mapComparisonRow,
} from "./mappers";

type PostgrestLikeError = {
  code?: string | null;
  message?: string | null;
  details?: string | null;
  hint?: string | null;
};

export class ComparisonV3StorageError extends Error {
  kind:
    | "schema_missing"
    | "not_found"
    | "query_failed";

  constructor(
    kind:
      | "schema_missing"
      | "not_found"
      | "query_failed",
    message: string
  ) {
    super(message);
    this.name = "ComparisonV3StorageError";
    this.kind = kind;
  }
}

function isSchemaMissingError(
  error: PostgrestLikeError | null | undefined
) {
  const message = error?.message?.toLowerCase() ?? "";
  const details = error?.details?.toLowerCase() ?? "";

  return (
    error?.code === "42P01" ||
    error?.code === "PGRST205" ||
    message.includes("could not find the table") ||
    message.includes("relation") ||
    message.includes("does not exist") ||
    details.includes("does not exist")
  );
}

function getErrorMessage(
  error: PostgrestLikeError | null | undefined,
  fallback: string
) {
  return (
    error?.message ??
    error?.details ??
    error?.hint ??
    fallback
  );
}

export async function createComparisonV3(params: {
  supabase: SupabaseClient;
  userId: string;
  title: string | null;
  originalFileName: string;
  revisedFileName: string;
  result: V3ClauseCompareResponse;
}): Promise<{ comparisonId: string }> {
  const title =
    params.title ??
    getComparisonTitleV3(
      params.result,
      params.originalFileName,
      params.revisedFileName
    );

  const { data: comparison, error } =
    await params.supabase
      .from("comparisons")
      .insert({
        user_id: params.userId,
        title,
        original_file_name: params.originalFileName,
        revised_file_name: params.revisedFileName,
        engine_version: "v3",
        status: "completed",
        summary: params.result.summary,
      })
      .select("id")
      .single();

  if (error || !comparison) {
    if (isSchemaMissingError(error)) {
      throw new ComparisonV3StorageError(
        "schema_missing",
        "Comparison storage is not ready yet. Run the v3 Supabase migration first."
      );
    }

    throw new ComparisonV3StorageError(
      "query_failed",
      getErrorMessage(
        error,
        "Could not save comparison metadata."
      )
    );
  }

  const clauseRows = params.result.clauses.map((clause) =>
    mapClauseToInsertRow(comparison.id, clause)
  );

  if (clauseRows.length > 0) {
    const { error: clauseError } =
      await params.supabase
        .from("comparison_clauses")
        .insert(clauseRows);

    if (clauseError) {
      await params.supabase
        .from("comparisons")
        .delete()
        .eq("id", comparison.id);

      if (isSchemaMissingError(clauseError)) {
        throw new ComparisonV3StorageError(
          "schema_missing",
          "Comparison clause storage is not ready yet. Run the v3 Supabase migration first."
        );
      }

      throw new ComparisonV3StorageError(
        "query_failed",
        getErrorMessage(
          clauseError,
          "Could not save comparison clauses."
        )
      );
    }
  }

  return { comparisonId: comparison.id };
}

export async function getComparisonsV3(
  params: {
    supabase: SupabaseClient;
    userId: string;
  }
): Promise<SavedComparisonV3[]> {
  const { data, error } = await params.supabase
    .from("comparisons")
    .select(
      "id, user_id, title, original_file_name, revised_file_name, engine_version, summary, created_at, updated_at"
    )
    .eq("user_id", params.userId)
    .eq("engine_version", "v3")
    .order("created_at", { ascending: false });

  if (error) {
    if (isSchemaMissingError(error)) {
      throw new ComparisonV3StorageError(
        "schema_missing",
        "Comparison storage is not ready yet. Run the v3 Supabase migration first."
      );
    }

    throw new ComparisonV3StorageError(
      "query_failed",
      getErrorMessage(
        error,
        "Could not load saved comparisons."
      )
    );
  }

  return (data ?? []).map(mapComparisonRow);
}

export async function getComparisonV3(params: {
  supabase: SupabaseClient;
  userId: string;
  comparisonId: string;
}): Promise<{
  comparison: SavedComparisonV3;
  clauses: SavedComparisonClauseV3[];
}> {
  const { data: comparison, error } =
    await params.supabase
      .from("comparisons")
      .select(
        "id, user_id, title, original_file_name, revised_file_name, engine_version, summary, created_at, updated_at"
      )
      .eq("id", params.comparisonId)
      .eq("user_id", params.userId)
      .eq("engine_version", "v3")
      .single();

  if (error || !comparison) {
    if (isSchemaMissingError(error)) {
      throw new ComparisonV3StorageError(
        "schema_missing",
        "Comparison storage is not ready yet. Run the v3 Supabase migration first."
      );
    }

    throw new ComparisonV3StorageError(
      "not_found",
      "Comparison not found."
    );
  }

  const { data: clauses, error: clausesError } =
    await params.supabase
      .from("comparison_clauses")
      .select(
        "id, comparison_id, clause_key, clause_number, heading, status, original_text, revised_text, diff_tokens, page_number_original, page_number_revised, order_index, created_at"
      )
      .eq("comparison_id", params.comparisonId)
      .order("order_index", { ascending: true });

  if (clausesError) {
    if (isSchemaMissingError(clausesError)) {
      throw new ComparisonV3StorageError(
        "schema_missing",
        "Comparison clause storage is not ready yet. Run the v3 Supabase migration first."
      );
    }

    throw new ComparisonV3StorageError(
      "query_failed",
      getErrorMessage(
        clausesError,
        "Could not load clauses."
      )
    );
  }

  return {
    comparison: mapComparisonRow(comparison),
    clauses: (clauses ?? []).map(mapClauseRow),
  };
}

export async function deleteComparisonV3(params: {
  supabase: SupabaseClient;
  userId: string;
  comparisonId: string;
}): Promise<void> {
  const { error } = await params.supabase
    .from("comparisons")
    .delete()
    .eq("id", params.comparisonId)
    .eq("user_id", params.userId)
    .eq("engine_version", "v3");

  if (error) {
    if (isSchemaMissingError(error)) {
      throw new ComparisonV3StorageError(
        "schema_missing",
        "Comparison storage is not ready yet. Run the v3 Supabase migration first."
      );
    }

    throw new ComparisonV3StorageError(
      "query_failed",
      getErrorMessage(
        error,
        "Could not delete comparison."
      )
    );
  }
}
