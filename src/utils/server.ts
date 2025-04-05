import db, { DB } from "@/db";
import fastify, { FastifyInstance } from "fastify";

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
 * @returns {Promise<FastifyInstance>} A new Fastify server instance.
 */
export async function createServer(): Promise<FastifyInstance> {
  const server = fastify({
    logger: true,
  });

  server.addHook("onRequest", async (req) => {
    req.db = db;
  });

  server.after(() => {
    server.get("/healthcheck", async () => {
      return { status: "ok" };
    });
  });

  return server;
}
