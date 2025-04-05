import { Env } from "@/env";
import { DefaultLogger, LogWriter, sql } from "drizzle-orm";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import postgres from "postgres";

import { logger } from "../utils/logger";
import * as schema from "./schema";

class MyLogWriter implements LogWriter {
  write(message: string) {
    logger.info(message);
  }
}

/**
 * Initializes the database.
 * @param {Env["DATABASE_URL"]} url - The database URL.
 * @returns {Promise<{ client: postgres.Sql, db: DB }>} A promise that resolves to the client and database instance.
 */
export async function initDB(url: Env["DATABASE_URL"]): Promise<{
  client: postgres.Sql<{}>;
  db: NodePgDatabase<typeof schema> & {
    $client: postgres.Sql<{}>;
  };
}> {
  const client = postgres(url);
  const db = drizzle(client, {
    schema,
    logger: new DefaultLogger({
      writer: new MyLogWriter(),
    }),
    casing: "snake_case",
  });

  return { client, db };
}

export type DB = Awaited<ReturnType<typeof initDB>>["db"];

/**
 * Pings the database to check if it is connected.
 * @param {DB} db - The database instance.
 * @returns {Promise<void>} A promise that resolves when the database is connected.
 */
export async function ping(db: DB) {
  return db.execute(sql`SELECT 1`);
}
