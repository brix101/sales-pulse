import { Entity, Property } from "@mikro-orm/postgresql";

import { BaseEntity } from "../../common/base.entity.js";

@Entity()
export class Customer extends BaseEntity {
  @Property()
  name!: string;

  @Property()
  email!: string;

  @Property()
  phone!: string;

  @Property()
  address!: string;
}
