import { AuthService } from './../auth/auth.service';
import { LoginUserRequestDto } from './dto/login-user.request.dto';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { RegisterUserRequestDto } from './dto/register-user.request.dto';
import { Repository } from 'typeorm';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly httpService: HttpService,
    private readonly authService: AuthService,
  ) {}

  async register(registerUserRequestDto: RegisterUserRequestDto) {
    const { userId, password, apiKey } = registerUserRequestDto;

    const exist = await this.userRepository.findOne({
      where: {
        userId,
      },
    });

    if (exist) throw new BadRequestException('이미 존재하는 아이디입니다.');

    await this.validateApiKey(apiKey);

    const hashedPassword = await this.passwordHash(password);

    const newUser = new User();
    newUser.password = hashedPassword;
    newUser.userId = userId;
    newUser.apiKey = apiKey;

    try {
      await this.userRepository.save(newUser);
    } catch (e) {
      throw new BadRequestException(
        '회원가입에 실패했습니다. 다시 시도해주세요',
      );
    }
  }

  private async validateApiKey(apiKey: string) {
    try {
      const url = 'https://developer-lostark.game.onstove.com/characters'; // 로스트아크 API 엔드포인트 (예시)
      const response = await lastValueFrom(
        this.httpService.get(url, {
          headers: {
            Authorization: `Bearer ${apiKey}`, // API Key를 헤더에 추가
          },
        }),
      );

      return response.status === 200;
    } catch (error) {
      throw new BadRequestException('잘못된 키 정보입니다.');
    }
  }

  private async passwordHash(password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  private async passwordMatch(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }

  async login(loginUserRequestDto: LoginUserRequestDto) {
    const { userId, password } = loginUserRequestDto;

    const user = await this.userRepository.findOne({
      where: {
        userId,
      },
    });

    if (!user) throw new BadRequestException('정보를 다시 확인해주세요.');

    const isMatch = await this.passwordMatch(password, user.password);

    if (!isMatch) throw new BadRequestException('정보를 다시 확인해주세요.');

    const jwtPayload = { id: user.id };

    return {
      access_token: await this.authService.generateToken(jwtPayload),
    };
  }

  async findUser(id) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!user) throw new UnauthorizedException('로그인 후 사용해주세요.');
    const { password: pass, ...userInfowithoutPassword } = user;
    return userInfowithoutPassword;
  }
}
