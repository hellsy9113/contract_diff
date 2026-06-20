import CompareUploadPanel from "@/components/comparison-v3/CompareUploadPanel";

export default function ComparePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f8fafc_0%,#f3f4f6_45%,#eef2ff_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.08),transparent_25%),radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_20%),linear-gradient(to_right,rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:auto,auto,28px_28px,28px_28px]" />
      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <CompareUploadPanel />
      </div>
    </div>
  );
}
