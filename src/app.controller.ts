import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  @ApiOkResponse()
  @Get('Healthz')
  getHello(): void {}
}
