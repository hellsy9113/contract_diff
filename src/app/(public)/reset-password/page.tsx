"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const supabase = createClient();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  async function onSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setError("");

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    const { error: updateError } =
      await supabase.auth.updateUser({
        password,
      });

    if (updateError) {
      setError(updateError.message);
      setIsSubmitting(false);
      return;
    }

    await supabase.auth.signOut();
    router.push("/login?password_updated=true");
    router.refresh();
  }

  return (
    <div className="container flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-md rounded-xl border p-8">
        <h1 className="mb-3 text-3xl font-bold">
          Reset password
        </h1>

        <p className="mb-6 text-sm text-muted-foreground">
          Choose a new password for your account.
        </p>

        {error ? (
          <p className="mb-5 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <form
          onSubmit={onSubmit}
          className="space-y-5"
        >
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium"
            >
              New password
            </label>

            <Input
              id="password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium"
            >
              Confirm new password
            </label>

            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(
                  event.target.value
                )
              }
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            Update password
          </Button>
        </form>

        <p className="mt-6 text-center text-sm">
          Back to{" "}
          <Link
            href="/login"
            className="font-medium underline"
          >
            login
          </Link>
        </p>
      </div>
    </div>
  );
}
