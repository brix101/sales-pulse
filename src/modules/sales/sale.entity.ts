import {
  Cascade,
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
  t,
} from "@mikro-orm/postgresql";

import { BaseEntity } from "../../common/base.entity.js";
import { Customer } from "../customers/customer.entity.js";
import { SalesItem } from "./sales-item.entity.js";

@Entity()
export class Sale extends BaseEntity {
  @Property({ type: t.datetime })
  orderDate!: Date;

  @ManyToOne(() => Customer, { cascade: [Cascade.ALL] })
  customer!: Customer;

  @OneToMany({ mappedBy: "sale", orphanRemoval: true })
  items = new Collection<SalesItem>(this);
}
