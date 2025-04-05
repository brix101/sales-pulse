import type { FastifyInstance } from "fastify";

import { getCustomersHandler } from "./customer.controller";

export async function customerRouter(app: FastifyInstance) {
  app.get("/", getCustomersHandler);
}
