import { EntityRepository } from "@mikro-orm/postgresql";

import type { Sale } from "./sale.entity.js";

export class SaleRepository extends EntityRepository<Sale> {}
