"use client";

import {
  useCallback,
  useRef,
  useState,
} from "react";

import {
  FileUp,
  FolderUp,
  LockKeyhole,
  Upload,
} from "lucide-react";
import { toast } from "sonner";

import {
  MAX_CONTRACT_FILE_SIZE,
  validateContractFile,
} from "@/lib/contract/files";
import { ContractFile } from "@/types/contract";

import FilePreview from "./FilePreview";

interface UploadCardProps {
  title: string;
  description: string;
  file: ContractFile | null;
  onSelect: (file: File) => void;
  onRemove: () => void;
}

export default function UploadCard({
  title,
  description,
  file,
  onSelect,
  onRemove,
}: UploadCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] =
    useState(false);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const processFile = useCallback(
    (selectedFile: File) => {
      const error =
        validateContractFile(selectedFile);

      if (error) {
        toast.error(error);
        return;
      }

      onSelect(selectedFile);
    },
    [onSelect]
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    processFile(selectedFile);
    event.target.value = "";
  };

  const handleDragOver = useCallback(
    (
      event: React.DragEvent<HTMLDivElement>
    ) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(true);
    },
    []
  );

  const handleDragLeave = useCallback(
    (
      event: React.DragEvent<HTMLDivElement>
    ) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(false);
    },
    []
  );

  const handleDrop = useCallback(
    (
      event: React.DragEvent<HTMLDivElement>
    ) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(false);

      const droppedFile =
        event.dataTransfer.files?.[0];

      if (!droppedFile) {
        return;
      }

      processFile(droppedFile);
    },
    [processFile]
  );

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Upload ${title}`}
      onClick={handleClick}
      onKeyDown={(event) => {
        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
          event.preventDefault();
          handleClick();
        }
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={[
        "group relative min-h-[320px] cursor-pointer overflow-hidden rounded-[28px] border p-6 transition-all duration-200",
        isDragging
          ? "border-sky-400 bg-sky-50/70 shadow-[0_20px_60px_-30px_rgba(14,165,233,0.55)]"
          : file
            ? "border-slate-200 bg-white/90 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.3)] hover:border-slate-300"
            : "border-slate-200 bg-white/75 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.25)] hover:border-sky-300 hover:shadow-[0_24px_60px_-36px_rgba(59,130,246,0.35)]",
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.08),transparent_25%)]" />

      <div className="relative flex h-full flex-col">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
              {title}
            </p>

            <h2 className="mt-2 text-xl font-semibold text-slate-950">
              {file ? "File selected" : "Add a contract PDF"}
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600">
              {description}
            </p>
          </div>

          <div className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-[11px] font-medium text-slate-500 shadow-sm">
            PDF only
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center">
          {file ? (
            <FilePreview
              file={file}
              onChange={handleClick}
              onRemove={onRemove}
            />
          ) : (
            <div
              className={[
                "flex flex-1 flex-col items-center justify-center rounded-[24px] border border-dashed px-6 py-10 text-center transition",
                isDragging
                  ? "border-sky-400 bg-sky-50/80"
                  : "border-slate-200 bg-slate-50/70",
              ].join(" ")}
            >
              <div
                className={[
                  "flex h-[72px] w-[72px] items-center justify-center rounded-[22px] transition-colors",
                  isDragging
                    ? "bg-sky-100 text-sky-700"
                    : "bg-slate-900 text-white group-hover:bg-sky-700",
                ].join(" ")}
              >
                {isDragging ? (
                  <FileUp className="h-8 w-8" />
                ) : (
                  <Upload className="h-8 w-8" />
                )}
              </div>

              <h3 className="mt-6 text-lg font-semibold text-slate-950">
                {isDragging
                  ? "Drop the PDF to upload"
                  : "Drag a PDF here or choose a file"}
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600">
                {description}
              </p>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-slate-950/20 transition group-hover:bg-sky-700">
                <FolderUp className="h-4 w-4" />
                Choose PDF
              </div>

              <p className="mt-4 text-xs text-slate-500">
                Max {(MAX_CONTRACT_FILE_SIZE / (1024 * 1024)).toFixed(0)} MB
                {" "}· Earlier version on the left, newer version on the right
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">
          <LockKeyhole className="h-3.5 w-3.5 text-slate-400" />
          Files stay selected until you replace them or start a new comparison.
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handleChange}
        aria-label={`Select PDF for ${title}`}
      />
    </div>
  );
}
