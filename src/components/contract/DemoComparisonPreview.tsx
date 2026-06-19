"use client";

import {
  Eye,
  FileText,
  Scale,
  Sparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";

import AnnotationCard, {
  Annotation,
} from "./AnnotationCard";

type MockContractLine = {
  id: string;
  text: string;
  highlight:
    | "added"
    | "deleted"
    | "modified"
    | null;
  oldText?: string;
};

const MOCK_CONTRACT_LINES: MockContractLine[] = [
  {
    id: "l1",
    text: "PROFESSIONAL SERVICES AGREEMENT",
    highlight: null,
  },
  {
    id: "l2",
    text: "This Agreement is entered into as of January 1, 2026...",
    highlight: null,
  },
  { id: "l3", text: "", highlight: null },
  {
    id: "l4",
    text: "4. PAYMENT TERMS",
    highlight: null,
  },
  {
    id: "l5",
    text: "4.1 The Client shall pay all invoices within 30 days of receipt.",
    highlight: null,
  },
  {
    id: "l6",
    text: "4.2 Payment shall be made within 15 days of invoice date.",
    highlight: "modified",
    oldText:
      "4.2 Payment shall be made within 30 days of invoice date.",
  },
  { id: "l7", text: "", highlight: null },
  {
    id: "l8",
    text: "6. TERMINATION",
    highlight: null,
  },
  {
    id: "l9",
    text: "6.1 Either party may terminate this Agreement with 30 days written notice.",
    highlight: "modified",
    oldText:
      "6.1 Either party may terminate this Agreement with 60 days written notice.",
  },
  { id: "l10", text: "", highlight: null },
  {
    id: "l11",
    text: "8. CONFIDENTIALITY",
    highlight: null,
  },
  {
    id: "l12",
    text: "8.1 Both parties agree to maintain strict confidentiality of all proprietary information shared during the term of this Agreement.",
    highlight: null,
  },
  {
    id: "l13",
    text: "8.2 All confidential materials must be returned or destroyed within 10 business days of termination.",
    highlight: "added",
  },
  { id: "l14", text: "", highlight: null },
  {
    id: "l15",
    text: "10. LIABILITY",
    highlight: null,
  },
  {
    id: "l16",
    text: "10.1 The aggregate liability of either party shall not exceed the total fees paid under this Agreement.",
    highlight: null,
  },
  {
    id: "l17",
    text: "10.2 Neither party shall be liable for indirect, incidental, or consequential damages.",
    highlight: "deleted",
  },
];

const MOCK_ANNOTATIONS: Annotation[] = [
  {
    id: "a1",
    type: "modified",
    page: 2,
    clause: "Clause 4.2 — Payment Terms",
    explanation:
      'Payment deadline changed from "30 days" to "15 days". This significantly accelerates cash flow requirements.',
  },
  {
    id: "a2",
    type: "modified",
    page: 3,
    clause: "Clause 6.1 — Termination Notice",
    explanation:
      'Notice period reduced from "60 days" to "30 days". This gives less time for transition planning.',
  },
  {
    id: "a3",
    type: "added",
    page: 4,
    clause: "Clause 8.2 — Material Return",
    explanation:
      "New clause requiring return or destruction of confidential materials within 10 business days of termination.",
  },
  {
    id: "a4",
    type: "deleted",
    page: 5,
    clause: "Clause 10.2 — Liability Limitation",
    explanation:
      "Consequential damages exclusion clause was removed, potentially increasing exposure to indirect claims.",
  },
];

type DemoComparisonPreviewProps = {
  id?: string;
  className?: string;
};

export default function DemoComparisonPreview({
  id,
  className,
}: DemoComparisonPreviewProps) {
  return (
    <section
      id={id}
      className={cn("mt-16", className)}
    >
      <div className="rounded-[32px] border border-slate-200 bg-white/85 p-6 shadow-[0_32px_80px_-48px_rgba(15,23,42,0.4)] backdrop-blur sm:p-8">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              <Eye className="h-3.5 w-3.5 text-sky-600" />
              Product walkthrough
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              See how Contract Diff explains changes
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Review-ready highlights, clause-level explanations, and a clean
              audit trail of what changed, where it changed, and why it
              matters.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <LegendSwatch label="Added" tone="added" />
            <LegendSwatch label="Deleted" tone="deleted" />
            <LegendSwatch label="Modified" tone="modified" />
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_420px]">
          <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50/80">
            <div className="flex items-center justify-between border-b border-slate-200 bg-white/80 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                </div>

                <span className="text-xs font-medium text-slate-400">
                  revised_service_agreement_v2.pdf
                </span>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                <FileText className="h-3.5 w-3.5" />
                Mock PDF preview
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <div className="rounded-[24px] bg-white p-6 shadow-inner ring-1 ring-slate-100">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Contract page
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-slate-950">
                      Annotated changes in context
                    </h3>
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-xs text-slate-500">
                    <Scale className="h-3.5 w-3.5 text-sky-600" />
                    Clauses aligned
                  </div>
                </div>

                <div className="space-y-0 font-mono text-[13px] leading-relaxed text-slate-700">
                  {MOCK_CONTRACT_LINES.map((line) =>
                    line.text === "" ? (
                      <div key={line.id} className="h-4" />
                    ) : (
                      <div
                        key={line.id}
                        className={`rounded-xl px-3 py-2 ${getLineClasses(line.highlight)}`}
                      >
                        {line.oldText ? (
                          <p className="mb-1 text-[11px] text-slate-400 line-through">
                            {line.oldText}
                          </p>
                        ) : null}

                        <p>{line.text}</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-5 shadow-sm">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Change annotations
                </p>
                <h3 className="mt-2 text-xl font-semibold text-slate-950">
                  What changed and why it matters
                </h3>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
                <Sparkles className="h-5 w-5" />
              </div>
            </div>

            <div className="space-y-4">
              {MOCK_ANNOTATIONS.map((annotation) => (
                <AnnotationCard
                  key={annotation.id}
                  annotation={annotation}
                />
              ))}
            </div>

            <div className="mt-5 rounded-[24px] border border-slate-200 bg-white p-4">
              <p className="text-sm font-semibold text-slate-900">
                Why teams use this view
              </p>

              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                <li>Pinpoint redlines before legal review starts.</li>
                <li>See commercial impact on payment, notice, and liability.</li>
                <li>Share a single annotated PDF with stakeholders.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LegendSwatch({
  label,
  tone,
}: {
  label: string;
  tone: "added" | "deleted" | "modified";
}) {
  const className = {
    added: "bg-diff-added",
    deleted: "bg-diff-deleted",
    modified: "bg-diff-modified",
  }[tone];

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600">
      <span
        className={cn(
          "inline-block h-2.5 w-2.5 rounded-full",
          className
        )}
      />
      {label}
    </div>
  );
}

function getLineClasses(highlight: string | null) {
  switch (highlight) {
    case "added":
      return "border-l-[3px] border-l-diff-added bg-diff-added-bg";
    case "deleted":
      return "border-l-[3px] border-l-diff-deleted bg-diff-deleted-bg text-slate-400 line-through";
    case "modified":
      return "border-l-[3px] border-l-diff-modified bg-diff-modified-bg";
    default:
      return "";
  }
}
