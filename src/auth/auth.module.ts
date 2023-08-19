import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { User } from "src/users/user.model";
import { TypegooseModule } from "nestjs-typegoose";
import { Country } from "src/countries/country.model";

@Module({
    imports: [
        TypegooseModule.forFeature([User, Country]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('app.jwtSecret'),
                signOptions: {
                    expiresIn: '1d',
                },
            }),
            inject: [ConfigService],
        }),
        ConfigModule,
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService, JwtModule, ConfigModule],
})
export class AuthModule { }