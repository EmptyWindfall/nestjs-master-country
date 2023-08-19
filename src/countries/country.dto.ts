import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsString, Length } from "class-validator";

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
    @Length(3, 3)
    @IsString()
    @Expose()
    alpha3: string

    @ApiPropertyOptional()
    @IsString()
    @Expose()
    phoneCode: string

    @ApiProperty({ required: true })
    @IsString()
    @Expose()
    capital: string

    @ApiPropertyOptional()
    @IsString()
    @Expose()
    currency: string

    @ApiPropertyOptional()
    @IsString()
    @Expose()
    continent: string

    @ApiPropertyOptional()
    @IsString()
    @Expose()
    continentCode: string
}