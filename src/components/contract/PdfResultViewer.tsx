"use client";

import {
  CheckCircle2,
  FileSearch,
} from "lucide-react";

import ResultActions from "./ResultActions";

type PdfResultViewerProps = {
  pdfUrl: string;
  filename?: string;
};

export default function PdfResultViewer({
  pdfUrl,
  filename = "annotated-contract.pdf",
}: PdfResultViewerProps) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white/95 p-6 shadow-[0_30px_70px_-45px_rgba(15,23,42,0.4)]">
      <div className="mb-6 flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Output ready
          </div>

          <h2 className="text-2xl font-semibold text-slate-950">
            Annotated contract generated successfully
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            The revised contract has been rendered with visible additions,
            deletions, and modified clauses so your reviewers can move straight
            into analysis.
          </p>
        </div>

        <ResultActions
          pdfUrl={pdfUrl}
          filename={filename}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="h-[70vh] min-h-[440px] overflow-hidden rounded-[24px] border border-slate-200 bg-slate-100">
          <iframe
            src={pdfUrl}
            title="Annotated contract PDF"
            className="h-full w-full"
          />
        </div>

        <div className="space-y-4 rounded-[24px] border border-slate-200 bg-slate-50/80 p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-sky-700 shadow-sm">
            <FileSearch className="h-5 w-5" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-950">
              What&apos;s included
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Your output PDF is designed for fast legal and commercial review.
            </p>
          </div>

          <ul className="space-y-3 text-sm leading-6 text-slate-600">
            <li className="rounded-2xl bg-white px-4 py-3">
              Inline highlights for added, deleted, and modified text.
            </li>
            <li className="rounded-2xl bg-white px-4 py-3">
              A single file you can share with counsel or stakeholders.
            </li>
            <li className="rounded-2xl bg-white px-4 py-3">
              Download and open actions so the output is immediately usable.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
