import Link from "next/link";

import {
  ArrowRight,
  FileSearch,
  FileStack,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import DemoComparisonPreview from "@/components/contract/DemoComparisonPreview";

const features = [
  {
    title: "Upload two contract versions",
    description:
      "Separate original and revised agreements with clear reviewer-friendly inputs.",
    icon: FileStack,
  },
  {
    title: "Surface legal and commercial changes",
    description:
      "Highlight additions, deletions, and modifications in the revised PDF output.",
    icon: FileSearch,
  },
  {
    title: "Share a review-ready artifact",
    description:
      "Hand legal, procurement, or finance teams a single annotated PDF they can act on.",
    icon: ShieldCheck,
  },
];

const steps = [
  "Upload the earlier contract version.",
  "Upload the newer contract version.",
  "Review the annotated PDF with highlighted changes.",
];

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#fafaf9_0%,#f8fafc_55%,#eef2ff_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_28%),radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_22%),linear-gradient(to_right,rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:auto,auto,28px_28px,28px_28px]" />

      <section className="relative mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 xl:grid-cols-[minmax(0,1fr)_420px]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 shadow-sm backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-sky-600" />
              Contract review, simplified
            </div>

            <h1 className="mt-6 max-w-4xl font-heading text-5xl leading-[1.05] text-slate-950 sm:text-6xl">
              Contract changes, explained with review-ready clarity.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
              Contract Diff helps teams compare two versions of an agreement and
              produce an annotated PDF that clearly shows what changed, where it
              changed, and why it matters.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_20px_60px_-30px_rgba(15,23,42,0.6)] transition hover:bg-sky-700"
              >
                Start comparing
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/#demo"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/85 px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur transition hover:border-slate-300 hover:bg-slate-50"
              >
                View product demo
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-xs text-slate-600">
              <Benefit label="Lightweight legal-tech workspace" />
              <Benefit label="Designed for PDF-based review flows" />
              <Benefit label="Annotated output, not vague summaries" />
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white/88 p-6 shadow-[0_32px_80px_-50px_rgba(15,23,42,0.45)] backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Why it feels usable
            </p>

            <div className="mt-5 space-y-4">
              <HeroMetric
                title="Clause-aware output"
                description="Added, deleted, and modified text is surfaced directly in the revised agreement."
              />
              <HeroMetric
                title="Faster stakeholder review"
                description="Commercial, procurement, and legal teams get the same annotated source of truth."
              />
              <HeroMetric
                title="Clean reviewer workflow"
                description="Upload, compare, review, and download without leaving the page."
              />
            </div>
          </div>
        </div>

        <section className="mt-14 grid gap-6 md:grid-cols-3">
          {features.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="rounded-[28px] border border-slate-200 bg-white/88 p-6 shadow-[0_24px_70px_-45px_rgba(15,23,42,0.35)] backdrop-blur"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                <Icon className="h-5 w-5" />
              </div>

              <h2 className="mt-5 text-xl font-semibold text-slate-950">
                {title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {description}
              </p>
            </div>
          ))}
        </section>

        <DemoComparisonPreview id="demo" className="mt-16" />

        <section className="mt-16 rounded-[32px] border border-slate-200 bg-white/88 p-8 shadow-[0_24px_70px_-45px_rgba(15,23,42,0.35)] backdrop-blur">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                How it works
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-950">
                From upload to annotated output in three steps
              </h2>
            </div>

            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white"
            >
              Already have an account? Log in
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step}
                className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-sm font-semibold text-sky-700 shadow-sm">
                  {index + 1}
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-700">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

function Benefit({
  label,
}: {
  label: string;
}) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 shadow-sm backdrop-blur">
      {label}
    </span>
  );
}

function HeroMetric({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-4">
      <h2 className="text-sm font-semibold text-slate-950">
        {title}
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        {description}
      </p>
    </div>
  );
}
