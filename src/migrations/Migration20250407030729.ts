import { Migration } from '@mikro-orm/migrations';

export class Migration20250407030729 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "sales_item" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "sale_id" int null, "product_id" int null, "quantity" int not null default 1);`);

    this.addSql(`alter table "sales_item" add constraint "sales_item_sale_id_foreign" foreign key ("sale_id") references "sale" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "sales_item" add constraint "sales_item_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "sale" drop constraint "sale_product_id_foreign";`);

    this.addSql(`alter table "sale" drop column "quantity", drop column "total_price", drop column "product_id";`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "sales_item" cascade;`);

    this.addSql(`alter table "sale" add column "quantity" int4 not null, add column "total_price" int4 not null, add column "product_id" int4 null;`);
    this.addSql(`alter table "sale" add constraint "sale_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade on delete cascade;`);
  }

}
