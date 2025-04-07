import { z } from "zod";

import { errorResponses } from "../../utils/http.js";

export const queryStringSchema = z.object({
  limit: z.coerce.number().optional().default(10),
  page: z.coerce.number().optional().default(1),
});

export const getCustomersSchema = {
  tags: ["customers"],
  queryString: queryStringSchema,
  response: {
    200: z.object({
      total: z.number(),
      totalItems: z.number(),
      totalPage: z.number(),
    }),
    ...errorResponses,
  },
};

export type GetCustomersQueryString = z.infer<typeof queryStringSchema>;
