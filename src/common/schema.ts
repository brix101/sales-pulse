import { z } from "zod";

export const queryStringSchema = z.object({
  limit: z.coerce.number().optional().default(10),
  page: z.coerce.number().optional().default(1),
});

export type QueryStringType = z.infer<typeof queryStringSchema>;
