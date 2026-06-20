import type {
  SavedComparisonClauseV3,
  SavedComparisonV3,
  V3ClauseCompareResponse,
  V3ClauseDiff,
  V3CompareSummary,
  V3DiffToken,
} from "@/types/comparison-v3";

export function getComparisonTitleV3(
  result: V3ClauseCompareResponse,
  originalFileName: string,
  revisedFileName: string
) {
  return (
    result.document_title ??
    `${stripPdfExtension(originalFileName)} vs ${stripPdfExtension(revisedFileName)}`
  );
}

export function mapClauseToInsertRow(
  comparisonId: string,
  clause: V3ClauseDiff
) {
  return {
    comparison_id: comparisonId,
    clause_key: clause.id,
    clause_number: clause.number,
    heading: clause.heading,
    status: clause.status,
    original_text: clause.original_text,
    revised_text: clause.revised_text,
    diff_tokens: clause.diff_tokens,
    page_number_original:
      clause.page_number_original ?? null,
    page_number_revised:
      clause.page_number_revised ?? null,
    order_index: clause.order_index,
  };
}

export function normalizeSummary(
  summary: unknown
): V3CompareSummary {
  const fallback: V3CompareSummary = {
    total_clauses: 0,
    unchanged_clauses: 0,
    changed_clauses: 0,
    added_clauses: 0,
    deleted_clauses: 0,
    modified_clauses: 0,
  };

  if (!summary || typeof summary !== "object") {
    return fallback;
  }

  const value = summary as Partial<V3CompareSummary>;

  return {
    total_clauses: value.total_clauses ?? 0,
    unchanged_clauses:
      value.unchanged_clauses ?? 0,
    changed_clauses: value.changed_clauses ?? 0,
    added_clauses: value.added_clauses ?? 0,
    deleted_clauses: value.deleted_clauses ?? 0,
    modified_clauses: value.modified_clauses ?? 0,
  };
}

export function normalizeDiffTokens(
  diffTokens: unknown
): V3DiffToken[] {
  if (!Array.isArray(diffTokens)) {
    return [];
  }

  return diffTokens.flatMap((token) => {
    if (
      !token ||
      typeof token !== "object" ||
      typeof (token as { text?: unknown }).text !==
        "string"
    ) {
      return [];
    }

    const typedToken = token as {
      type?: unknown;
      text: string;
    };

    if (
      typedToken.type !== "equal" &&
      typedToken.type !== "insert" &&
      typedToken.type !== "delete"
    ) {
      return [];
    }

    return [
      {
        type: typedToken.type,
        text: typedToken.text,
      },
    ];
  });
}

export function mapComparisonRow(
  row: ComparisonRow
): SavedComparisonV3 {
  return {
    id: row.id,
    user_id: row.user_id,
    title: row.title,
    original_file_name: row.original_file_name,
    revised_file_name: row.revised_file_name,
    engine_version: "v3",
    summary: normalizeSummary(row.summary),
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export function mapClauseRow(
  row: ClauseRow
): SavedComparisonClauseV3 {
  return {
    id: row.id,
    comparison_id: row.comparison_id,
    clause_key: row.clause_key,
    clause_number: row.clause_number,
    heading: row.heading,
    status: row.status,
    original_text: row.original_text,
    revised_text: row.revised_text,
    diff_tokens: normalizeDiffTokens(row.diff_tokens),
    page_number_original: row.page_number_original,
    page_number_revised: row.page_number_revised,
    order_index: row.order_index,
    created_at: row.created_at,
  };
}

export function groupClausesByHeading(
  clauses: SavedComparisonClauseV3[]
) {
  const groups: Array<{
    key: string;
    heading: string | null;
    clauses: SavedComparisonClauseV3[];
  }> = [];

  for (const clause of clauses) {
    const heading =
      clause.heading?.trim() || null;
    const lastGroup = groups.at(-1);

    if (!lastGroup || lastGroup.heading !== heading) {
      groups.push({
        key: `${heading ?? "ungrouped"}-${groups.length}`,
        heading,
        clauses: [clause],
      });
      continue;
    }

    lastGroup.clauses.push(clause);
  }

  return groups;
}

function stripPdfExtension(fileName: string) {
  return fileName.replace(/\.pdf$/i, "");
}

type ComparisonRow = {
  id: string;
  user_id: string;
  title: string | null;
  original_file_name: string;
  revised_file_name: string;
  engine_version: string;
  summary: unknown;
  created_at: string;
  updated_at: string | null;
};

type ClauseRow = {
  id: string;
  comparison_id: string;
  clause_key: string;
  clause_number: string | null;
  heading: string | null;
  status:
    | "unchanged"
    | "modified"
    | "added"
    | "deleted";
  original_text: string | null;
  revised_text: string | null;
  diff_tokens: unknown;
  page_number_original: number | null;
  page_number_revised: number | null;
  order_index: number;
  created_at: string;
};
