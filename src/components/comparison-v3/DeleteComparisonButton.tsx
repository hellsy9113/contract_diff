"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function DeleteComparisonButton({
  comparisonId,
  redirectToList = false,
}: {
  comparisonId: string;
  redirectToList?: boolean;
}) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (
      !window.confirm(
        "Delete this saved comparison?"
      )
    ) {
      return;
    }

    setIsDeleting(true);
    const toastId = toast.loading(
      "Deleting comparison..."
    );

    try {
      const response = await fetch(
        `/api/comparisons/v3/${comparisonId}`,
        {
          method: "DELETE",
        }
      );

      const json = (await response.json().catch(() => null)) as
        | { success?: boolean; message?: string }
        | null;

      if (!response.ok || !json?.success) {
        throw new Error(
          json?.message ??
            "Could not delete comparison."
        );
      }

      toast.dismiss(toastId);
      toast.success("Comparison deleted.");

      if (redirectToList) {
        router.push("/dashboard/comparisons");
      } else {
        router.refresh();
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not delete comparison."
      );
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <Trash2 className="h-4 w-4" />
      Delete
    </button>
  );
}
