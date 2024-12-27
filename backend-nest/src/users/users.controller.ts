import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Session,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserRequestDto } from './dto/register-user.request.dto';
import { LoginUserRequestDto } from './dto/login-user.request.dto';
import { Public } from 'src/auth/decorator/public.decorator';
import { User } from 'src/auth/decorator/user.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { UserResponseDto } from './dto/user.response.dto';
import { LoginUserResponseDto } from './dto/login-user.response.dto';
import { CommonResponseDto } from './dto/common-response.dto';
import { CheckUserIdResponseDto } from './dto/check-userid.response.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('register')
  @ApiOperation({
    summary: '회원가입',
    description: '회원가입 API',
  })
  @ApiResponse({
    status: 201,
    description: '회원가입 API',
    type: CommonResponseDto,
  })
  async register(@Body() registerUserRequestDto: RegisterUserRequestDto) {
    await this.usersService.register(registerUserRequestDto);
    return {
      sucess: true,
    };
  }
  @Public()
  @Post('login')
  @ApiOperation({
    summary: '로그인',
    description: '로그인 API',
  })
  @ApiResponse({
    status: 201,
    description: 'access_token을 응답해준다.',
    type: LoginUserResponseDto,
  })
  async login(@Body() loginUserRequestDto: LoginUserRequestDto) {
    return this.usersService.login(loginUserRequestDto);
  }

  @ApiOperation({
    summary: '내 정보 가져오기',
    description: '내 정보 가져오는 API',
  })
  @ApiResponse({
    status: 200,
    description: '유저 정보 반환',
    type: UserResponseDto,
  })
  @ApiSecurity('Authorization')
  @Get('me')
  async me(@User() user) {
    return this.usersService.findUser(user.id);
  }

  @ApiOperation({
    summary: '중복 체크',
    description: '중복 체크 API',
  })
  @ApiResponse({
    status: 200,
    description: '존재여부 반환',
    type: CheckUserIdResponseDto,
  })
  @Public()
  @Get('check-userid/:userid')
  async check(@Param() param) {
    const { userid } = param;
    return {
      exist: await this.usersService.duplicationCheck(userid),
    };
  }
}
