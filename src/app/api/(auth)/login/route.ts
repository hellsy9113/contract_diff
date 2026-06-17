
import { validate } from "@/lib/validate";
import { loginSchema } from "@/schemas/loginSchema";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
export async function POST(req:Request) {

    try{
      
      const body= await req.json();
      const result=validate(loginSchema,body);
       if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          errors: result.error.flatten(),
        },
        { status: 400 }
      );
    }
      const {email,password}= result.data;
    const supabase=await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })
     if (error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
        {
            success:true,
             userId: data.user?.id,
            message:"Authenticated sucessfuly"
        },
        {status:200}
    )

}
catch(error)
{
    console.error(error);
   
       return NextResponse.json(
         {
           success: false,
           message: "Internal Server Error",
         },
         { status: 500 }
       );
}
}