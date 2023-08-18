import { Controller, Get, Post, Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CountryService } from "./country.service";
import { Country } from "./country.model";
import { CreateCountryDto } from "./country.dto";

@ApiTags('Countries')
@Controller('Countries')
export class CountryController {
    constructor(private readonly countryService: CountryService) { }

    @Get()
    async getCats(): Promise<Country[] | null> {
        return await this.countryService.findAll();
    }

    @Post()
    async create(@Body() cat: CreateCountryDto): Promise<Country> {
        return await this.countryService.create(cat);
    }
}