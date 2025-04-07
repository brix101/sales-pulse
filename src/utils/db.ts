import { MikroORM } from "@mikro-orm/core";

import type { CustomerRepository } from "../modules/customers/customer.repository.js";
import type { ProductRepository } from "../modules/products/product.repository.js";
import type { SaleRepository } from "../modules/sales/sale.repository.js";
import type { SalesItemRepository } from "../modules/sales/sales-item.repository.js";
import type { EntityManager, Options } from "@mikro-orm/postgresql";

import config from "../mikro-orm.config.js";
import { Customer } from "../modules/customers/customer.entity.js";
import { Product } from "../modules/products/product.entity.js";
import { Sale } from "../modules/sales/sale.entity.js";
import { SalesItem } from "../modules/sales/sales-item.entity.js";

export interface Services {
  orm: MikroORM;
  em: EntityManager;
  customer: CustomerRepository;
  product: ProductRepository;
  sale: SaleRepository;
  salesItem: SalesItemRepository;
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
    sale: em.getRepository(Sale),
    salesItem: em.getRepository(SalesItem),
  };

  return cache;
}
