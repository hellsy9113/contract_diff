"use client";

type PdfResultViewerProps = {
  pdfUrl: string;
  filename?: string;
};

export default function PdfResultViewer({
  pdfUrl,
  filename = "annotated-contract.pdf",
}: PdfResultViewerProps) {
  return (
    <section className="mt-8 rounded-lg border bg-white p-4 shadow-sm">
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-neutral-950">
            Annotated PDF Ready
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Review the generated contract diff below.
          </p>
        </div>

        <a
          href={pdfUrl}
          download={filename}
          className="inline-flex items-center justify-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800"
        >
          Download PDF
        </a>
      </div>

      <div className="h-[70vh] min-h-[480px] overflow-hidden rounded-lg border bg-neutral-100">
        <iframe
          src={pdfUrl}
          title="Annotated contract PDF"
          className="h-full w-full"
        />
      </div>
    </section>
  );
}
