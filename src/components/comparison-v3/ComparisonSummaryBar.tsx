"use client";

import type { V3CompareSummary } from "@/types/comparison-v3";

const items: Array<{
  key: keyof V3CompareSummary;
  label: string;
}> = [
  { key: "total_clauses", label: "Total clauses" },
  { key: "changed_clauses", label: "Changed" },
  { key: "added_clauses", label: "Added" },
  { key: "deleted_clauses", label: "Deleted" },
  { key: "modified_clauses", label: "Modified" },
  { key: "unchanged_clauses", label: "Unchanged" },
];

export default function ComparisonSummaryBar({
  summary,
}: {
  summary: V3CompareSummary;
}) {
  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
      {items.map((item) => (
        <div
          key={item.key}
          className="rounded-[20px] border border-slate-200 bg-white px-4 py-4 shadow-sm"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            {item.label}
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-950">
            {summary[item.key]}
          </p>
        </div>
      ))}
    </section>
  );
}
