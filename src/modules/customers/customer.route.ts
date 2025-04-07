import type { FastifyInstance } from "fastify";

import { getCustomersHandler } from "./customer.controller.js";

export function customerRouter(app: FastifyInstance) {
  app.get("/", getCustomersHandler);
}
