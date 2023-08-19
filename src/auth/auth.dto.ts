import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { Expose } from "class-transformer"
import { IsDateString, IsEmail, IsNotEmpty, IsString, Length, ValidateIf } from "class-validator"

export class AuthLoginDto {
    @ApiProperty({ required: true })
    @IsString()
    @Expose()
    username: string

    @ApiProperty({ required: true })
    @Length(8, 20)
    @IsString()
    @Expose()
    password: string
}

export class AuthRegisterDto {
    @ApiPropertyOptional()
    @ValidateIf(({ username }) => username !== undefined)
    @Length(4, 16)
    @IsString()
    @Expose()
    username?: string

    @ApiProperty({ required: true })
    @Length(8, 20)
    @IsString()
    @Expose()
    password: string
    
    @ApiProperty({ required: true })
    @IsEmail()
    @Expose()
    email: string

    @ApiPropertyOptional()
    @ValidateIf(({ fName }) => fName !== undefined)
    @IsString()
    @Expose()
    fName?: string

    @ApiPropertyOptional()
    @ValidateIf(({ lName }) => lName !== undefined)
    @IsString()
    @Expose()
    lName?: string

    @ApiPropertyOptional()
    @ValidateIf(({ mName }) => mName !== undefined)
    @IsString()
    @Expose()
    mName?: string

    @ApiPropertyOptional()
    @ValidateIf(({ dob }) => dob !== undefined)
    @IsDateString()
    @Expose()
    dob?: Date

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    @Expose()
    countryCode: string
}