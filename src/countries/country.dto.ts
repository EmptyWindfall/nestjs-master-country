import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsString, Length, ValidateIf } from "class-validator";

export class CreateCountryDto {
    @ApiProperty({ required: true })
    @IsString()
    @Expose()
    name: string

    @ApiProperty({ required: true })
    @Length(2, 2)
    @IsString()
    @Expose()
    code: string

    @ApiPropertyOptional()
    @ValidateIf(({ alpha3 }) => alpha3 !== undefined)
    @Length(3, 3)
    @IsString()
    @Expose()
    alpha3?: string

    @ApiPropertyOptional()
    @ValidateIf(({ phoneCode }) => phoneCode !== undefined)
    @IsString()
    @Expose()
    phoneCode?: string

    @ApiProperty({ required: true })
    @IsString()
    @Expose()
    capital: string

    @ApiPropertyOptional()
    @ValidateIf(({ currency }) => currency !== undefined)
    @IsString()
    @Expose()
    currency?: string

    @ApiPropertyOptional()
    @ValidateIf(({ continent }) => continent !== undefined)
    @IsString()
    @Expose()
    continent?: string

    @ApiPropertyOptional()
    @ValidateIf(({ continentCode }) => continentCode !== undefined)
    @IsString()
    @Expose()
    continentCode?: string
}