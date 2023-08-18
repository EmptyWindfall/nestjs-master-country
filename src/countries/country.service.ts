import { Injectable } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { Country } from "./country.model";
import { ReturnModelType } from "@typegoose/typegoose";
import { CreateCountryDto } from "./country.dto";

@Injectable()
export class CountryService {
    constructor(
        @InjectModel(Country)
        private catModel: ReturnModelType<typeof Country>
    ) { }

    async create(createCatDto: CreateCountryDto): Promise<Country> {
        const createdCat = new this.catModel(createCatDto);
        return createdCat.save();
    }

    async findAll(): Promise<Country[] | null> {
        return this.catModel.find().exec();
    }
}