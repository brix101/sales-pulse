import { sql } from "drizzle-orm";

import { DB } from "@/db";
import { customers } from "@/db/schema";
import { logger } from "@/utils/logger";

// TODO: move this to a shared interface or zod schema
interface GetCustomers {
  page: number;
  limit: number;
}

export async function getCustomers({ page, limit }: GetCustomers, db: DB) {
  try {
    const transaction = await db.transaction(async (tx) => {
      const items = await tx.query.customers.findMany({
        offset: (page - 1) * limit,
        limit,
      });

      const count = await tx
        .select({ count: sql<number>`count(${customers.id})` })
        .from(customers)
        .then((res) => Number(res[0]?.count ?? 0));

      return {
        items,
        total: items.length,
        totalItems: count,
        totalPage: Math.ceil(count / limit),
      };
    });

    return transaction;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    logger.error({ message }, "getCustomers: failed to get customers");
    throw error;
  }
}
