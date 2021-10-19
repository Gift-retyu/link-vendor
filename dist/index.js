"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@mikro-orm/core");
const constants_1 = require("./constants");
const micro_orm_config_1 = __importDefault(require("./micro-orm.config"));
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const link_1 = require("./resolvers/link");
const user_1 = require("./resolvers/user");
const connect_redis_1 = __importDefault(require("connect-redis"));
const redis_1 = __importDefault(require("redis"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const main = async () => {
    const orm = await core_1.MikroORM.init(micro_orm_config_1.default);
    await orm.getMigrator().up();
    console.log(constants_1.__prod__);
    const app = (0, express_1.default)();
    const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    const redisClient = redis_1.default.createClient();
    app.set("trust proxy", 1);
    app.use((0, cors_1.default)({
        credentials: true,
        origin: 'http://127.0.0.1:3006',
    }));
    app.use((0, express_session_1.default)({
        name: 'qid',
        store: new RedisStore({
            client: redisClient,
            disableTouch: true,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365,
            httpOnly: true,
            sameSite: 'lax',
            secure: constants_1.__prod__
        },
        saveUninitialized: false,
        secret: '43grvfwjkemfpo2i3gf',
        resave: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [link_1.LinkResolver, user_1.UserResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ em: orm.em, req, res }),
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false });
    app.listen(4000, () => {
        console.log('server started on localhost:4000');
    });
};
main().catch((err) => {
    console.error(err);
});
//# sourceMappingURL=index.js.map