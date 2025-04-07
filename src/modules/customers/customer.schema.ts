import { z } from "zod";

import { queryStringSchema } from "../../common/schema.js";
import { errorResponses } from "../../utils/http.js";

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
