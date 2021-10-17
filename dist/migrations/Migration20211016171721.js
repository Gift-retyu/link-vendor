"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20211016171721 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20211016171721 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "link" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" text not null);');
    }
}
exports.Migration20211016171721 = Migration20211016171721;
//# sourceMappingURL=Migration20211016171721.js.map