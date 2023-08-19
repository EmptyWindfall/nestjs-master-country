import { Injectable } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { User } from "./user.model";
import { ReturnModelType } from "@typegoose/typegoose";
import { AuthRegisterDto } from "src/auth/auth.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>
    ) { }

    async register(data: AuthRegisterDto): Promise<User> {
        return this.userModel.create(data);
    }

    async getUser(query: object): Promise<User> {
        return this.userModel.findOne(query);
    }
}