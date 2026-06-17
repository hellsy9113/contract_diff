import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
export async function GET(request:Request)
{
        const requestUrl=new URL(request.url);
        const code=requestUrl.searchParams.get("code");
        const supabase=await createClient();

        if(code)
        {
            await supabase.auth.exchangeCodeForSession(code);
            await supabase.auth.signOut();

        }
        return NextResponse.redirect(
            new URL("/login?verified=true",requestUrl)
        )

}