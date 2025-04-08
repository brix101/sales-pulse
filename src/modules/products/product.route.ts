import type { FastifyInstance } from "fastify";

import { queryStringSchema } from "../../common/schema.js";
import { verifyJWT } from "../../utils/auth.js";
import { getProductsHandler } from "./product.controller.js";

export function productRouter(app: FastifyInstance) {
  app.get("/", {
    preHandler: verifyJWT,
    schema: {
      querystring: queryStringSchema,
    },
    handler: getProductsHandler,
  });
}
