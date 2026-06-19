"use client";

import Link from "next/link";

import { GitCompare } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-[rgba(250,250,249,0.82)] backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
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
              AI contract comparison
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
          <Link
            href="/#demo"
            className="transition hover:text-slate-950"
          >
            Demo
          </Link>
          <Link
            href="/login"
            className="transition hover:text-slate-950"
          >
            Login
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 sm:inline-flex"
          >
            Log in
          </Link>

          <Link
            href="/signup"
            className="inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
          >
            Start free
          </Link>
        </div>
      </div>
    </header>
  );
}
