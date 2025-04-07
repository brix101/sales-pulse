import {
  BeforeCreate,
  BeforeUpdate,
  Entity,
  EntityRepositoryType,
  Property,
} from "@mikro-orm/postgresql";

import { BaseEntity } from "../../common/base.entity.js";
import { CustomerRepository } from "./customer.repository.js";

@Entity({ repository: () => CustomerRepository })
export class Customer extends BaseEntity {
  [EntityRepositoryType]?: CustomerRepository;

  @Property()
  name!: string;

  @Property()
  email!: string;

  @Property()
  phone!: string;

  @Property()
  address!: string;

  @BeforeCreate()
  @BeforeUpdate()
  beforeCreate() {
    this.email = this.email.toLowerCase();
  }
}
