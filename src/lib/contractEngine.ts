export type ComparePdfSuccess = {
  kind: "pdf";
  blob: Blob;
  filename: string;
};

export type CompareRejected = {
  kind: "rejected";
  status: "rejected";
  reason: string;
  message: string;
  similarity_score?: number;
  minimum_required_score?: number;
};

export type CompareFailed = {
  kind: "failed";
  message: string;
};

export type CompareEngineResponse =
  | ComparePdfSuccess
  | CompareRejected
  | CompareFailed;

function getEngineUrl() {
  const url = process.env.NEXT_PUBLIC_CONTRACT_ENGINE_URL;

  if (!url) {
    throw new Error("NEXT_PUBLIC_CONTRACT_ENGINE_URL is not configured.");
  }

  return url.replace(/\/$/, "");
}

function extractFilename(contentDisposition: string | null) {
  if (!contentDisposition) {
    return "annotated-contract.pdf";
  }

  const encodedMatch = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i);

  if (encodedMatch?.[1]) {
    return decodeURIComponent(encodedMatch[1]);
  }

  const match = contentDisposition.match(/filename="?([^"]+)"?/i);

  return match?.[1] ?? "annotated-contract.pdf";
}

export async function compareContracts(
  originalFile: File,
  revisedFile: File
): Promise<CompareEngineResponse> {
  const formData = new FormData();

  formData.append("original_file", originalFile);
  formData.append("revised_file", revisedFile);

  const response = await fetch(`${getEngineUrl()}/compare`, {
    method: "POST",
    body: formData,
  });

  const contentType = response.headers.get("content-type");

  if (response.ok && contentType?.includes("application/pdf")) {
    const blob = await response.blob();

    return {
      kind: "pdf",
      blob,
      filename: extractFilename(response.headers.get("content-disposition")),
    };
  }

  const json = await response.json().catch(() => null);

  if (json?.status === "rejected") {
    return {
      kind: "rejected",
      status: "rejected",
      reason: json.reason ?? "UNKNOWN_REJECTION",
      message:
        json.message ??
        "The uploaded documents could not be compared safely.",
      similarity_score: json.similarity_score,
      minimum_required_score: json.minimum_required_score,
    };
  }

  return {
    kind: "failed",
    message: json?.message ?? "Comparison failed.",
  };
}
