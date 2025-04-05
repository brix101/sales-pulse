import type { FastifyInstance } from "fastify";

import { getProductsHandler } from "./product.controller";

export async function productRouter(app: FastifyInstance) {
  app.get("/", getProductsHandler);
}
