import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import ClauseComparisonPage from "@/components/comparison-v3/ClauseComparisonPage";
import DeleteComparisonButton from "@/components/comparison-v3/DeleteComparisonButton";
import {
  ComparisonV3StorageError,
  getComparisonV3,
} from "@/lib/comparison-v3/db";
import { createClient } from "@/lib/supabase/server";

export default async function ComparisonDetailPage({
  params,
}: {
  params: Promise<{ comparisonId: string }>;
}) {
  const { comparisonId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  let comparisonData:
    | Awaited<
        ReturnType<typeof getComparisonV3>
      >
    | null = null;

  try {
    comparisonData = await getComparisonV3({
      supabase,
      userId: user.id,
      comparisonId,
    });
  } catch (error) {
    if (
      error instanceof ComparisonV3StorageError &&
      error.kind === "not_found"
    ) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#f3f4f6_45%,#eef2ff_100%)]">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          <section className="rounded-[28px] border border-amber-200 bg-amber-50/90 p-8 shadow-sm">
            <h1 className="text-2xl font-semibold text-amber-950">
              Comparison storage is not ready
            </h1>
            <p className="mt-3 text-sm leading-7 text-amber-900">
              {error instanceof Error
                ? error.message
                : "This comparison cannot be opened right now."}
            </p>
            <Link
              href="/dashboard/comparisons"
              className="mt-6 inline-flex rounded-full border border-amber-300 bg-white px-4 py-2 text-sm font-semibold text-amber-950 transition hover:bg-amber-100"
            >
              Back to comparisons
            </Link>
          </section>
        </div>
      </div>
    );
  }

  const { comparison, clauses } = comparisonData;

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#f3f4f6_45%,#eef2ff_100%)]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/dashboard/comparisons"
            className="inline-flex w-fit items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Back to comparisons
          </Link>

          <DeleteComparisonButton
            comparisonId={comparisonId}
            redirectToList
          />
        </div>

        <ClauseComparisonPage
          comparison={comparison}
          clauses={clauses}
        />
      </div>
    </div>
  );
}
