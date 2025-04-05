import { Env } from "@/env";
import { DefaultLogger, LogWriter, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import postgres from "postgres";

import { logger } from "../utils/logger";
import * as schema from "./schema";

class MyLogWriter implements LogWriter {
  write(message: string) {
    logger.info(message);
  }
}

export async function initDB(url: Env["DATABASE_URL"]) {
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

export async function ping(db: DB) {
  return db.execute(sql`SELECT 1`);
}
