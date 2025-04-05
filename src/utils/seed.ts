import { initDB } from "@/db";
import { customers, products, sales, salesProducts } from "@/db/schema";
import env from "@/env";
import { faker } from "@faker-js/faker";

import { logger } from "./logger";

const CUSTOMERS_COUNT = 500;
const PRODUCTS_COUNT = 5000;
const SALES_COUNT = 500;
const SALES_MAX_PRODUCTS = 100;

export async function seed() {
  const db = await initDB(env.DATABASE_URL);

  logger.info("Seeding database");

  const newCustomers = await db
    .insert(customers)
    .values(
      Array.from({ length: CUSTOMERS_COUNT }, () => ({
        name: faker.person.fullName().toLowerCase(),
        email: faker.internet.email().toLowerCase(),
      })),
    )
    .returning();

  const newProducts = await db
    .insert(products)
    .values(
      Array.from({ length: PRODUCTS_COUNT }, () => ({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        image: faker.image.url(),
        price: faker.commerce.price(),
      })),
    )
    .returning();

  const newSales = await db
    .insert(sales)
    .values(
      Array.from({ length: SALES_COUNT }, () => ({
        customerId: faker.helpers.arrayElement(newCustomers).id,
        // orderDate: faker.date.recent(),
        orderDate: faker.date.between({
          from: new Date(new Date().getFullYear(), 0, 1),
          to: new Date(), // Today
        }),
      })),
    )
    .returning();

  await db.insert(salesProducts).values(
    Array.from(
      {
        length: faker.number.int({
          min: 100,
          max: SALES_MAX_PRODUCTS * SALES_COUNT,
        }),
      },
      () => ({
        saleId: faker.helpers.arrayElement(newSales).id,
        productId: faker.helpers.arrayElement(newProducts).id,
        quantity: faker.number.int({ min: 1, max: 100 }),
      }),
    ),
  );

  logger.info("Seeded database");

  process.exit(0);
}

void seed();
