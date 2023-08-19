import { ApiProperty } from "@nestjs/swagger"

export class AuthLoginDto {
    @ApiProperty()
    username: string

    @ApiProperty()
    password: string
}

export class AuthRegisterDto {
    @ApiProperty()
    name: string

    @ApiProperty()
    pass: string
    
    @ApiProperty()
    email: string

    @ApiProperty()
    countryCode: string
}