import type { FastifyInstance } from "fastify";

import { verifyJWT } from "../../utils/auth.js";
import { getSalesHandler } from "./sale.controller.js";
import { saleQueryStringSchema } from "./sale.schema.js";

export function saleRouter(app: FastifyInstance) {
  app.get("/", {
    preHandler: verifyJWT,
    schema: {
      querystring: saleQueryStringSchema,
    },
    handler: getSalesHandler,
  });
}
