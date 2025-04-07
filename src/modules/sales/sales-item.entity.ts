import { Cascade, Entity, ManyToOne, Property } from "@mikro-orm/postgresql";

import { BaseEntity } from "../../common/base.entity.js";
import { Product } from "../products/product.entity.js";
import { Sale } from "./sale.entity.js";

@Entity()
export class SalesItem extends BaseEntity {
  @ManyToOne(() => Sale, { cascade: [Cascade.ALL] })
  sale!: Sale;

  @ManyToOne(() => Product, { cascade: [Cascade.ALL] })
  product!: Product;

  @Property({ default: 1 })
  quantity!: number;
}
