"use client";

import { useState } from "react";

import {
  CheckCircle2,
  FileStack,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import { toast } from "sonner";

import EmptyState from "@/components/contract/EmptyState";
import LoadingState from "@/components/contract/LoadingState";
import PdfResultViewer from "@/components/contract/PdfResultViewer";
import UploadCard from "@/components/contract/UploadCard";
import { useContractCompare } from "@/hooks/useContractCompare";
import { ContractFile } from "@/types/contract";

export default function DashboardPage() {
  const [originalContract, setOriginalContract] =
    useState<ContractFile | null>(null);
  const [revisedContract, setRevisedContract] =
    useState<ContractFile | null>(null);

  const {
    loading,
    result,
    pdfUrl,
    error,
    compare,
    resetResult,
  } = useContractCompare();

  const createContract = (file: File): ContractFile => ({
    file,
    name: file.name,
    size: file.size,
    type: file.type,
  });

  const handleOriginalSelect = (file: File) => {
    resetResult();
    setOriginalContract(createContract(file));
  };

  const handleRevisedSelect = (file: File) => {
    resetResult();
    setRevisedContract(createContract(file));
  };

  const removeOriginal = () => {
    resetResult();
    setOriginalContract(null);
  };

  const removeRevised = () => {
    resetResult();
    setRevisedContract(null);
  };

  const handleCompare = async () => {
    if (!originalContract || !revisedContract) {
      toast.error(
        "Please upload both contract versions before comparing."
      );
      return;
    }

    const toastId = toast.loading(
      "Comparing contracts..."
    );

    const compareResult = await compare(
      originalContract.file,
      revisedContract.file
    );

    toast.dismiss(toastId);

    if (compareResult.kind === "pdf") {
      toast.success(
        "Annotated contract generated successfully."
      );
      return;
    }

    if (compareResult.kind === "rejected") {
      toast.error(compareResult.message);
      return;
    }

    toast.error(
      compareResult.message ??
        "Comparison failed. Please try again."
    );
  };

  const pdfFilename =
    result?.kind === "pdf"
      ? result.filename
      : "annotated-contract.pdf";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f8fafc_0%,#f3f4f6_45%,#eef2ff_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.08),transparent_25%),radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_20%),linear-gradient(to_right,rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:auto,auto,28px_28px,28px_28px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-[32px] border border-slate-200 bg-white/82 p-7 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.4)] backdrop-blur">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            <Sparkles className="h-3.5 w-3.5 text-sky-600" />
            Legal-tech workspace
          </div>

          <h1 className="mt-5 max-w-3xl font-heading text-4xl leading-tight text-slate-950 sm:text-5xl">
            Compare contract revisions without losing the nuance.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Upload the earlier and revised versions of an agreement to
            generate an annotated PDF that surfaces additions, deletions, and
            modified clauses in a clean reviewer-friendly format.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-xs text-slate-600">
            <Pill icon={ShieldCheck} label="Designed for legal review" />
            <Pill icon={FileStack} label="PDF in, annotated PDF out" />
            <Pill icon={CheckCircle2} label="Files stay selected after errors" />
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <UploadCard
            title="Original contract"
            description="Upload the earlier contract version."
            file={originalContract}
            onSelect={handleOriginalSelect}
            onRemove={removeOriginal}
          />

          <UploadCard
            title="Revised contract"
            description="Upload the newer contract version."
            file={revisedContract}
            onSelect={handleRevisedSelect}
            onRemove={removeRevised}
          />
        </section>

        <section className="mt-8 space-y-8">
          <EmptyState
            originalReady={Boolean(originalContract)}
            revisedReady={Boolean(revisedContract)}
            loading={loading}
            onCompare={handleCompare}
          />

          {loading ? (
            <LoadingState />
          ) : null}

          {!loading && error ? (
            <section className="rounded-[28px] border border-rose-200 bg-rose-50/90 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-rose-700 shadow-sm">
                  <TriangleAlert className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-rose-900">
                    Comparison failed
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-rose-800">
                    {error}
                  </p>
                </div>
              </div>
            </section>
          ) : null}

          {!loading && result?.kind === "rejected" ? (
            <section className="rounded-[28px] border border-amber-200 bg-amber-50/90 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-amber-700 shadow-sm">
                  <TriangleAlert className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-amber-950">
                    Comparison rejected for safety
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-amber-900">
                    {result.message}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3 text-sm text-amber-900">
                    {typeof result.similarity_score === "number" ? (
                      <span className="rounded-full bg-white px-3 py-1">
                        Similarity score: {result.similarity_score}%
                      </span>
                    ) : null}

                    {typeof result.minimum_required_score === "number" ? (
                      <span className="rounded-full bg-white px-3 py-1">
                        Minimum required: {result.minimum_required_score}%
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          {!loading && pdfUrl ? (
            <PdfResultViewer
              pdfUrl={pdfUrl}
              filename={pdfFilename}
            />
          ) : null}
        </section>
      </div>
    </div>
  );
}

function Pill({
  icon: Icon,
  label,
}: {
  icon: typeof ShieldCheck;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5">
      <Icon className="h-3.5 w-3.5 text-sky-600" />
      {label}
    </span>
  );
}
