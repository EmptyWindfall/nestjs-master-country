import { Injectable } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { User } from "./user.model";
import { ReturnModelType } from "@typegoose/typegoose";
import { TUserResponse } from "./user.transform";
import { transformArray } from "../utils/transform.util";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User)
        private userModel: ReturnModelType<typeof User>
    ) { }

    async getUsers(): Promise<TUserResponse[]> {
        const data = await this.userModel.find()
        return transformArray(TUserResponse, data)
    }
}