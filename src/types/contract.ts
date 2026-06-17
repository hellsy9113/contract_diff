
/**
 * Represents a contract selected by the user.
 * At this stage, it only exists in browser memory.
 */
export interface ContractFile{
    file:File;
    name:string;
    size:number;
    type:string;
}


/**
 * Payload sent to the comparison service.
 */
export interface CompareContractsRequest{
  original:ContractFile,
  revised:ContractFile
}


/**
 * Temporary response returned by the mock API.
 * This will evolve once the comparison engine is implemented.
 */


export interface CompareContractsResponse {
  success: boolean;
  message: string;
}