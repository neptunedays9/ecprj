import { Controller, Get } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { User } from '../types/user';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('user')
  getUser(): User {
    return  this.appService.getUser();
  }
}
