import type { LogWriter } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DefaultLogger, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

import type { Env } from "@/env";

import { logger } from "../utils/logger";
import * as schema from "./schema";

class MyLogWriter implements LogWriter {
  write(message: string) {
    logger.info(`💾🔍⏳ ${message}`);
  }
}

/**
 * Initializes the database.
 * @param {Env["DATABASE_URL"]} url - The database URL.
 * @returns {NodePgDatabase<typeof schema> & { $client: string }} The database instance.
 */
export function initDB(url: Env["DATABASE_URL"]): NodePgDatabase<
  typeof schema
> & {
  $client: string;
} {
  logger.info("🔌💾⏳ Initializing database");

  return drizzle(url, {
    schema,
    logger: new DefaultLogger({
      writer: new MyLogWriter(),
    }),
    casing: "snake_case",
  });
}

export type DB = Awaited<ReturnType<typeof initDB>>;

/**
 * Pings the database to check if it is connected.
 * @param {DB} db - The database instance.
 * @returns {Promise<unknown>} A promise that resolves when the database is connected.
 */
export async function ping(db: DB): Promise<unknown> {
  return db.execute(sql`SELECT 1`);
}
