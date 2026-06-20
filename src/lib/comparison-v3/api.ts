import type {
  ComparisonV3ApiResponse,
} from "@/types/comparison-v3";

export async function compareAndSaveV3(params: {
  original: File;
  revised: File;
}): Promise<{ comparisonId: string }> {
  const formData = new FormData();

  formData.append("original", params.original);
  formData.append("revised", params.revised);

  const response = await fetch("/api/comparisons/v3", {
    method: "POST",
    body: formData,
  });

  const json =
    (await response.json().catch(() => null)) as ComparisonV3ApiResponse | null;

  if (!response.ok || !json || !json.success) {
    throw new Error(
      json && !json.success
        ? json.message
        : "Could not save comparison."
    );
  }

  return {
    comparisonId: json.comparisonId,
  };
}
