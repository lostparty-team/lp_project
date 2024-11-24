import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getShoe(): { name: string } {
    return { name: 'NestJS Shoe' }; // 컨트롤러에서 호출할 데이터
  }

  getHello(): string {
    return 'Hello World!'; // 추가적인 응답 예제
  }
}
