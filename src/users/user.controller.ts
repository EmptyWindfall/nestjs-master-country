import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Users')
@Controller('Users')
export class UserController {}