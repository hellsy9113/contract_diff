"use client";

import { useMemo, useState } from "react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { compareAndSaveV3 } from "@/lib/comparison-v3/api";
import { ContractFile } from "@/types/contract";

import CompareButton from "../contract/CompareButton";
import UploadCard from "../contract/UploadCard";

export default function CompareUploadPanel() {
  const router = useRouter();
  const [originalContract, setOriginalContract] =
    useState<ContractFile | null>(null);
  const [revisedContract, setRevisedContract] =
    useState<ContractFile | null>(null);
  const [loading, setLoading] = useState(false);

  const canCompare = Boolean(
    originalContract && revisedContract && !loading
  );

  const duplicateFile = useMemo(() => {
    if (!originalContract || !revisedContract) {
      return false;
    }

    return (
      originalContract.name === revisedContract.name &&
      originalContract.size === revisedContract.size
    );
  }, [originalContract, revisedContract]);

  const createContract = (file: File): ContractFile => ({
    file,
    name: file.name,
    size: file.size,
    type: file.type,
  });

  async function handleCompare() {
    if (!originalContract || !revisedContract) {
      toast.error(
        "Please upload both contract versions before comparing."
      );
      return;
    }

    if (duplicateFile) {
      toast.error(
        "The original and revised files appear to be the same."
      );
      return;
    }

    setLoading(true);
    const toastId = toast.loading(
      "Comparing clauses..."
    );

    try {
      const { comparisonId } =
        await compareAndSaveV3({
          original: originalContract.file,
          revised: revisedContract.file,
        });

      toast.dismiss(toastId);
      toast.success("Comparison saved.");
      router.push(
        `/dashboard/comparisons/${comparisonId}`
      );
      router.refresh();
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not save comparison."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-slate-200 bg-white/88 p-7 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.4)] backdrop-blur">
        <p className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Clause compare
        </p>
        <h1 className="mt-5 text-4xl font-semibold text-slate-950">
          Generate a saved clause-level comparison
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
          Upload both PDFs to run the v3 clause engine, save the result to the
          database, and open a persistent comparison detail page.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <UploadCard
          title="Original contract"
          description="Upload the earlier contract version."
          file={originalContract}
          onSelect={(file) =>
            setOriginalContract(createContract(file))
          }
          onRemove={() => setOriginalContract(null)}
        />

        <UploadCard
          title="Revised contract"
          description="Upload the newer contract version."
          file={revisedContract}
          onSelect={(file) =>
            setRevisedContract(createContract(file))
          }
          onRemove={() => setRevisedContract(null)}
        />
      </section>

      <section className="rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Workflow status
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">
              {canCompare
                ? "Ready to compare clauses."
                : "Upload both PDFs to continue."}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              The browser calls the Next.js API, which forwards the files to the
              Python v3 clause engine, stores the result, and redirects you to
              the saved comparison page.
            </p>
            {duplicateFile ? (
              <p className="mt-3 text-sm text-rose-700">
                The selected files look identical. Please choose different
                versions before comparing.
              </p>
            ) : null}
          </div>

          <div className="w-full max-w-md">
            <CompareButton
              disabled={!canCompare || duplicateFile}
              loading={loading}
              onCompare={handleCompare}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
