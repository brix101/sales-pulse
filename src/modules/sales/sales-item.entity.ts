import {
  Cascade,
  Entity,
  EntityRepositoryType,
  ManyToOne,
  Property,
} from "@mikro-orm/postgresql";

import { BaseEntity } from "../../common/base.entity.js";
import { Product } from "../products/product.entity.js";
import { Sale } from "./sale.entity.js";
import { SalesItemRepository } from "./sales-item.repository.js";

@Entity({ repository: () => SalesItemRepository })
export class SalesItem extends BaseEntity {
  [EntityRepositoryType]?: SalesItemRepository;

  @ManyToOne()
  sale!: Sale;

  @ManyToOne(() => Product, { cascade: [Cascade.ALL] })
  product!: Product;

  @Property({ default: 1 })
  quantity!: number;
}
