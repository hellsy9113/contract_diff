"use client";

import { cn } from "@/lib/utils";

export type ChangeType =
  | "added"
  | "deleted"
  | "modified";

interface ChangeBadgeProps {
  type: ChangeType;
  className?: string;
}

const config: Record<
  ChangeType,
  { label: string; classes: string }
> = {
  added: {
    label: "Added",
    classes:
      "border-diff-added-border bg-diff-added-bg text-diff-added",
  },
  deleted: {
    label: "Deleted",
    classes:
      "border-diff-deleted-border bg-diff-deleted-bg text-diff-deleted",
  },
  modified: {
    label: "Modified",
    classes:
      "border-diff-modified-border bg-diff-modified-bg text-diff-modified",
  },
};

export default function ChangeBadge({
  type,
  className,
}: ChangeBadgeProps) {
  const { label, classes } = config[type];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]",
        classes,
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}
