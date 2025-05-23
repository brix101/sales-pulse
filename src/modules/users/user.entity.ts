import {
  BeforeCreate,
  BeforeUpdate,
  Entity,
  EntityRepositoryType,
  Property,
} from "@mikro-orm/postgresql";
import { hash, verify } from "argon2";

import type { EventArgs } from "@mikro-orm/postgresql";

import { BaseEntity } from "../../common/base.entity.js";
import { UserRepository } from "./user.repository.js";

@Entity({ repository: () => UserRepository })
export class User extends BaseEntity {
  [EntityRepositoryType]?: UserRepository;

  @Property({ nullable: true })
  name?: string;

  @Property({ unique: true })
  email: string;

  @Property({ hidden: true, lazy: true })
  password: string;

  constructor(user: User) {
    super();
    this.name = user.name?.toLowerCase();
    this.email = user.email.toLowerCase();
    this.password = user.password;
  }

  @BeforeCreate()
  @BeforeUpdate()
  async hashPassword(args: EventArgs<User>) {
    const password = args.changeSet?.payload.password;

    if (password) {
      this.password = await hash(password);
    }
  }

  async verifyPassword(password: string) {
    return verify(this.password, password);
  }
}
