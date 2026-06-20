"use client";

import type {
  SavedComparisonClauseV3,
  V3ClauseDiff,
} from "@/types/comparison-v3";

import ComparisonStatusBadge from "./ComparisonStatusBadge";
import DiffTokenRenderer from "./DiffTokenRenderer";

type ClauseLike =
  | V3ClauseDiff
  | SavedComparisonClauseV3;

export default function ClauseDiffCard({
  clause,
}: {
  clause: ClauseLike;
}) {
  return (
    <article
      className={[
        "rounded-[24px] border p-5 shadow-sm",
        getCardClassName(clause.status),
      ].join(" ")}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            {clauseNumberLabel(clause) ? (
              <p className="text-sm font-semibold text-slate-950">
                {clauseNumberLabel(clause)}
              </p>
            ) : null}

            <ComparisonStatusBadge status={clause.status} />
          </div>

          {clause.heading ? (
            <h3 className="mt-2 text-lg font-semibold text-slate-950">
              {clause.heading}
            </h3>
          ) : null}
        </div>

        {(clause.page_number_original ||
          clause.page_number_revised) && (
          <div className="text-xs text-slate-500 sm:text-right">
            {clause.page_number_original ? (
              <p>Original page {clause.page_number_original}</p>
            ) : null}
            {clause.page_number_revised ? (
              <p>Revised page {clause.page_number_revised}</p>
            ) : null}
          </div>
        )}
      </div>

      <div className="mt-4 rounded-[20px] bg-white/70 p-4 ring-1 ring-white/80">
        <DiffTokenRenderer tokens={clause.diff_tokens} />
      </div>
    </article>
  );
}

function clauseNumberLabel(clause: ClauseLike) {
  return clause.clause_number ?? clause.number ?? null;
}

function getCardClassName(status: ClauseLike["status"]) {
  switch (status) {
    case "added":
      return "border-emerald-200 bg-emerald-50/70";
    case "deleted":
      return "border-rose-200 bg-rose-50/70";
    case "modified":
      return "border-amber-200 bg-amber-50/80";
    default:
      return "border-slate-200 bg-white/90";
  }
}
