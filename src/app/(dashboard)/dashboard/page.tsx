"use client";

import { useState } from "react";

import UploadCard from "@/components/contract/UploadCard";
import CompareButton from "@/components/contract/CompareButton";
import PdfResultViewer from "@/components/contract/PdfResultViewer";
import { useContractCompare } from "@/hooks/useContractCompare";
import { ContractFile } from "@/types/contract";

export default function DashboardPage() {
  const [originalContract, setOriginalContract] =
    useState<ContractFile | null>(null);
  const [revisedContract, setRevisedContract] =
    useState<ContractFile | null>(null);

  const { loading, result, pdfUrl, error, compare, resetResult } =
    useContractCompare();

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
      return;
    }

    await compare(originalContract.file, revisedContract.file);
  };

  const canCompare = Boolean(originalContract && revisedContract && !loading);
  const pdfFilename =
    result?.kind === "pdf" ? result.filename : "annotated-contract.pdf";

  return (
    <div className="min-h-screen bg-neutral-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <section className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-950">
            Contract Diff
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-neutral-600">
            Upload the original and revised contracts to generate an annotated
            revised PDF.
          </p>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <UploadCard
            title="Original Contract"
            description="Upload the earlier contract PDF."
            file={originalContract}
            onSelect={handleOriginalSelect}
            onRemove={removeOriginal}
          />

          <UploadCard
            title="Revised Contract"
            description="Upload the revised contract PDF."
            file={revisedContract}
            onSelect={handleRevisedSelect}
            onRemove={removeRevised}
          />
        </section>

        <section className="mt-8 flex justify-center lg:justify-end">
          <CompareButton
            disabled={!canCompare}
            loading={loading}
            onCompare={handleCompare}
          />
        </section>

        {loading && (
          <section className="mt-8 rounded-lg border bg-white p-5 text-sm text-neutral-600 shadow-sm">
            Processing PDFs. This may take a few seconds for larger contracts.
          </section>
        )}

        {error && (
          <section className="mt-8 rounded-lg border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            {error}
          </section>
        )}

        {result?.kind === "rejected" && (
          <section className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-5">
            <h2 className="font-semibold text-amber-900">
              Comparison Rejected
            </h2>

            <p className="mt-2 text-sm text-amber-800">{result.message}</p>

            {typeof result.similarity_score === "number" && (
              <p className="mt-2 text-sm text-amber-700">
                Similarity score: {result.similarity_score}%
              </p>
            )}

            {typeof result.minimum_required_score === "number" && (
              <p className="mt-1 text-sm text-amber-700">
                Minimum required score: {result.minimum_required_score}%
              </p>
            )}
          </section>
        )}

        {pdfUrl && (
          <PdfResultViewer pdfUrl={pdfUrl} filename={pdfFilename} />
        )}
      </div>
    </div>
  );
}
