import { Migration } from '@mikro-orm/migrations';

export class Migration20250407023241 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "sales" drop constraint "sales_customer_id_customers_id_fk";`);

    this.addSql(`alter table "sales_products" drop constraint "sales_products_product_id_products_id_fk";`);

    this.addSql(`alter table "sales_products" drop constraint "sales_products_sale_id_sales_id_fk";`);

    this.addSql(`create table "customer" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "email" varchar(255) not null, "phone" varchar(255) not null, "address" varchar(255) not null);`);

    this.addSql(`create table "product" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "description" text not null, "price" real not null, "image" text not null);`);

    this.addSql(`create table "sale" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "quantity" int not null, "total_price" int not null, "order_date" timestamptz not null, "customer_id" int null, "product_id" int null);`);

    this.addSql(`alter table "sale" add constraint "sale_customer_id_foreign" foreign key ("customer_id") references "customer" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "sale" add constraint "sale_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade on delete cascade;`);

    this.addSql(`drop table if exists "drizzle"."__drizzle_migrations" cascade;`);

    this.addSql(`drop table if exists "customers" cascade;`);

    this.addSql(`drop table if exists "products" cascade;`);

    this.addSql(`drop table if exists "sales" cascade;`);

    this.addSql(`drop table if exists "sales_products" cascade;`);

    this.addSql(`drop schema if exists "drizzle";`);
  }

  override async down(): Promise<void> {
    this.addSql(`create schema if not exists "drizzle";`);
    this.addSql(`alter table "sale" drop constraint "sale_customer_id_foreign";`);

    this.addSql(`alter table "sale" drop constraint "sale_product_id_foreign";`);

    this.addSql(`create table "drizzle"."__drizzle_migrations" ("id" serial primary key, "hash" text not null, "created_at" int8 null);`);

    this.addSql(`create table "customers" ("id" int4 generated always as identity not null, "name" varchar(255) not null, "email" varchar(255) not null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now());`);
    this.addSql(`alter table "customers" add constraint "customers_email_unique" unique ("email");`);

    this.addSql(`create table "products" ("id" int4 generated always as identity not null, "name" varchar(255) not null, "description" text not null, "image" text not null, "price" numeric(10,2) not null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now());`);

    this.addSql(`create table "sales" ("id" int4 generated always as identity not null, "customer_id" int4 null, "order_date" timestamptz(6) not null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now());`);

    this.addSql(`create table "sales_products" ("sale_id" int4 null, "product_id" int4 null, "quantity" int4 not null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now());`);
    this.addSql(`create index "sales_products_pk" on "sales_products" ("sale_id", "product_id");`);

    this.addSql(`alter table "sales" add constraint "sales_customer_id_customers_id_fk" foreign key ("customer_id") references "customers" ("id") on update no action on delete no action;`);

    this.addSql(`alter table "sales_products" add constraint "sales_products_product_id_products_id_fk" foreign key ("product_id") references "products" ("id") on update no action on delete no action;`);
    this.addSql(`alter table "sales_products" add constraint "sales_products_sale_id_sales_id_fk" foreign key ("sale_id") references "sales" ("id") on update no action on delete no action;`);

    this.addSql(`drop table if exists "customer" cascade;`);

    this.addSql(`drop table if exists "product" cascade;`);

    this.addSql(`drop table if exists "sale" cascade;`);
  }

}
