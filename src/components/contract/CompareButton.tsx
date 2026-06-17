// 'use client'
// interface CompareButtonProps{
//     loading?:boolean;
//     disabled?:boolean;
//     onCompare:()=>void;
// }


// import { ArrowRight, Loader2 } from "lucide-react";

// export default function CompareButton({
//     disabled=false,
//     loading=false,
//     onCompare,

// }:CompareButtonProps)
// {

// }


"use client";

import { ArrowRight, Loader2 } from "lucide-react";

interface CompareButtonProps {
  /** Disable button when comparison cannot start */
  disabled?: boolean;

  /** Indicates comparison is currently running */
  loading?: boolean;

  /** Trigger comparison */
  onCompare: () => void;
}

export default function CompareButton({
  disabled = false,
  loading = false,
  onCompare,
}: CompareButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      onClick={onCompare}
      className="
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-xl
        bg-black
        px-6
        py-3
        font-medium
        text-white
        transition-all
        hover:bg-neutral-800
        disabled:cursor-not-allowed
        disabled:bg-neutral-300
      "
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Comparing...
        </>
      ) : (
        <>
          Compare Contracts
          <ArrowRight className="h-4 w-4" />
        </>
      )}
    </button>
  );
}