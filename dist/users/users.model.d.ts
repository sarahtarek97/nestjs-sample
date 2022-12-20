import * as mongoose from "mongoose";
export type UserSchema = mongoose.HydratedDocument<User>;
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
}
export declare const MongooseUserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User>;
