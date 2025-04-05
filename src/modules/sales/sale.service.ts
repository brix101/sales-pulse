import { sql } from "drizzle-orm";

import type { GetSalesQueryString } from "./sale.schema";
import type { DB } from "@/db";
import { sales } from "@/db/schema";
import { logger } from "@/utils/logger";

export async function getSales({ page, limit }: GetSalesQueryString, db: DB) {
  try {
    const transactions = await db.transaction(async (tx) => {
      const items = await db.query.sales.findMany({
        limit: limit,
        offset: limit * (page - 1),
        with: {
          customer: true,
          products: {
            with: {
              product: true,
            },
            columns: {
              quantity: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
        columns: {
          id: true,
          orderDate: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      const count = await tx
        .select({ count: sql<number>`count(${sales.id})` })
        .from(sales)
        .then((res) => Number(res[0]?.count ?? 0));

      return {
        items,
        total: items.length,
        totalItems: count,
        totalPage: Math.ceil(count / limit),
      };
    });

    return transactions;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}
