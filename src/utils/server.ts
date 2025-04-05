import fastify from "fastify";

export async function createServer() {
  const server = fastify({
    logger: true,
  });

  server.after(() => {
    server.log.info("Server is ready");
  });

  server.get("/ping", (_, res) => {
    res.send(".");
  });

  return server;
}
