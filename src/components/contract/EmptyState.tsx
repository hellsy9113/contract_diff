"use client";

import {
  CheckCircle2,
  FileStack,
  Scale,
  Sparkles,
} from "lucide-react";

import CompareButton from "./CompareButton";

type EmptyStateProps = {
  originalReady: boolean;
  revisedReady: boolean;
  loading?: boolean;
  onCompare: () => void;
};

export default function EmptyState({
  originalReady,
  revisedReady,
  loading = false,
  onCompare,
}: EmptyStateProps) {
  const readyCount = Number(originalReady) + Number(revisedReady);
  const isReady = originalReady && revisedReady;

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.3)]">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            <Sparkles className="h-3.5 w-3.5 text-sky-600" />
            Workflow status
          </div>

          <h2 className="text-2xl font-semibold text-slate-950">
            {isReady
              ? "Both contracts are ready for analysis."
              : "Start by uploading two contract versions."}
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
            {isReady
              ? "Generate an annotated PDF that highlights additions, deletions, and modified clauses directly on the revised contract."
              : "Upload the earlier agreement and the revised version. Contract Diff will keep your selected files in place even if the comparison needs another try."}
          </p>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 lg:min-w-[300px]">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900">
              Preparation checklist
            </p>

            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-500">
              {readyCount}/2 ready
            </span>
          </div>

          <div className="mt-4 space-y-3 text-sm">
            <StatusRow
              label="Original contract uploaded"
              ready={originalReady}
            />
            <StatusRow
              label="Revised contract uploaded"
              ready={revisedReady}
            />
            <StatusRow
              label="Comparison can start"
              ready={isReady}
              icon={Scale}
            />
          </div>

          <CompareButton
            className="mt-5"
            disabled={!isReady}
            loading={loading}
            onCompare={onCompare}
          />
        </div>
      </div>
    </section>
  );
}

function StatusRow({
  label,
  ready,
  icon: Icon = FileStack,
}: {
  label: string;
  ready: boolean;
  icon?: typeof FileStack;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white px-3 py-3">
      <div
        className={[
          "flex h-9 w-9 items-center justify-center rounded-2xl",
          ready
            ? "bg-emerald-50 text-emerald-700"
            : "bg-slate-100 text-slate-400",
        ].join(" ")}
      >
        {ready ? (
          <CheckCircle2 className="h-4 w-4" />
        ) : (
          <Icon className="h-4 w-4" />
        )}
      </div>

      <div>
        <p className="font-medium text-slate-900">{label}</p>
        <p className="text-xs text-slate-500">
          {ready ? "Ready" : "Waiting"}
        </p>
      </div>
    </div>
  );
}
