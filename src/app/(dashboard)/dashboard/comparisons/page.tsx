import Link from "next/link";
import { redirect } from "next/navigation";

import DeleteComparisonButton from "@/components/comparison-v3/DeleteComparisonButton";
import {
  ComparisonV3StorageError,
  getComparisonsV3,
} from "@/lib/comparison-v3/db";
import { createClient } from "@/lib/supabase/server";

export default async function ComparisonsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  let comparisons = [];
  let storageMessage: string | null = null;

  try {
    comparisons = await getComparisonsV3({
      supabase,
      userId: user.id,
    });
  } catch (error) {
    if (error instanceof ComparisonV3StorageError) {
      storageMessage = error.message;
    } else {
      storageMessage =
        "Saved comparisons are unavailable right now.";
    }
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#f3f4f6_45%,#eef2ff_100%)]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-[32px] border border-slate-200 bg-white/88 p-7 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Saved comparisons
              </p>
              <h1 className="mt-3 text-4xl font-semibold text-slate-950">
                Clause comparison history
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                Reopen saved clause-level comparisons without rerunning the
                engine.
              </p>
            </div>

            <Link
              href="/dashboard/compare"
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
            >
              New comparison
            </Link>
          </div>
        </section>

        {storageMessage ? (
          <section className="mt-8 rounded-[28px] border border-amber-200 bg-amber-50/90 p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-amber-950">
              Saved comparisons are not ready yet
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-amber-900">
              {storageMessage}
            </p>
            <p className="mt-3 text-sm text-amber-900">
              Apply the SQL in <code>supabase/migrations/20260620_create_comparisons_v3.sql</code> and reload this page.
            </p>
          </section>
        ) : comparisons.length === 0 ? (
          <section className="mt-8 rounded-[28px] border border-slate-200 bg-white/90 p-8 text-center shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-950">
              No comparisons yet
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Run your first clause comparison to start building history.
            </p>
            <Link
              href="/dashboard/compare"
              className="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
            >
              Go to clause compare
            </Link>
          </section>
        ) : (
          <section className="mt-8 grid gap-5">
            {comparisons.map((comparison) => (
              <article
                key={comparison.id}
                className="rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-sm"
              >
                <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                  <div>
                    <Link
                      href={`/dashboard/comparisons/${comparison.id}`}
                      className="text-2xl font-semibold text-slate-950 transition hover:text-sky-700"
                    >
                      {comparison.title ?? "Untitled comparison"}
                    </Link>
                    <p className="mt-2 text-sm text-slate-600">
                      {comparison.original_file_name} → {comparison.revised_file_name}
                    </p>
                    <p className="mt-2 text-xs text-slate-500">
                      Created {formatDate(comparison.created_at)}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 xl:items-end">
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      <StatPill
                        label="Changed"
                        value={comparison.summary.changed_clauses}
                      />
                      <StatPill
                        label="Added"
                        value={comparison.summary.added_clauses}
                      />
                      <StatPill
                        label="Deleted"
                        value={comparison.summary.deleted_clauses}
                      />
                      <StatPill
                        label="Modified"
                        value={comparison.summary.modified_clauses}
                      />
                      <StatPill
                        label="Unchanged"
                        value={comparison.summary.unchanged_clauses}
                      />
                    </div>

                    <div className="flex gap-3">
                      <Link
                        href={`/dashboard/comparisons/${comparison.id}`}
                        className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                      >
                        Open
                      </Link>
                      <DeleteComparisonButton comparisonId={comparison.id} />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

function StatPill({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-[18px] border border-slate-200 bg-slate-50 px-3 py-3 text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold text-slate-950">
        {value}
      </p>
    </div>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
