import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([User]), AuthModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
