import type { Services } from "../../utils/db.js";
import type { Sale } from "./sale.entity.js";
import type { GetSalesQueryString } from "./sale.schema.js";
import type { FilterQuery } from "@mikro-orm/core";

export async function getSales(db: Services, query: GetSalesQueryString) {
  const limit = query.limit || 10;
  const offset = (query.page - 1) * limit;

  const filter: FilterQuery<Sale> = {};

  if (query.customerId) {
    filter.customer = { id: query.customerId };
  }

  if (query.month) {
    const [year, month] = query.month.split("-");
    filter.orderDate = {
      $gte: new Date(`${year}-${month}-01`),
      $lte: new Date(`${year}-${month}-31`),
    };
  }

  const [sales, total] = await db.sale.findAndCount(filter, {
    limit,
    offset,
    populate: ["customer", "items", "items.product"],
  });

  return {
    total,
    totalItems: sales.length,
    totalPage: Math.ceil(total / limit),
    items: sales,
  };
}
