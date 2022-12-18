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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ProductsService = class ProductsService {
    async findProduct(id) {
        let product;
        try {
            product = await this.productModel.findById(id).exec();
        }
        catch (error) {
            throw new common_1.NotFoundException('Id is not valid');
        }
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        return product;
    }
    constructor(productModel) {
        this.productModel = productModel;
        this.products = [];
    }
    async insertProduct(title, desc, price) {
        const newProduct = new this.productModel({
            title,
            description: desc,
            price,
        });
        const result = await newProduct.save();
        console.log(result);
        return result;
    }
    async getAllProducts() {
        const products = await this.productModel.find().exec();
        return products.map((el) => ({
            id: el.id,
            title: el.title,
            description: el.description,
            price: el.price,
        }));
    }
    async getSingleProduct(productId) {
        const product = await this.findProduct(productId);
        return {
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
        };
    }
    async updateProduct(productId, title, prodDesc, prodPrice) {
        const updatedProduct = await this.findProduct(productId);
        if (title) {
            updatedProduct.title = title;
        }
        if (prodDesc) {
            updatedProduct.description = prodDesc;
        }
        if (prodPrice) {
            updatedProduct.price = prodPrice;
        }
        updatedProduct.save();
    }
    async deleteProduct(productId) {
        const result = await this.productModel.deleteOne({ _id: productId }).exec();
        if (result.deletedCount === 0) {
            throw new common_1.NotFoundException('could not find the product');
        }
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Product')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map