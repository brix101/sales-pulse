import {
  Entity,
  EntityRepositoryType,
  Property,
  t,
} from "@mikro-orm/postgresql";

import { BaseEntity } from "../../common/base.entity.js";
import { ProductRepository } from "./product.repository.js";

@Entity({ repository: () => ProductRepository })
export class Product extends BaseEntity {
  [EntityRepositoryType]?: ProductRepository;

  @Property()
  name!: string;

  @Property({ type: t.text })
  description!: string;

  @Property({ type: t.float })
  price!: number;

  @Property({ type: t.text })
  image!: string;
}
