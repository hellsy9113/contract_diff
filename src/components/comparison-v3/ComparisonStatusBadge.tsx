"use client";

import type { V3ClauseStatus } from "@/types/comparison-v3";
import { cn } from "@/lib/utils";

const statusConfig: Record<
  V3ClauseStatus,
  { label: string; className: string }
> = {
  unchanged: {
    label: "Unchanged",
    className:
      "border-slate-200 bg-slate-50 text-slate-600",
  },
  modified: {
    label: "Modified",
    className:
      "border-amber-200 bg-amber-50 text-amber-700",
  },
  added: {
    label: "Added",
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  deleted: {
    label: "Deleted",
    className:
      "border-rose-200 bg-rose-50 text-rose-700",
  },
};

export default function ComparisonStatusBadge({
  status,
}: {
  status: V3ClauseStatus;
}) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]",
        config.className
      )}
    >
      {config.label}
    </span>
  );
}
