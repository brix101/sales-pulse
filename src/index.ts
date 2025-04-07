import env from "./env.js";
import { logger } from "./utils/logger.js";
import { bootstrap } from "./utils/server.js";

async function main() {
  try {
    const { url } = await bootstrap(env.PORT);
    logger.info(`Server is running on ${url}`);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
}

void main();
