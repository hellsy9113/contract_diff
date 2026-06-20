import type {
  SavedComparisonClauseV3,
  SavedComparisonV3,
} from "@/types/comparison-v3";

import { groupClausesByHeading } from "@/lib/comparison-v3/mappers";

import ClauseDiffCard from "./ClauseDiffCard";
import ComparisonSummaryBar from "./ComparisonSummaryBar";

export default function ClauseComparisonPage({
  comparison,
  clauses,
}: {
  comparison: SavedComparisonV3;
  clauses: SavedComparisonClauseV3[];
}) {
  const groups = groupClausesByHeading(clauses);

  return (
    <div className="space-y-8">
      <section className="rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-sm">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          Contract page
        </p>
        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-950">
              Annotated changes in context
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {comparison.title ?? "Saved clause comparison"}
            </p>
          </div>

          <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Clauses aligned
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <MetaCard
            label="Original file"
            value={comparison.original_file_name}
          />
          <MetaCard
            label="Revised file"
            value={comparison.revised_file_name}
          />
        </div>
      </section>

      <ComparisonSummaryBar summary={comparison.summary} />

      {clauses.length === 0 ? (
        <section className="rounded-[28px] border border-slate-200 bg-white/90 p-8 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">
            No clauses were saved for this comparison.
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            The comparison exists, but there is no clause data to render yet.
          </p>
        </section>
      ) : (
        <section className="space-y-8">
          {groups.map((group) => (
            <div key={group.key} className="space-y-4">
              {group.heading ? (
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Section heading
                  </p>
                  <h2 className="mt-1 text-2xl font-semibold text-slate-950">
                    {group.heading}
                  </h2>
                </div>
              ) : null}

              <div className="space-y-4">
                {group.clauses.map((clause) => (
                  <ClauseDiffCard
                    key={clause.id}
                    clause={clause}
                  />
                ))}
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

function MetaCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[20px] border border-slate-200 bg-slate-50/80 px-4 py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-sm font-medium text-slate-900">
        {value}
      </p>
    </div>
  );
}
