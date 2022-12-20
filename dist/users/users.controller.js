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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let UsersController = class UsersController {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async getUsers() {
        const users = await this.usersService.getUsers();
        return users;
    }
    async register(name, email, password) {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await this.usersService.register({
            name,
            email,
            password: hashedPassword,
        });
        delete user.password;
        return user;
    }
    async login(email, password, response) {
        const user = await this.usersService.findOne({ email });
        if (!user) {
            throw new common_1.BadRequestException("invalid creditials");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new common_1.BadRequestException("invalid creditials");
        }
        console.log(user);
        const jwt = this.jwtService.sign({ id: user._id });
        response.cookie("jwt", jwt, { httpOnly: true });
        return {
            message: "success",
        };
    }
    async user(request) {
        try {
            const cookie = request.cookies["jwt"];
            const data = await this.jwtService.verify(cookie);
            if (!data) {
                throw new common_1.UnauthorizedException();
            }
            const user = await this.usersService.findOne({ _id: data.id });
            return user;
        }
        catch (error) {
            throw new common_1.UnauthorizedException();
        }
    }
    async logout(response) {
        response.clearCookie("jwt");
        return {
            message: " logout success",
        };
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Post)("register"),
    __param(0, (0, common_1.Body)("name")),
    __param(1, (0, common_1.Body)("email")),
    __param(2, (0, common_1.Body)("password")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "register", null);
__decorate([
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Body)("email")),
    __param(1, (0, common_1.Body)("password")),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, common_1.Get)("singleUser"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "user", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "logout", null);
UsersController = __decorate([
    (0, common_1.Controller)("api/v1/users"),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map