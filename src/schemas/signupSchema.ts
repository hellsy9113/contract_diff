import { email } from "zod";
import {z} from "zod"

export const signupSchema=z.object({
    email:z
    .string()
    .email({message:"invalid email address"}),

    password:
     z.string()
     .min(8,{message:"invalid email address"})
     .max(50),

    fullName:z
    .string()
      .min(2,{message:"iname must greater than 1 character"})
     .max(100),

});
export type SignupInput = z.infer<typeof signupSchema>;