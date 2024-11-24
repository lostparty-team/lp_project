import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  controllers: [AppController], // 컨트롤러 등록
  providers: [AppService], // 서비스 등록
})
export class AppModule {}
