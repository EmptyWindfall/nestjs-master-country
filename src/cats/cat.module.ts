import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { Cat } from "./cat.model";
import { CatsController } from "./cat.controller";
import { CatsService } from "./cat.service";
 
@Module({
  imports: [TypegooseModule.forFeature([Cat])],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}