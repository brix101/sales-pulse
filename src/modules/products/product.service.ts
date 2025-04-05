import { DB } from "@/db";
import { Product, products } from "@/db/schema";
import { logger } from "@/utils/logger";
import { sql } from "drizzle-orm";

import { GetProductsQueryString } from "./product.schema";

/**
 * Get products
 * @param {GetProductsQueryString} query - The query string.
 * @param {DB} db - The database instance.
 * @returns {Promise<{ items: Product[], total: number, totalItems: number, totalPage: number }>} The products.
 */
export async function getProducts(
  { page, limit }: GetProductsQueryString,
  db: DB,
): Promise<{
  items: Product[];
  total: number;
  totalItems: number;
  totalPage: number;
}> {
  try {
    const transaction = await db.transaction(async (tx) => {
      const items = await tx.query.products.findMany({
        offset: (page - 1) * limit,
        limit,
      });

      const count = await tx
        .select({ count: sql<number>`count(${products.id})` })
        .from(products)
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
    logger.error({ message }, "getProducts: failed to get Products");
    throw error;
  }
}
