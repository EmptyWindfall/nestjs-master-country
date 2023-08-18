import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateCountryDto {
    @ApiProperty()
    name: string

    @ApiProperty()
    code: string

    @ApiPropertyOptional()
    alpha3: string

    @ApiPropertyOptional()
    phoneCode: string

    @ApiProperty()
    capital: string

    @ApiPropertyOptional()
    currency: string

    @ApiPropertyOptional()
    continent: string

    @ApiPropertyOptional()
    continentCode: string
}