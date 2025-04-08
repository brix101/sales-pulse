import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

import { queryStringSchema } from "../../common/schema.js";
import { verifyJWT } from "../../utils/auth.js";
import { getCustomersHandler } from "./customer.controller.js";

export function customerRouter(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get("/", {
    preHandler: verifyJWT,
    schema: {
      querystring: queryStringSchema,
    },
    handler: getCustomersHandler,
  });
}
