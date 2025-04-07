import { EntityRepository } from "@mikro-orm/postgresql";

import type { SalesItem } from "./sales-item.entity.js";

export class SalesItemRepository extends EntityRepository<SalesItem> {}
