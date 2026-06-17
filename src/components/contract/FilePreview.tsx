"use client";

import { FileText, Trash2 } from "lucide-react";

import { formatFileSize } from "@/lib/contract/format";
import { ContractFile } from "@/types/contract";

interface FilePreviewProps {
  /** Currently selected contract */
  file: ContractFile;

  /** Remove the selected contract */
  onRemove: () => void;
}

export default function FilePreview({
  file,
  onRemove,
}: FilePreviewProps) {
  /**
   * Convert bytes into a readable format.
   *
   * Examples:
   * 1024        -> 1 KB
   * 1048576     -> 1 MB
   */
  const formatSize = formatFileSize;

  return (
    <div className="w-full rounded-xl border bg-neutral-50 p-4">
      <div className="flex items-center justify-between">

        {/* File Information */}
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-black p-3 text-white">
            <FileText size={20} />
          </div>

          <div>
            {/* Long names wrap instead of overflowing */}
            <p className="max-w-xs break-all font-semibold">
              {file.name}
            </p>

            <p className="mt-1 text-sm text-neutral-500">
              {formatSize(file.size)}
            </p>
          </div>
        </div>

        {/* Remove Button */}
        <button
          type="button"
          aria-label={`Remove ${file.name}`}
          onClick={(event) => {
            event.stopPropagation();
            onRemove();
          }}
          className="rounded-lg p-2 text-neutral-500 transition hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 size={18} />
        </button>

      </div>
    </div>
  );
}
