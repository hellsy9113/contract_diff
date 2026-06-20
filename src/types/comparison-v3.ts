export type V3DiffTokenType =
  | "equal"
  | "insert"
  | "delete";

export type V3DiffToken = {
  type: V3DiffTokenType;
  text: string;
};

export type V3ClauseStatus =
  | "unchanged"
  | "modified"
  | "added"
  | "deleted";

export type V3ClauseDiff = {
  id: string;
  number: string | null;
  heading: string | null;
  status: V3ClauseStatus;
  original_text: string | null;
  revised_text: string | null;
  diff_tokens: V3DiffToken[];
  page_number_original?: number | null;
  page_number_revised?: number | null;
  order_index: number;
};

export type V3CompareSummary = {
  total_clauses: number;
  unchanged_clauses: number;
  changed_clauses: number;
  added_clauses: number;
  deleted_clauses: number;
  modified_clauses: number;
};

export type V3ClauseCompareResponse = {
  version: "v3";
  document_title: string | null;
  summary: V3CompareSummary;
  clauses: V3ClauseDiff[];
};

export type SavedComparisonV3 = {
  id: string;
  user_id: string;
  title: string | null;
  original_file_name: string;
  revised_file_name: string;
  engine_version: "v3";
  summary: V3CompareSummary;
  created_at: string;
  updated_at: string | null;
};

export type SavedComparisonClauseV3 = {
  id: string;
  comparison_id: string;
  clause_key: string;
  clause_number: string | null;
  heading: string | null;
  status: V3ClauseStatus;
  original_text: string | null;
  revised_text: string | null;
  diff_tokens: V3DiffToken[];
  page_number_original: number | null;
  page_number_revised: number | null;
  order_index: number;
  created_at: string;
};

export type ComparisonV3ApiSuccess = {
  success: true;
  comparisonId: string;
};

export type ComparisonV3ApiFailure = {
  success: false;
  message: string;
};

export type ComparisonV3ApiResponse =
  | ComparisonV3ApiSuccess
  | ComparisonV3ApiFailure;
