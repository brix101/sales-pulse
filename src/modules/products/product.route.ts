import type { FastifyInstance } from "fastify";

import { getProductsHandler } from "./product.controller.js";

export function productRouter(app: FastifyInstance) {
  app.get("/", getProductsHandler);
}
