import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/shoe')
  getShoe(): { name: string } {
    return this.appService.getShoe(); // 서비스의 getShoe 메서드 호출
  }

  @Get()
  getHello(): string {
    return this.appService.getHello(); // 서비스의 getHello 메서드 호출
  }
}
