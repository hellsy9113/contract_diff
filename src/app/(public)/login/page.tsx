"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "@/schemas/loginSchema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
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
    async function onSubmit(values: LoginForm) {
        try {
            await axios.post("/api/login", values);

            router.push("/dashboard");
            router.refresh();
        } catch (error: any) {
            alert(
                error.response?.data?.message ??
                    "Login failed"
            );
        }
    }

    return (
        <div className="container flex min-h-[80vh] items-center justify-center">

            <div className="w-full max-w-md rounded-xl border p-8">

                <h1 className="mb-6 text-3xl font-bold">
                    Login
                </h1>

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

                    Don't have an account?{" "}

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