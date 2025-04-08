import { EntityRepository } from "@mikro-orm/core";

import type { User } from "./user.entity.js";

export class UserRepository extends EntityRepository<User> {}
