"use client";

import {
  ArrowRight,
  Loader2,
  ScanSearch,
} from "lucide-react";

interface CompareButtonProps {
  disabled?: boolean;
  loading?: boolean;
  onCompare: () => void;
  className?: string;
}

export default function CompareButton({
  disabled = false,
  loading = false,
  onCompare,
  className,
}: CompareButtonProps) {
  return (
    <div className={className}>
      <button
        type="button"
        disabled={disabled || loading}
        onClick={onCompare}
        className="flex w-full items-center justify-between gap-4 rounded-[24px] bg-[linear-gradient(135deg,#0f172a,#1d4ed8)] px-5 py-4 text-left text-white shadow-[0_24px_60px_-30px_rgba(15,23,42,0.65)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_70px_-30px_rgba(29,78,216,0.5)] disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/12">
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <ScanSearch className="h-5 w-5" />
            )}
          </div>

          <div>
            <p className="text-sm font-semibold">
              {loading
                ? "Analyzing contract changes…"
                : "Generate annotated diff"}
            </p>
            <p className="mt-1 text-xs text-white/75">
              {loading
                ? "This can take a few seconds for larger agreements."
                : "Run the existing comparison engine on both uploaded PDFs."}
            </p>
          </div>
        </div>

        <ArrowRight className="h-4 w-4 shrink-0" />
      </button>

      {!loading && disabled ? (
        <p className="mt-3 text-center text-xs text-slate-500">
          Upload both contracts to enable comparison
        </p>
      ) : null}
    </div>
  );
}
