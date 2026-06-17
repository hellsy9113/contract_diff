// src/lib/contract/validate.ts

import { ContractFile } from "@/types/contract";

/**
 * Maximum allowed file size.
 *
 * Currently: 20 MB
 */
const MAX_FILE_SIZE = 20 * 1024 * 1024;

/**
 * Ensures the uploaded file is a PDF.
 */
function validateFileType(contract: ContractFile) {
  if (contract.type !== "application/pdf") {
    throw new Error("Only PDF files are supported.");
  }
}

/**
 * Ensures the uploaded file does not exceed
 * the maximum allowed size.
 */
function validateFileSize(contract: ContractFile) {
  if (contract.size > MAX_FILE_SIZE) {
    throw new Error("Maximum file size is 20 MB.");
  }
}

/**
 * Public validator used before comparison.
 *
 * Additional rules can be added here later
 * without changing the rest of the application.
 */
export function validateContract(contract: ContractFile) {
  validateFileType(contract);
  validateFileSize(contract);
}