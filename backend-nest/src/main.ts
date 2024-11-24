import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

// CORS 설정
app.enableCors({
  origin: 'http://localhost:3000', // React 도메인
  methods: ['GET', 'POST'],        // 허용할 메서드
});

  await app.listen(4000);
}
bootstrap();
