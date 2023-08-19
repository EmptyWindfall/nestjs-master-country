import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { User } from "./user.model";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { JwtModule } from "@nestjs/jwt";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [TypegooseModule.forFeature([User]), AuthModule],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule {}