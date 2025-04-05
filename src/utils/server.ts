import fastify, { FastifyInstance } from "fastify";

import { DB } from "@/db";
import { customerRouter } from "@/modules/customers/customer.router";
import { productRouter } from "@/modules/products/product.router";
import { saleRouter } from "@/modules/sales/sale.router";

import { logger, loggerOptions } from "./logger";

declare module "fastify" {
  interface FastifyRequest {
    // user: Awaited<ReturnType<typeof getUserById>> | null;
    db: DB;
  }

  // interface FastifyInstance {
  //   // authenticate: typeof authenticate;
  // }
}

/**
 * Creates a new Fastify server instance.
 * @param {DB} options.db - The database instance.
 * @returns {Promise<FastifyInstance>} A new Fastify server instance.
 */
export async function createServer({
  db,
}: {
  db: DB;
}): Promise<FastifyInstance> {
  logger.info("🚀🚀🚀 Launching server");

  const server = fastify({
    logger: loggerOptions,
  });

  server.addHook("onRequest", async (req) => {
    req.db = db;
  });

  server.after(() => {
    server.get("/healthcheck", async () => {
      return { status: "ok" };
    });
  });

  server.register(customerRouter, { prefix: "api/v1/customers" });
  server.register(productRouter, { prefix: "api/v1/products" });
  server.register(saleRouter, { prefix: "api/v1/sales" });

  return server;
}
