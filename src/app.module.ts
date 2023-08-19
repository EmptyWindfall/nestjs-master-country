import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import appConfig from './_common/config/app.config';
import databaseConfig from './_common/config/database.config';
import { DatabaseModule } from './_common/database/database.module';
import { CountryModule } from './countries/country.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, databaseConfig],
    }),
    DatabaseModule,
    CountryModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
