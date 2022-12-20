import * as mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserSchema = mongoose.HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  id: string;
  @Prop()
  name: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
}

export const MongooseUserSchema = SchemaFactory.createForClass(User);
