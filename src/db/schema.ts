import { relations } from "drizzle-orm";
import { index, pgTable, timestamp } from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
};

export const customers = pgTable("customers", (t) => ({
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  name: t.varchar({ length: 255 }).notNull(),
  email: t.varchar({ length: 255 }).notNull().unique(),
  ...timestamps,
}));

export type Customer = typeof customers.$inferSelect;
export type NewCustomer = typeof customers.$inferInsert;

export const products = pgTable("products", (t) => ({
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  name: t.varchar({ length: 255 }).notNull(),
  description: t.text().notNull(),
  image: t.text().notNull(),
  price: t.numeric({ precision: 10, scale: 2 }).notNull(),
  ...timestamps,
}));

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export const sales = pgTable("sales", (t) => ({
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  customerId: t.integer().references(() => customers.id),
  orderDate: timestamp({ withTimezone: true }).notNull(),
  ...timestamps,
}));

export type Sale = typeof sales.$inferSelect;
export type NewSale = typeof sales.$inferInsert;

export const salesRelations = relations(sales, ({ many, one }) => ({
  customer: one(customers, {
    fields: [sales.customerId],
    references: [customers.id],
  }),
  products: many(salesProducts),
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

export const salesProductsRelations = relations(salesProducts, ({ one }) => ({
  sale: one(sales, {
    fields: [salesProducts.saleId],
    references: [sales.id],
  }),
  product: one(products, {
    fields: [salesProducts.productId],
    references: [products.id],
  }),
}));
