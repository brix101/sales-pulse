import { ping } from "./db";
import env from "./env";
import { logger } from "./utils/logger";
import { createServer } from "./utils/server";

async function main() {
  try {
    await ping();
    logger.info("database connected");
  } catch (e) {
    logger.error(e, "ping failed");
    process.exit(1);
  }

  const server = await createServer();

  try {
    await server.listen({ port: env.PORT });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

void main();
