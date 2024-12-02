import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 정의된 속성만 허용
      forbidNonWhitelisted: true, //  정의되지 않은 속성은 에러 발생하게 만듦.
    }),
  );
  app.enableCors({
    origin: 'http://localhost:3000', // React 도메인
    methods: ['GET', 'POST'], // 허용할 메서드
  });

  await app.listen(4000);
}
bootstrap();
