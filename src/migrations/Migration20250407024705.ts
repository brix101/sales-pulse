import { Migration } from '@mikro-orm/migrations';

export class Migration20250407024705 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "customer" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "email" varchar(255) not null, "phone" varchar(255) not null, "address" varchar(255) not null);`);

    this.addSql(`create table "product" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "description" text not null, "price" real not null, "image" text not null);`);

    this.addSql(`create table "sale" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "quantity" int not null, "total_price" int not null, "order_date" timestamptz not null, "customer_id" int null, "product_id" int null);`);

    this.addSql(`alter table "sale" add constraint "sale_customer_id_foreign" foreign key ("customer_id") references "customer" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "sale" add constraint "sale_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "sale" drop constraint "sale_customer_id_foreign";`);

    this.addSql(`alter table "sale" drop constraint "sale_product_id_foreign";`);

    this.addSql(`drop table if exists "customer" cascade;`);

    this.addSql(`drop table if exists "product" cascade;`);

    this.addSql(`drop table if exists "sale" cascade;`);
  }

}
