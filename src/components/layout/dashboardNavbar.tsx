"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  GitCompare,
  Home,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";

export default function DashboardNavbar() {
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    const toastId = toast.loading("Signing out...");

    try {
      await supabase.auth.signOut();
      toast.dismiss(toastId);
      toast.success("Signed out successfully.");
      router.push("/");
      router.refresh();
    } catch {
      toast.dismiss(toastId);
      toast.error("Unable to sign out right now.");
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-[rgba(248,250,252,0.82)] backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/dashboard"
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-950 shadow-sm">
            <GitCompare className="h-5 w-5" />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-950">
              ContractDiff
            </p>
            <p className="text-xs text-slate-500">
              Review workspace
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm md:flex">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          Annotated PDF workflow
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
