import { initDB, ping } from "./db";
import env from "./env";
import { logger } from "./utils/logger";
import { createServer } from "./utils/server";

async function main() {
  const db = initDB(env.DATABASE_URL);

  try {
    await ping(db);
    logger.info("🔌💾✅ Database connected");
  } catch (e) {
    logger.error(e, "ping failed");
    process.exit(1);
  }

  const server = await createServer({ db });

  try {
    await server.listen({ port: env.PORT });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

void main();
