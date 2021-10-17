"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkResolver = void 0;
const Link_1 = require("../entities/Link");
const type_graphql_1 = require("type-graphql");
let LinkResolver = class LinkResolver {
    links({ em }) {
        return em.find(Link_1.Link, {});
    }
    link(id, { em }) {
        return em.findOne(Link_1.Link, { id });
    }
    async createLink(title, { em }) {
        const link = em.create(Link_1.Link, { title });
        await em.persistAndFlush(link);
        return link;
    }
    async updateLink(id, title, { em }) {
        const link = await em.findOne(Link_1.Link, { id });
        if (!link) {
            return null;
        }
        if (title) {
            link.title = title;
            await em.persistAndFlush(link);
        }
        return link;
    }
    async deleteLink(id, { em }) {
        await em.nativeDelete(Link_1.Link, { id });
        return true;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Link_1.Link]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LinkResolver.prototype, "links", null);
__decorate([
    (0, type_graphql_1.Query)(() => Link_1.Link, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('identifier', () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], LinkResolver.prototype, "link", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Link_1.Link),
    __param(0, (0, type_graphql_1.Arg)('title')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LinkResolver.prototype, "createLink", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Link_1.Link, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __param(1, (0, type_graphql_1.Arg)('title', () => String, { nullable: true })),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], LinkResolver.prototype, "updateLink", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], LinkResolver.prototype, "deleteLink", null);
LinkResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], LinkResolver);
exports.LinkResolver = LinkResolver;
//# sourceMappingURL=link.js.map