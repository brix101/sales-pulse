import type { QueryString } from "../../common/schema.js";
import type { Services } from "../../db.js";

export async function getCustomers(db: Services, query: QueryString) {
  const limit = query.limit || 10;
  const offset = (query.page - 1) * limit;

  const [customers, total] = await db.customer.findAndCount(
    {},
    {
      limit,
      offset,
    },
  );

  return {
    total,
    totalItems: customers.length,
    totalPage: Math.ceil(total / query.limit),
    items: customers,
  };
}
