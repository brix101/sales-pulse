import { logger } from "./utils/logger";
import { createServer } from "./utils/server";

async function main() {
  logger.info("Starting server...");

  const server = await createServer();

  try {
    await server.listen({ port: 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

void main();
