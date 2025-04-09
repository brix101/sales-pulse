import { Migration } from '@mikro-orm/migrations';

export class Migration20250409134727 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "customer" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "email" varchar(255) not null, "phone" varchar(255) not null, "address" varchar(255) not null);`);

    this.addSql(`create table "product" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "description" text not null, "price" real not null, "image" text not null);`);

    this.addSql(`create table "sale" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "order_date" timestamptz not null, "customer_id" int null);`);

    this.addSql(`create table "sales_item" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "sale_id" int not null, "product_id" int null, "quantity" int not null default 1);`);

    this.addSql(`create table "user" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) null, "email" varchar(255) not null, "password" varchar(255) not null);`);
    this.addSql(`alter table "user" add constraint "user_email_unique" unique ("email");`);

    this.addSql(`alter table "sale" add constraint "sale_customer_id_foreign" foreign key ("customer_id") references "customer" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "sales_item" add constraint "sales_item_sale_id_foreign" foreign key ("sale_id") references "sale" ("id") on update cascade;`);
    this.addSql(`alter table "sales_item" add constraint "sales_item_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "sale" drop constraint "sale_customer_id_foreign";`);

    this.addSql(`alter table "sales_item" drop constraint "sales_item_product_id_foreign";`);

    this.addSql(`alter table "sales_item" drop constraint "sales_item_sale_id_foreign";`);

    this.addSql(`drop table if exists "customer" cascade;`);

    this.addSql(`drop table if exists "product" cascade;`);

    this.addSql(`drop table if exists "sale" cascade;`);

    this.addSql(`drop table if exists "sales_item" cascade;`);

    this.addSql(`drop table if exists "user" cascade;`);
  }

}
