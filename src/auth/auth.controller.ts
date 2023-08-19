import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthLoginDto, AuthRegisterDto } from "./auth.dto";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { TUserResponse } from "../users/user.transform";
import { UserMe } from "../_common/decorators/user.decorator";

@ApiTags('Auth')
@Controller('Auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard)
    @ApiBearerAuth('JWT')
    @ApiOkResponse()
    @Get('Me')
    userMe(@UserMe() user: TUserResponse) {
        return user
    }

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