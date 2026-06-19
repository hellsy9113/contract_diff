"use client";

import { useState } from "react";

import axios from "axios";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ErrorResponse = {
  message?: string;
};

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  async function onSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "/api/modify",
        {
          email,
        }
      );

      setSuccess(
        response.data.message ??
          "If an account exists for this email, a password reset link has been sent."
      );
    } catch (submitError) {
      const message =
        axios.isAxiosError<ErrorResponse>(
          submitError
        )
          ? submitError.response?.data?.message
          : undefined;

      setError(
        message ??
          "Unable to send a reset link right now."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-md rounded-xl border p-8">
        <h1 className="mb-3 text-3xl font-bold">
          Forgot password
        </h1>

        <p className="mb-6 text-sm text-muted-foreground">
          Enter your email and we&apos;ll send you a
          password reset link.
        </p>

        {success ? (
          <p className="mb-5 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
            {success}
          </p>
        ) : null}

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
              htmlFor="email"
              className="text-sm font-medium"
            >
              Email
            </label>

            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            Send reset link
          </Button>
        </form>

        <p className="mt-6 text-center text-sm">
          Remembered your password?{" "}
          <Link
            href="/login"
            className="font-medium underline"
          >
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
