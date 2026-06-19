type FileLike = {
  type: string;
  size: number;
};

export const ACCEPTED_CONTRACT_FILE_TYPE =
  "application/pdf";
export const MAX_CONTRACT_FILE_SIZE =
  20 * 1024 * 1024;

export function validateContractFile(
  file: FileLike
) {
  if (file.type !== ACCEPTED_CONTRACT_FILE_TYPE) {
    return "Only PDF files are supported right now.";
  }

  if (file.size > MAX_CONTRACT_FILE_SIZE) {
    return "File size must be under 20 MB.";
  }

  return null;
}
