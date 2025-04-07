import { Entity, Property, t } from "@mikro-orm/postgresql";

import { BaseEntity } from "../../common/base.entity.js";

@Entity()
export class Product extends BaseEntity {
  @Property()
  name!: string;

  @Property({ type: t.text })
  description!: string;

  @Property({ type: t.float })
  price!: number;

  @Property({ type: t.text })
  image!: string;
}
