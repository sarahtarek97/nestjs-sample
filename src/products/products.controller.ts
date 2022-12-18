import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Post()
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const product = await this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );

    return { product, message: 'inserted success' };
  }

  @Get()
  async getProducts() {
    const products = await this.productsService.getAllProducts();
    return products;
  }

  @Get(':id')
  async getSingleProduct(@Param('id') prodId: string) {
    return await this.productsService.getSingleProduct(prodId);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    await this.productsService.updateProduct(
      prodId,
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { message: 'updated success' };
  }

  @Delete(':id')
  async deleteProduct(@Param('id') prodId: string) {
    await this.productsService.deleteProduct(prodId);
    return { message: 'removed success' };
  }
}
