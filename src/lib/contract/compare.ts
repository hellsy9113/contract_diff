// src/lib/contract/compare.ts

import {
  CompareContractsRequest,
  CompareContractsResponse,
} from "@/types/contract";

import { validateContract } from "./validate";

/**
 * Sends two contracts to the comparison service.
 *
 * At the moment this returns mocked data.
 * Later it will communicate with the backend API.
 */
export async function compareContracts({
  original,
  revised,
}: CompareContractsRequest): Promise<CompareContractsResponse> {
  /**
   * Validate contracts before making
   * any network request.
   */
  validateContract(original);
  validateContract(revised);

  /**
   * Simulate a backend request.
   */
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    success: true,
    message: "Comparison completed successfully.",
  };
}