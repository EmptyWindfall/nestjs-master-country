import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
    imports: [
        TypegooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get("database.uri")
            }),
            inject: [ConfigService]
        }),
    ],
})
export class DatabaseModule {}