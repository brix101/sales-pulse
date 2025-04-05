import { index, pgTable, timestamp } from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
};

export const customers = pgTable("customers", (t) => ({
  id: t.integer().primaryKey(),
  name: t.varchar({ length: 255 }).notNull(),
  email: t.varchar({ length: 255 }).notNull().unique(),
  ...timestamps,
}));

export const products = pgTable("products", (t) => ({
  id: t.integer().primaryKey(),
  name: t.varchar({ length: 255 }).notNull(),
  price: t.numeric({ precision: 10, scale: 2 }).notNull(),
  ...timestamps,
}));

export const sales = pgTable("sales", (t) => ({
  id: t.integer().primaryKey(),
  customerId: t.integer().references(() => customers.id),
  productId: t.integer().references(() => products.id),
  ...timestamps,
}));

export const salesProducts = pgTable(
  "sales_products",
  (t) => ({
    saleId: t.integer().references(() => sales.id),
    productId: t.integer().references(() => products.id),
    quantity: t.integer().notNull(),
    ...timestamps,
  }),
  (t) => [index("sales_products_pk").on(t.saleId, t.productId)],
);
