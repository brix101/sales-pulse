import { DefaultLogger, LogWriter, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

import { logger } from "../utils/logger";
import * as schema from "./schema";

class MyLogWriter implements LogWriter {
  write(message: string) {
    logger.info(message);
  }
}

const db = drizzle(process.env.DATABASE_URL, {
  schema,
  logger: new DefaultLogger({
    writer: new MyLogWriter(),
  }),
  casing: "snake_case",
});

export async function ping() {
  return db.execute(sql`SELECT 1`);
}

export type DB = typeof db;
export default db;
