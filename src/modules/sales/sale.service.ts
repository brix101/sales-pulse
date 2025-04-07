import type { Services } from "../../utils/db.js";
import type { Sale } from "./sale.entity.js";
import type { GetSalesQueryString } from "./sale.schema.js";
import type { FilterQuery } from "@mikro-orm/core";

export async function getSales(db: Services, query: GetSalesQueryString) {
  const limit = query.limit || 10;
  const offset = (query.page - 1) * limit;

  const where: FilterQuery<Sale> = {};

  const [sales, total] = await db.sale.findAndCount(where, { limit, offset });

  return {
    total,
    totalItems: sales.length,
    totalPage: Math.ceil(total / limit),
    items: sales,
  };
}
