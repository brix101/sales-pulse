import { faker } from "@faker-js/faker";
import { Seeder } from "@mikro-orm/seeder";

import type { EntityManager } from "@mikro-orm/core";

import { Customer } from "../modules/customers/customer.entity.js";
import { Product } from "../modules/products/product.entity.js";
import { Sale } from "../modules/sales/sale.entity.js";
import { SalesItem } from "../modules/sales/sales-item.entity.js";

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const numberOfCustomers = 1000;
    const customerEntities = [];
    for (let i = 0; i < numberOfCustomers; i++) {
      const customer = em.create(Customer, {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        address: faker.location.streetAddress({ useFullAddress: true }),
      });

      customerEntities.push(customer);
    }

    const numberOfProducts = 5000;
    const productEntities = [];
    for (let i = 0; i < numberOfProducts; i++) {
      const product = em.create(Product, {
        name: faker.commerce.productName(),
        price: Number(faker.commerce.price()),
        description: faker.commerce.productDescription(),
        image: faker.image.url(),
      });

      productEntities.push(product);
    }

    const saleEntities = [];
    const salesItemsEntities = [];

    for (const customer of customerEntities) {
      const numberOfSales = faker.number.int({ min: 1, max: 100 });

      for (let i = 0; i < numberOfSales; i++) {
        const sale = em.create(Sale, {
          customer,
          items: [],
          orderDate: faker.date.between({
            from: new Date(new Date().getFullYear(), 0, 1),
            to: new Date(),
          }),
        });
        saleEntities.push(sale);

        const numberOfItems = faker.number.int({ min: 1, max: 10 });

        for (let j = 0; j < numberOfItems; j++) {
          const product =
            productEntities[
              faker.number.int({ min: 0, max: numberOfProducts - 1 })
            ];

          const quantity = faker.number.int({ min: 1, max: 10 });
          const salesItem = em.create(SalesItem, { product, quantity, sale });
          salesItemsEntities.push(salesItem);
        }
      }
    }

    await em.persistAndFlush(customerEntities);
    await em.persistAndFlush(productEntities);
    await em.persistAndFlush(saleEntities);
    await em.persistAndFlush(salesItemsEntities);
  }
}
