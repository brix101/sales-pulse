import { Migration } from '@mikro-orm/migrations';

export class Migration20250408030200 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "user" alter column "name" type varchar(255) using ("name"::varchar(255));`);
    this.addSql(`alter table "user" alter column "name" drop not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" alter column "name" type varchar(255) using ("name"::varchar(255));`);
    this.addSql(`alter table "user" alter column "name" set not null;`);
  }

}
