import env from "./env.js";
import { logger } from "./utils/logger.js";
import { bootstrap } from "./utils/server.js";

async function main() {
  try {
    await bootstrap(env.PORT);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
}

void main();
