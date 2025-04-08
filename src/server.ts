import fastifyJWT from "@fastify/jwt";
import { RequestContext } from "@mikro-orm/core";
import Fastify from "fastify";
import {
  hasZodFastifySchemaValidationErrors,
  isResponseSerializationError,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

import type { Services } from "./db.js";

import { initDB } from "./db.js";
import { Env } from "./env.js";
import { customerRouter } from "./modules/customers/customer.route.js";
import { productRouter } from "./modules/products/product.route.js";
import { saleRouter } from "./modules/sales/sale.route.js";
import { userRoutes } from "./modules/users/user.route.js";
import { loggerOptions } from "./utils/logger.js";

declare module "fastify" {
  interface FastifyRequest {
    db: Services;
  }
}

export async function bootstrap(env: Env) {
  const db = await initDB();

  if (env.DATABASE_MIGRATE) {
    await db.orm.migrator.up();
  }

  const app = Fastify({
    logger: loggerOptions,
  });

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.register(fastifyJWT, {
    secret: {
      public: env.JWT_PUBLIC_KEY,
      private: env.JWT_PRIVATE_KEY,
    },
    sign: {
      algorithm: "RS256",
    },
  });

  // register request context hook
  app.addHook("onRequest", (_request, _reply, done) => {
    RequestContext.create(db.em, done);
  });

  // register JWT hook
  app.addHook("onRequest", (request, _reply, done) => {
    request
      .jwtVerify()
      .then((user) => {
        request.user = user;
      })
      .catch(() => {
        request.user = {};
      })
      .finally(() => {
        done();
      });
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

  app.setErrorHandler((err, req, reply) => {
    if (hasZodFastifySchemaValidationErrors(err)) {
      return reply.code(400).send({
        error: "Bad Request",
        message: "Invalid request parameters",
        statusCode: 400,
        details: {
          issues: err.validation,
          method: req.method,
          url: req.url,
        },
      });
    }

    if (isResponseSerializationError(err)) {
      return reply.code(500).send({
        error: "Internal Server Error",
        message: "Response doesn't match the schema",
        statusCode: 500,
        details: {
          issues: err.cause.issues,
          method: err.method,
          url: err.url,
        },
      });
    }

    // Default error response for unhandled errors
    return reply.code(500).send({
      error: "Internal Server Error",
      message: err.message || "An unexpected error occurred",
      statusCode: 500,
    });
  });

  // register routes
  app.register(customerRouter, { prefix: "/api/v1/customers" });
  app.register(productRouter, { prefix: "/api/v1/products" });
  app.register(saleRouter, { prefix: "/api/v1/sales" });
  app.register(userRoutes, { prefix: "/api/v1/users" });

  const url = await app.listen({ port: env.PORT });

  return { app, url };
}
