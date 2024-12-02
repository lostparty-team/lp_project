import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as session from 'express-session';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private readonly configService: ConfigService) {}
  configure(consumer) {
    consumer
      .apply(
        session({
          secret: this.configService.get<string>('SESSION_SECRET'),
          resave: false,
          saveUninitialized: false,
          cookie: { maxAge: 3600000 },
        }),
      )
      .forRoutes('*'); // 모든 경로에 적용
  }
}
