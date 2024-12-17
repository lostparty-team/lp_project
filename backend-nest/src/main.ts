import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
  const config = new DocumentBuilder()
    .setTitle('LP-Project NestJS Server')
    .setDescription('The NestJS Server description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Authrization: Bearer <token>',
      },
      'Authorization', // 스키마 이름: Authorization
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(4000);
}
bootstrap();
