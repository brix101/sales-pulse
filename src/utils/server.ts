import Fastify from "fastify";

import { logger } from "./logger.js";

export async function bootstrap(port = 3000, migrate = true) {
  logger.info("🚀🚀🚀 Launching server");
  logger.info({ migrate });

  const app = Fastify({
    // logger: loggerOptions,
  });

  app.after(() => {
    app.get("/healthcheck", () => {
      return { status: "ok" };
    });
  });

  const url = await app.listen({ port });

  return { app, url };
}
