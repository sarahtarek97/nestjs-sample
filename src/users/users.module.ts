import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { MongooseUserSchema } from './users.model';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: MongooseUserSchema }]),
    JwtModule.register({ secret: "secret", signOptions: { expiresIn: "1d" } }),

  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
