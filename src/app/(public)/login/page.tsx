"use client";

import { Suspense } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "@/schemas/loginSchema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

type LoginForm = z.infer<typeof loginSchema>;
type ErrorResponse = {
    message?: string;
};

export default function LoginPage() {
    return (
        <Suspense fallback={<LoginPageFallback />}>
            <LoginFormContent />
        </Suspense>
    );
}

function LoginPageFallback() {
    return (
        <div className="mx-auto flex min-h-[calc(100svh-72px)] w-full max-w-7xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white/90 p-8 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.3)] backdrop-blur">
                <h1 className="mb-6 text-3xl font-bold">
                    Login
                </h1>
            </div>
        </div>
    );
}

function LoginFormContent() {
    const router = useRouter();

    const form = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const searchParams = useSearchParams();

    const verified =
        searchParams.get("verified") === "true";
    const passwordUpdated =
        searchParams.get("password_updated") ===
        "true";
    const authError =
        searchParams.get("error");

    async function onSubmit(values: LoginForm) {
        try {
            await axios.post("/api/login", values);

            router.push("/dashboard");
            router.refresh();
        } catch (error) {
            const message =
                axios.isAxiosError<ErrorResponse>(error)
                    ? error.response?.data?.message
                    : undefined;

            toast.error(
                message ?? "Login failed. Please check your credentials."
            );
        }
    }

    return (
        <div className="mx-auto flex min-h-[calc(100svh-72px)] w-full max-w-7xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">

            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white/90 p-8 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.3)] backdrop-blur">

                <h1 className="mb-6 text-3xl font-bold">
                    Login
                </h1>

                {verified ? (
                    <p className="mb-5 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
                        Email verified. You can now log in.
                    </p>
                ) : null}

                {passwordUpdated ? (
                    <p className="mb-5 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
                        Password updated. You can now log in.
                    </p>
                ) : null}

                {authError ? (
                    <p className="mb-5 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                        {authError === "missing_code"
                            ? "The link is missing required authentication information."
                            : "The authentication link is invalid or has expired."}
                    </p>
                ) : null}

                <Form {...form}>

                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-5"
                    >

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>

                                    <FormLabel>
                                        Email
                                    </FormLabel>

                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="john@example.com"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />

                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>

                                    <FormLabel>
                                        Password
                                    </FormLabel>

                                    <FormControl>
                                        <Input
                                            type="password"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />

                                </FormItem>
                            )}
                        />

                        <Button type="submit"
                            className="w-full"
                            disabled={form.formState.isSubmitting}
                        >
                            Login
                        </Button>

                    </form>

                </Form>

                <p className="mt-6 text-center text-sm">
                    <Link
                        href="/forgot-password"
                        className="font-medium underline"
                    >
                        Forgot password?
                    </Link>
                </p>

                <p className="mt-4 text-center text-sm">

                    Don&apos;t have an account?{" "}

                    <Link
                        href="/signup"
                        className="font-medium underline"
                    >
                        Sign up
                    </Link>

                </p>
              
            </div>

        </div>
    );
}
