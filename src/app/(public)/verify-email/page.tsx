import Link from "next/link";

import { Button } from "@/components/ui/button";
export default function VerificationPage() {

    return (
        <div className="container flex min-h-[80vh] items-center justify-center">
            <h1>Verify your email</h1>

            <p>
                We&apos;ve sent a verification link to your email address.
                Please click the link before logging in.
            </p>

            <Button>
                <Link href="/login">Go to Login</Link>
            </Button>
        </div>
    )
}
