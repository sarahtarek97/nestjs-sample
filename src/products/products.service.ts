import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class ProductsService {
  private products: Product[] = [];
  private async findProduct(id: string){
    let product;
    try {
      product = await this.productModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Id is not valid');
    }
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async insertProduct(title: string, desc: string, price: number) {
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

  async getSingleProduct(productId: string) {
    const product = await this.findProduct(productId);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  async updateProduct(
    productId: string,
    title: string,
    prodDesc: string,
    prodPrice: number,
  ) {
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

  async deleteProduct(productId: string) {
    const result = await this.productModel.deleteOne({ _id: productId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('could not find the product');
    }
  }
}
