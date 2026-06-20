"use client";

import type { V3DiffToken } from "@/types/comparison-v3";

export default function DiffTokenRenderer({
  tokens,
}: {
  tokens: V3DiffToken[];
}) {
  return (
    <p className="whitespace-pre-wrap break-words font-mono text-[13px] leading-7 text-slate-700">
      {tokens.map((token, index) => (
        <span
          key={`${token.type}-${index}-${token.text}`}
          className={getTokenClassName(token.type)}
        >
          {token.text}
        </span>
      ))}
    </p>
  );
}

function getTokenClassName(type: V3DiffToken["type"]) {
  switch (type) {
    case "insert":
      return "rounded bg-emerald-100/90 px-0.5 text-emerald-900";
    case "delete":
      return "rounded bg-rose-100/80 px-0.5 text-rose-700 line-through decoration-rose-500 decoration-2";
    default:
      return "";
  }
}
