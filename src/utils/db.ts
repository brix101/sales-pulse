import { MikroORM } from "@mikro-orm/core";

import type { CustomerRepository } from "../modules/customers/customer.repository.js";
import type { ProductRepository } from "../modules/products/product.repository.js";
import type { EntityManager, Options } from "@mikro-orm/postgresql";

import config from "../mikro-orm.config.js";
import { Customer } from "../modules/customers/customer.entity.js";
import { Product } from "../modules/products/product.entity.js";

export interface Services {
  orm: MikroORM;
  em: EntityManager;
  customer: CustomerRepository;
  product: ProductRepository;
}

let cache: Services | null = null;

export async function initDB(options?: Options) {
  if (cache) {
    return cache;
  }

  const orm = await MikroORM.init({
    ...config,
    ...options,
  });

  const em = orm.em;

  cache = {
    orm,
    em,
    customer: em.getRepository(Customer),
    product: em.getRepository(Product),
  };

  return cache;
}
