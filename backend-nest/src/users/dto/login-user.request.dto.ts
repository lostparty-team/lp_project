import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginUserRequestDto {
  @ApiProperty({ example: 'user1', description: '유저의 고유 아이디' })
  @IsString()
  userId: string;

  @ApiProperty({ example: '1234', description: '비밀번호' })
  @IsString()
  password: string;
}
