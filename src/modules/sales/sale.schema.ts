import { z } from "zod";

import { queryStringSchema } from "../../common/schema.js";
import { errorResponses } from "../../utils/http.js";

export const saleQueryStringSchema = queryStringSchema.extend({
  // startDate: z.string().optional(),
  // endDate: z.string().optional(),
});

export const getSalesSchema = {
  tags: ["Sales"],
  queryString: saleQueryStringSchema,
  response: {
    200: z.object({
      total: z.number(),
      totalItems: z.number(),
      totalPage: z.number(),
    }),
    ...errorResponses,
  },
};

export type GetSalesQueryString = z.infer<typeof saleQueryStringSchema>;
