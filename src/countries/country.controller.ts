import { Controller, Get, Post, Body } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { CountryService } from "./country.service";
import { CreateCountryDto } from "./country.dto";
import { TCountryResponse } from "./country.transform";

@ApiTags('Countries')
@Controller('Countries')
export class CountryController {
    constructor(private readonly countryService: CountryService) { }

    @ApiOkResponse({ type: [TCountryResponse] })
    @Get()
    getCountry(): Promise<TCountryResponse[]> {
        return this.countryService.findAll();
    }

    @ApiCreatedResponse({ type: TCountryResponse })
    @Post()
    createCountry(@Body() data: CreateCountryDto): Promise<TCountryResponse> {
        return this.countryService.create(data);
    }
}