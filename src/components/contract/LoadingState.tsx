"use client";

import { Loader2, ScanSearch } from "lucide-react";

export default function LoadingState() {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.3)]">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Analysis in progress
          </div>

          <h2 className="text-2xl font-semibold text-slate-950">
            Analyzing contract changes…
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            We&apos;re checking clause structure, aligning revisions, and
            generating an annotated PDF that your team can review immediately.
          </p>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 lg:min-w-[320px]">
          <div className="space-y-3 text-sm text-slate-600">
            <ProgressRow
              title="Preparing files"
              description="Validating both uploaded PDFs."
              complete
            />
            <ProgressRow
              title="Comparing clauses"
              description="Finding added, deleted, and modified text."
              active
            />
            <ProgressRow
              title="Generating output"
              description="Building your annotated review copy."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgressRow({
  title,
  description,
  complete = false,
  active = false,
}: {
  title: string;
  description: string;
  complete?: boolean;
  active?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-white px-4 py-3">
      <div
        className={[
          "mt-0.5 flex h-9 w-9 items-center justify-center rounded-2xl",
          complete
            ? "bg-emerald-50 text-emerald-700"
            : active
              ? "bg-sky-50 text-sky-700"
              : "bg-slate-100 text-slate-400",
        ].join(" ")}
      >
        {active ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <ScanSearch className="h-4 w-4" />
        )}
      </div>

      <div>
        <p className="font-medium text-slate-900">{title}</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}
