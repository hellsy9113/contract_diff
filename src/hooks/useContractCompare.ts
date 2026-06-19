"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  compareContracts,
  CompareEngineResponse,
} from "@/lib/contractEngine";

type CompareState = {
  loading: boolean;
  result: CompareEngineResponse | null;
  pdfUrl: string | null;
  error: string | null;
};

const initialState: CompareState = {
  loading: false,
  result: null,
  pdfUrl: null,
  error: null,
};

export function useContractCompare() {
  const pdfUrlRef = useRef<string | null>(null);
  const [state, setState] =
    useState<CompareState>(initialState);

  const revokePdfUrl = useCallback(() => {
    if (pdfUrlRef.current) {
      URL.revokeObjectURL(pdfUrlRef.current);
      pdfUrlRef.current = null;
    }
  }, []);

  const resetResult = useCallback(() => {
    revokePdfUrl();
    setState(initialState);
  }, [revokePdfUrl]);

  const compare = useCallback(
    async (
      originalFile: File,
      revisedFile: File
    ): Promise<CompareEngineResponse> => {
      revokePdfUrl();

      setState({
        loading: true,
        result: null,
        pdfUrl: null,
        error: null,
      });

      try {
        const result = await compareContracts(
          originalFile,
          revisedFile
        );

        if (result.kind === "pdf") {
          const pdfUrl = URL.createObjectURL(
            result.blob
          );

          pdfUrlRef.current = pdfUrl;

          setState({
            loading: false,
            result,
            pdfUrl,
            error: null,
          });

          return result;
        }

        setState({
          loading: false,
          result,
          pdfUrl: null,
          error:
            result.kind === "failed"
              ? result.message
              : null,
        });

        return result;
      } catch (error) {
        const failedResult: CompareEngineResponse = {
          kind: "failed",
          message:
            error instanceof Error
              ? error.message
              : "Something went wrong.",
        };

        setState({
          loading: false,
          result: failedResult,
          pdfUrl: null,
          error: failedResult.message,
        });

        return failedResult;
      }
    },
    [revokePdfUrl]
  );

  useEffect(() => revokePdfUrl, [revokePdfUrl]);

  return {
    loading: state.loading,
    result: state.result,
    pdfUrl: state.pdfUrl,
    error: state.error,
    compare,
    resetResult,
  };
}
