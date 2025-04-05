import db from "@/db";
import { customers, products, sales, salesProducts } from "@/db/schema";
import { faker } from "@faker-js/faker";

import { logger } from "./logger";

export async function seed() {
  logger.info("Seeding database");

  const newCustomers = await db
    .insert(customers)
    .values(
      Array.from({ length: 500 }, () => ({
        name: faker.person.fullName().toLowerCase(),
        email: faker.internet.email().toLowerCase(),
      })),
    )
    .returning();

  const newProducts = await db
    .insert(products)
    .values(
      Array.from({ length: 5000 }, () => ({
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
      Array.from({ length: 500 }, () => ({
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
    Array.from({ length: faker.number.int({ min: 100, max: 1000 }) }, () => ({
      saleId: faker.helpers.arrayElement(newSales).id,
      productId: faker.helpers.arrayElement(newProducts).id,
      quantity: faker.number.int({ min: 1, max: 100 }),
    })),
  );

  logger.info("Seeded database");
}

void seed();
