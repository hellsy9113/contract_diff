"use client";

import {
  CheckCircle2,
  FileText,
  RefreshCw,
  X,
} from "lucide-react";

import { formatFileSize } from "@/lib/contract/format";
import { ContractFile } from "@/types/contract";

interface FilePreviewProps {
  file: ContractFile;
  onChange: () => void;
  onRemove: () => void;
}

export default function FilePreview({
  file,
  onChange,
  onRemove,
}: FilePreviewProps) {
  return (
    <div className="w-full rounded-[24px] border border-slate-200 bg-slate-50/80 p-4 shadow-sm ring-1 ring-white/70 backdrop-blur">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#eef2ff,#dbeafe)] text-sky-700 shadow-inner">
            <FileText className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="truncate text-sm font-semibold text-slate-950">
                {file.name}
              </p>

              <span className="shrink-0 rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-rose-700">
                PDF
              </span>
            </div>

            <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <p>{formatFileSize(file.size)}</p>

              <span className="inline-flex items-center gap-1 text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Ready for comparison
              </span>

              <p>Stored in this browser session</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onChange();
            }}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Change file
          </button>

          <button
            type="button"
            aria-label={`Remove ${file.name}`}
            onClick={(event) => {
              event.stopPropagation();
              onRemove();
            }}
            className="inline-flex items-center gap-2 rounded-full border border-transparent px-3 py-2 text-xs font-semibold text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700"
          >
            <X className="h-3.5 w-3.5" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
