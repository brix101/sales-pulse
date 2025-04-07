import { EntityRepository } from "@mikro-orm/postgresql";

import type { Product } from "./product.entity.js";

export class ProductRepository extends EntityRepository<Product> {}
