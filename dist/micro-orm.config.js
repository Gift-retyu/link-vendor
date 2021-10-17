"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const Link_1 = require("./entities/Link");
const path_1 = __importDefault(require("path"));
const User_1 = require("./entities/User");
exports.default = {
    migrations: {
        path: path_1.default.join(__dirname, './migrations'),
        pattern: /^[\w-]+\d+.[tj]s$/,
    },
    entities: [Link_1.Link, User_1.User],
    dbName: 'linkVendor',
    user: 'postgres',
    password: 'password',
    debug: !constants_1.__prod__,
    type: 'postgresql',
};
//# sourceMappingURL=micro-orm.config.js.map