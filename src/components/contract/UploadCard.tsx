"use client";

import { useRef } from "react";
import { Upload } from "lucide-react";

import { ContractFile } from "@/types/contract";
import FilePreview from "./FilePreview";

interface UploadCardProps {
  /** Title displayed at the top of the card */
  title: string;

  /** Short description for the user */
  description: string;

  /** Currently selected contract */
  file: ContractFile | null;

  /** Called whenever a new file is selected */
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
  // Hidden file input.
  // We trigger it when the user clicks anywhere on the card.
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * Opens the native file picker.
   */
  const handleClick = () => {
    inputRef.current?.click();
  };

  /**
   * Receives the selected file and passes it
   * back to the parent component.
   *
   * No validation happens here.
   */
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    onSelect(selectedFile);
    event.target.value = "";
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer rounded-2xl border-2 border-dashed border-neutral-300 bg-white p-8 transition hover:border-black hover:shadow-md"
    >
      {/* Card Header */}
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold">{title}</h2>

        <p className="mt-2 text-sm text-neutral-500">
          {description}
        </p>
      </div>

      {/* Upload Area */}
      <div className="flex flex-col items-center justify-center gap-4 py-8">
        <Upload className="h-12 w-12 text-neutral-500" />

        {file ? (
          <FilePreview
           file={file}
           onRemove={onRemove}
           />
        ) : (
          <>
            <p className="font-medium">
              Click to upload your PDF
            </p>

            <p className="text-sm text-neutral-500">
              PDF files only
            </p>
          </>
        )}
      </div>

      {/* Hidden native file input */}
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
