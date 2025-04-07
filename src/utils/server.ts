import { RequestContext } from "@mikro-orm/core";
import Fastify from "fastify";

import type { Services } from "./db.js";

import { customerRouter } from "../modules/customers/customer.route.js";
import { initDB } from "./db.js";
import { loggerOptions } from "./logger.js";

declare module "fastify" {
  interface FastifyRequest {
    db: Services;
  }
}

export async function bootstrap(port = 3000, migrate = true) {
  const db = await initDB();

  if (migrate) {
    await db.orm.migrator.up();
  }

  const app = Fastify({
    logger: loggerOptions,
  });

  // register request context hook
  app.addHook("onRequest", (_request, _reply, done) => {
    RequestContext.create(db.em, done);
  });

  app.addHook("preHandler", (request, _reply, done) => {
    request.db = db;
    done();
  });

  app.after(() => {
    app.get("/healthcheck", () => {
      return { status: "ok" };
    });
  });

  // shut down the connection when closing the app
  app.addHook("onClose", async () => {
    await db.orm.close();
  });

  // register routes
  app.register(customerRouter, { prefix: "/api/v1/customers" });

  const url = await app.listen({ port });

  return { app, url };
}
