import { faker } from "@faker-js/faker";

import { initDB } from "@/db";
import { customers, products, sales, salesProducts } from "@/db/schema";
import env from "@/env";

import { logger } from "./logger";

const CUSTOMERS_COUNT = 500;
const PRODUCTS_COUNT = 5000;
const SALES_MAX_PRODUCTS = 100;

export async function seed() {
  const db = await initDB(env.DATABASE_URL);

  logger.info("🌱🌱🌱   Seeding database");

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
        price: Number(faker.commerce.price()),
      })),
    )
    .returning();

  const customerSales = newCustomers
    .map((customer) =>
      Array.from({ length: faker.number.int({ min: 1, max: 100 }) }, () => ({
        customerId: customer.id,
        orderDate: faker.date.between({
          from: new Date(new Date().getFullYear(), 0, 1),
          to: new Date(), // Today
        }),
      })),
    )
    .flat();

  const newSales = await db.insert(sales).values(customerSales).returning();

  const salesProductsData = newSales.flatMap((sale) => {
    const productCount = faker.number.int({
      min: 1,
      max: SALES_MAX_PRODUCTS,
    });

    return Array.from({ length: productCount }, () => ({
      saleId: sale.id,
      productId: faker.helpers.arrayElement(newProducts).id,
      quantity: faker.number.int({ min: 1, max: 100 }),
    }));
  });

  await db.insert(salesProducts).values(salesProductsData);

  logger.info("✅✅✅   Seeded database");
}

void seed()
  .catch((err) => {
    logger.error("❌❌❌   Error seeding database", err);
  })
  .finally(() => {
    process.exit(0);
  });
