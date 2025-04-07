import { EntityRepository } from "@mikro-orm/postgresql";

import type { Customer } from "./customer.entity.js";

export class CustomerRepository extends EntityRepository<Customer> {}
