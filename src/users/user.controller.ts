import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { AuthGuard } from "src/auth/auth.guard";

@ApiTags('Users')
@Controller('Users')
export class UserController {
    constructor(
        private userService: UserService,
    ) {}

    @UseGuards(AuthGuard)
    @ApiBearerAuth('JWT')
    @ApiOkResponse()
    @Get()
    getUsers() {
        return this.userService.getUsers()
    }
}