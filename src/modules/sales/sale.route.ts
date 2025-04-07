import type { FastifyInstance } from "fastify";

import { getSalesHandler } from "./sale.controller.js";

export function saleRouter(app: FastifyInstance) {
  app.get("/", getSalesHandler);
}
