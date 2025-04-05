import { DB } from "@/db";
import { Customer, customers } from "@/db/schema";
import { logger } from "@/utils/logger";
import { sql } from "drizzle-orm";

import { GetCustomersQueryString } from "./customer.schema";

/**
 * Get customers
 * @param {GetCustomersQueryString} query - The query string.
 * @param {DB} db - The database instance.
 * @returns {Promise<{ items: Customer[], total: number, totalItems: number, totalPage: number }>} The customers.
 */
export async function getCustomers(
  { page, limit }: GetCustomersQueryString,
  db: DB,
): Promise<{
  items: Customer[];
  total: number;
  totalItems: number;
  totalPage: number;
}> {
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
