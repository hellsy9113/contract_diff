
"use client";
import { compareContracts } from "@/lib/contract/compare";
import { useState } from "react";

import { ContractFile } from "@/types/contract";

export function useContractUpload() {
  /**
   * Original contract selected by the user.
   */
  const [originalContract, setOriginalContract] =
    useState<ContractFile | null>(null);

  /**
   * Revised contract selected by the user.
   */
  const [revisedContract, setRevisedContract] =
    useState<ContractFile | null>(null);

  /**
   * Indicates whether a comparison request
   * is currently running.
   */
  const [loading, setLoading] = useState(false);

  /**
   * Stores any user-facing error message.
   */
  const [error, setError] = useState<string | null>(null);

  /**
   * Converts a browser File into our
   * ContractFile domain model.
   */
  const createContract = (file: File): ContractFile => ({
    file,
    name: file.name,
    size: file.size,
    type: file.type,
  });

  /**
   * Store original contract.
   */
  const setOriginal = (file: File) => {
    setOriginalContract(createContract(file));
  };

  /**
   * Store revised contract.
   */
  const setRevised = (file: File) => {
    setRevisedContract(createContract(file));
  };

  /**
   * Remove original contract.
   */
  const removeOriginal = () => {
    setOriginalContract(null);
  };

  /**
   * Remove revised contract.
   */
  const removeRevised = () => {
    setRevisedContract(null);
  };

  /**
   * Reset the entire workflow.
   */
  const reset = () => {
    setOriginalContract(null);
    setRevisedContract(null);
    setLoading(false);
    setError(null);
  };

  /**
   * Starts the comparison process.
/**
 * Starts the contract comparison workflow.
 *
 * The hook is responsible for orchestrating the process,
 * while the service layer performs validation and
 * communicates with the backend.
 */
const compare = async () => {
  if (!originalContract || !revisedContract) {
    setError("Please upload both contracts.");
    return;
  }

  try {
    setLoading(true);
    setError(null);

    const response = await compareContracts({
      original: originalContract,
      revised: revisedContract,
    });

    if (!response.success) {
      throw new Error(response.message);
    }

    console.log(response.message);

    // Later:
    // router.push(`/compare/${response.jobId}`)
    // or
    // setComparisonResult(response.data)

  } catch (error) {
    if (error instanceof Error) {
      setError(error.message);
    } else {
      setError("Failed to compare contracts.");
    }
  } finally {
    setLoading(false);
  }
};

  return {
    originalContract,
    revisedContract,

    loading,
    error,

    setOriginal,
    setRevised,

    removeOriginal,
    removeRevised,

    compare,

    reset,
  };
}