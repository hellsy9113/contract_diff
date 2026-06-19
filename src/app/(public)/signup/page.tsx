"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { signupSchema } from "@/schemas/signupSchema";

type SignUpForm = z.infer<typeof signupSchema>;
type ErrorResponse = {
    message?: string;
};

export default function LoginPage() {
    const router = useRouter();

    const form = useForm<SignUpForm>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: SignUpForm) {
        try {
            await axios.post("/api/signup", values);

            router.push("/verify-email");
            router.refresh();
        } catch (error) {
            const message =
                axios.isAxiosError<ErrorResponse>(error)
                    ? error.response?.data?.message
                    : undefined;

            toast.error(
                message ?? "Sign up failed. Please try again."
            );
        }
    }

    return (
        <div className="mx-auto flex min-h-[calc(100svh-72px)] w-full max-w-7xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">

            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white/90 p-8 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.3)] backdrop-blur">

                <h1 className="mb-6 text-3xl font-bold">
                    Sign-up
                </h1>

                <Form {...form}>

                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Full Name
                                    </FormLabel>

                                    <FormControl>
                                        <Input
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                            Register
                        </Button>

                    </form>

                </Form>

                <p className="mt-6 text-center text-sm">

                     Have an account?{" "}

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
