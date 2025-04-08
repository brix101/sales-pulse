import type { QueryString } from "../../common/schema.js";
import type { Services } from "../../db.js";

export async function getProducts(db: Services, query: QueryString) {
  const limit = query.limit || 10;
  const offset = (query.page - 1) * limit;

  const [products, total] = await db.product.findAndCount(
    {},
    { limit, offset },
  );

  return {
    total,
    totalItems: products.length,
    totalPage: Math.ceil(total / query.limit),
    items: products,
  };
}
