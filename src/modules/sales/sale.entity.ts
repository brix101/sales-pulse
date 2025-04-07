import { Cascade, Entity, ManyToOne, Property, t } from "@mikro-orm/postgresql";

import { BaseEntity } from "../../common/base.entity.js";
import { Customer } from "../customers/customer.entity.js";
import { Product } from "../products/product.entity.js";

@Entity()
export class Sale extends BaseEntity {
  @Property()
  quantity!: number;

  @Property()
  totalPrice!: number;

  @Property({ type: t.datetime })
  orderDate!: Date;

  @ManyToOne(() => Customer, { cascade: [Cascade.ALL] })
  customer!: Customer;

  @ManyToOne(() => Product, { cascade: [Cascade.ALL] })
  product!: Product;
}
