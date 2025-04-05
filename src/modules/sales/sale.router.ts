import type { FastifyInstance } from "fastify";

import { getSalesHandler } from "./sale.controller";

export async function saleRouter(app: FastifyInstance) {
  app.get("/", getSalesHandler);
}
