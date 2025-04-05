import type { FastifyInstance } from "fastify";
import Fastify from "fastify";

import type { DB } from "@/db";
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

  const fastify = Fastify({
    logger: loggerOptions,
  });

  fastify.addHook("onRequest", (req) => {
    req.db = db;
  });

  fastify.after(() => {
    fastify.get("/healthcheck", () => {
      return { status: "ok" };
    });
  });

  fastify.register(customerRouter, { prefix: "api/v1/customers" });
  fastify.register(productRouter, { prefix: "api/v1/products" });
  fastify.register(saleRouter, { prefix: "api/v1/sales" });

  return fastify;
}
