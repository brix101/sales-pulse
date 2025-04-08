import env from "./env.js";
import { bootstrap } from "./server.js";
import { logger } from "./utils/logger.js";

async function main() {
  try {
    await bootstrap(env);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
}

void main();
