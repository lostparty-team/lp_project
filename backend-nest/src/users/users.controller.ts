import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Session,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserRequestDto } from './dto/register-user.request.dto';
import { LoginUserRequestDto } from './dto/login-user.request.dto';
import session from 'express-session';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() registerUserRequestDto: RegisterUserRequestDto) {
    await this.usersService.register(registerUserRequestDto);
    return {
      sucess: true,
    };
  }

  @Post('login')
  async login(
    @Body() loginUserRequestDto: LoginUserRequestDto,
    @Session() session,
  ) {
    const userInfo = await this.usersService.login(loginUserRequestDto);
    session.login = true;
    session.user = userInfo;
    return {
      sucess: true,
    };
  }

  @Get('me')
  async me(@Session() session) {
    if (!session?.login)
      throw new UnauthorizedException('로그인 후 이용해주세요.');
    return this.usersService.findUser(session.user.id);
  }
}
