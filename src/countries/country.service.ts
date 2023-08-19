import { Injectable } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { Country } from "./country.model";
import { ReturnModelType } from "@typegoose/typegoose";
import { CreateCountryDto } from "./country.dto";
import { transformArray, transformObject } from "../_common/utils/transform.util";
import { TCountryResponse } from "./country.transform";

@Injectable()
export class CountryService {
    constructor(
        @InjectModel(Country)
        private countryModel: ReturnModelType<typeof Country>
    ) { }

    async create(data: CreateCountryDto): Promise<TCountryResponse> {
        const result = await this.countryModel.create(data)
        return transformObject(TCountryResponse, result)
    }

    async findAll(): Promise<TCountryResponse[]> {
        const result = await this.countryModel.find()
        return transformArray(TCountryResponse, result)
    }
}