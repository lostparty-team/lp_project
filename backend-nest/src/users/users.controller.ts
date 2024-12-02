import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserRequestDto } from './dto/register-user.request.dto';

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
}
