import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProductsModule } from "./products/products.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ProductsModule,
    UsersModule,
    MongooseModule.forRoot("mongodb://localhost:27017/nestjs-demo"),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
