import { MikroORM } from "@mikro-orm/core";

import type { EntityManager, Options } from "@mikro-orm/postgresql";

import config from "../mikro-orm.config.js";

export interface Services {
  orm: MikroORM;
  em: EntityManager;
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

  cache = { orm, em };

  return cache;
}
