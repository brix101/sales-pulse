import { Migration } from '@mikro-orm/migrations';

export class Migration20250408022822 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "user" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null);`);
    this.addSql(`alter table "user" add constraint "user_email_unique" unique ("email");`);

    this.addSql(`alter table "sales_item" drop constraint "sales_item_sale_id_foreign";`);

    this.addSql(`alter table "sales_item" alter column "sale_id" type int using ("sale_id"::int);`);
    this.addSql(`alter table "sales_item" alter column "sale_id" set not null;`);
    this.addSql(`alter table "sales_item" add constraint "sales_item_sale_id_foreign" foreign key ("sale_id") references "sale" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "user" cascade;`);

    this.addSql(`alter table "sales_item" drop constraint "sales_item_sale_id_foreign";`);

    this.addSql(`alter table "sales_item" alter column "sale_id" type int using ("sale_id"::int);`);
    this.addSql(`alter table "sales_item" alter column "sale_id" drop not null;`);
    this.addSql(`alter table "sales_item" add constraint "sales_item_sale_id_foreign" foreign key ("sale_id") references "sale" ("id") on update cascade on delete cascade;`);
  }

}
