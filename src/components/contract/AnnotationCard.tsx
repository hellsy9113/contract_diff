"use client";

import {
  FileText,
  PencilLine,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

import ChangeBadge, { ChangeType } from "./ChangeBadge";

export interface Annotation {
  id: string;
  type: ChangeType;
  page: number;
  clause: string;
  explanation: string;
}

interface AnnotationCardProps {
  annotation: Annotation;
}

export default function AnnotationCard({
  annotation,
}: AnnotationCardProps) {
  const Icon = iconMap[annotation.type];

  return (
    <div className="rounded-[24px] border border-slate-200 bg-white/90 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-35px_rgba(15,23,42,0.35)]">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-50 text-slate-700">
            <Icon className="h-4 w-4" />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Clause change
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Page {annotation.page}
            </p>
          </div>
        </div>

        <ChangeBadge type={annotation.type} />
      </div>

      <h4 className="text-sm font-semibold text-slate-950">
        {annotation.clause}
      </h4>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {annotation.explanation}
      </p>
    </div>
  );
}

const iconMap: Record<ChangeType, typeof FileText> = {
  added: Sparkles,
  deleted: ShieldAlert,
  modified: PencilLine,
};
