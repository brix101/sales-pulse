import {
  Cascade,
  Collection,
  Entity,
  EntityRepositoryType,
  ManyToOne,
  OneToMany,
  Property,
  t,
} from "@mikro-orm/postgresql";

import { BaseEntity } from "../../common/base.entity.js";
import { Customer } from "../customers/customer.entity.js";
import { SaleRepository } from "./sale.repository.js";
import { SalesItem } from "./sales-item.entity.js";

@Entity({ repository: () => SaleRepository })
export class Sale extends BaseEntity {
  [EntityRepositoryType]?: SaleRepository;

  @Property({ type: t.datetime })
  orderDate!: Date;

  @ManyToOne(() => Customer, { cascade: [Cascade.ALL] })
  customer!: Customer;

  @OneToMany({ mappedBy: "sale", orphanRemoval: true })
  items = new Collection<SalesItem>(this);
}
