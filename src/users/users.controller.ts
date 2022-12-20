import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  Param,
  Patch,
  Delete,
  BadRequestException,
  Res,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Request, Response } from "express";

@Controller("api/v1/users")
export class UsersController {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  @Get()
  async getUsers() {
    const users = await this.usersService.getUsers();
    return users;
  }

  @Post("register")
  async register(
    @Body("name") name: string,
    @Body("email") email: string,
    @Body("password") password: string
  ) {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await this.usersService.register({
      name,
      email,
      password: hashedPassword,
    });

    delete user.password;
    return user;
  }

  @Post("login")
  async login(
    @Body("email") email: string,
    @Body("password") password: string,
    @Res({ passthrough: true }) response: Response
  ) {
    const user = await this.usersService.findOne({ email });
    if (!user) {
      throw new BadRequestException("invalid creditials");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new BadRequestException("invalid creditials");
    }
    console.log(user);
    const jwt = this.jwtService.sign({ id: user._id });
    response.cookie("jwt", jwt, { httpOnly: true });

    return {
      message: "success",
    };
  }

  @Get("singleUser")
  async user(@Req() request: Request) {
    try {
      const cookie = request.cookies["jwt"];

      const data = await this.jwtService.verify(cookie);
      if (!data) {
        throw new UnauthorizedException();
      }
      const user = await this.usersService.findOne({ _id: data.id });

      return user;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  @Post()
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie("jwt");
    return {
      message: " logout success",
    };
  }
}
