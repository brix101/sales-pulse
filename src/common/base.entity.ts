import {
  BaseEntity as MikroBaseEntity,
  OptionalProps,
  PrimaryKey,
  Property,
} from "@mikro-orm/postgresql";

export abstract class BaseEntity<Optional = never> extends MikroBaseEntity {
  [OptionalProps]?: "createdAt" | "updatedAt" | Optional;

  @PrimaryKey()
  id!: number;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
