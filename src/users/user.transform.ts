import { ApiPropertyOptional, ApiResponseProperty } from "@nestjs/swagger"
import { Expose, Transform } from "class-transformer"

export class TUserResponse {
    @ApiResponseProperty()
    @Transform(({ obj }) => obj._id)
    @Expose()
    id: string
    
    @ApiPropertyOptional()
    @Expose()
    username: string

    @ApiResponseProperty()
    @Expose()
    email: string

    @ApiPropertyOptional()
    @Expose()
    fName: string
    
    @ApiPropertyOptional()
    @Expose()
    lName: string

    @ApiPropertyOptional()
    @Expose()
    dob: Date

    @ApiResponseProperty()
    @Expose()
    country: string

    @ApiResponseProperty()
    @Expose()
    createdAt: Date

    @ApiResponseProperty()
    @Expose()
    updatedAt: Date
}