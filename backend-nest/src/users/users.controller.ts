import {
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
import { Public } from 'src/auth/decorator/public.decorator';
import { User } from 'src/auth/decorator/user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('register')
  async register(@Body() registerUserRequestDto: RegisterUserRequestDto) {
    await this.usersService.register(registerUserRequestDto);
    return {
      sucess: true,
    };
  }
  @Public()
  @Post('login')
  async login(@Body() loginUserRequestDto: LoginUserRequestDto) {
    return this.usersService.login(loginUserRequestDto);
  }

  @Get('me')
  async me(@User() user) {
    return this.usersService.findUser(user.id);
  }
}
