import { Body, Controller, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthLoginDto, AuthRegisterDto } from "./auth.dto";
import { AuthService } from "./auth.service";

@ApiTags('Auth')
@Controller('Auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOkResponse()
    @Post('Login')
    login(@Body() data: AuthLoginDto): Promise<string> {
        return this.authService.login(data)
    }

    @ApiCreatedResponse()
    @Post('Register')
    register(@Body() data: AuthRegisterDto): Promise<void> {
        return this.authService.register(data)
    }
}