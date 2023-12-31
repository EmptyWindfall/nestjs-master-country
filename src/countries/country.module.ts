import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { Country } from "./country.model";
import { CountryController } from "./country.controller";
import { CountryService } from "./country.service";

@Module({
    imports: [TypegooseModule.forFeature([Country])],
    controllers: [CountryController],
    providers: [CountryService],
})
export class CountryModule { }