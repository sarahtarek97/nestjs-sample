import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProductSchema = mongoose.HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  id: string;
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  price: number;
}

export const MongooseProductSchema = SchemaFactory.createForClass(Product);

// export const ProductSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
// });

// export interface Product extends mongoose.Document {
//   id: string;
//   title: string;
//   description: string;
//   price: number;
// }
