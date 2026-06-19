"use client";

import { Download, ExternalLink } from "lucide-react";

type ResultActionsProps = {
  pdfUrl: string;
  filename: string;
};

export default function ResultActions({
  pdfUrl,
  filename,
}: ResultActionsProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a
        href={pdfUrl}
        download={filename}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:bg-sky-700"
      >
        <Download className="h-4 w-4" />
        Download annotated PDF
      </a>

      <a
        href={pdfUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
      >
        <ExternalLink className="h-4 w-4" />
        Open in new tab
      </a>
    </div>
  );
}
