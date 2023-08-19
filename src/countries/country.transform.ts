import { ApiPropertyOptional, ApiResponseProperty } from "@nestjs/swagger"
import { Expose, Transform } from "class-transformer"

export class TCountryResponse {
    @ApiResponseProperty()
    @Transform(({ obj }) => obj._id)
    @Expose()
    id: string
    
    @ApiResponseProperty()
    @Expose()
    name: string

    @ApiResponseProperty()
    @Expose()
    code: string

    @ApiPropertyOptional()
    @Expose()
    alpha3: string

    @ApiPropertyOptional()
    @Expose()
    phoneCode: string

    @ApiResponseProperty()
    @Expose()
    capital: string

    @ApiPropertyOptional()
    @Expose()
    currency: string

    @ApiPropertyOptional()
    @Expose()
    continent: string

    @ApiPropertyOptional()
    @Expose()
    continentCode: string

    @ApiResponseProperty()
    @Expose()
    createdAt: Date

    @ApiResponseProperty()
    @Expose()
    updatedAt: Date
}