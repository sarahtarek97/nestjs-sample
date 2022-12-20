import { Injectable } from "@nestjs/common";
import { User } from "./users.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
@Injectable()
export class UsersService {
  private users: User[] = [];

  constructor(@InjectModel("User") private userModel: Model<User>) {}

  async getUsers() {
    const users = await this.userModel.find().exec();
    return users;
  }
  async register(data: any) {
    console.log(data);
    const user = await this.userModel.create(data);
    return user;
  }

  async findOne(condition: any) {
    return this.userModel.findOne(condition);
  }
}
