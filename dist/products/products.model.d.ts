import * as mongoose from 'mongoose';
export type ProductSchema = mongoose.HydratedDocument<Product>;
export declare class Product {
    id: string;
    title: string;
    description: string;
    price: number;
}
export declare const MongooseProductSchema: mongoose.Schema<Product, mongoose.Model<Product, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Product>;
