/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Product } from './products.model';
import { Model } from 'mongoose';
export declare class ProductsService {
    private productModel;
    private products;
    private findProduct;
    constructor(productModel: Model<Product>);
    insertProduct(title: string, desc: string, price: number): Promise<import("mongoose").Document<unknown, any, Product> & Product & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getAllProducts(): Promise<{
        id: any;
        title: string;
        description: string;
        price: number;
    }[]>;
    getSingleProduct(productId: string): Promise<{
        id: any;
        title: any;
        description: any;
        price: any;
    }>;
    updateProduct(productId: string, title: string, prodDesc: string, prodPrice: number): Promise<void>;
    deleteProduct(productId: string): Promise<void>;
}
