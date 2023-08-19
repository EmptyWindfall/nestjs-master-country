import { Injectable } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { User } from "./user.model";
import { ReturnModelType } from "@typegoose/typegoose";
import { AuthRegisterDto } from "src/auth/auth.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User)
        private userModel: ReturnModelType<typeof User>
    ) { }

    async getUsers(): Promise<User[]> {
        return this.userModel.find()
    }
}