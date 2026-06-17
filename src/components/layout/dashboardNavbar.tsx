"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  GitCompare,
  LayoutDashboard,
  History,
  LogOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

const DashboardNavbar = () => {
  const router = useRouter();

  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();

    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

        {/* Logo */}

        <Link
          href="/dashboard"
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border bg-muted">
            <GitCompare className="h-5 w-5" />
          </div>

          <div className="flex flex-col">
            <span className="text-lg font-bold">
              ContractDiff
            </span>

            <span className="text-xs text-muted-foreground">
              AI Contract Comparison
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">

          <Link href="/dashboard">
            <Button
              variant="ghost"
              size="sm"
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>

          <Link href="/history">
            <Button
              variant="ghost"
              size="sm"
            >
              <History className="mr-2 h-4 w-4" />
              History
            </Button>
          </Link>

          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            logout 
          </Button>

        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;