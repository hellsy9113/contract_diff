// lib/validate.ts

import { ZodSchema } from "zod";

export function validate<T>(
  schema: ZodSchema<T>,
  body: unknown
) {
  return schema.safeParse(body);
}