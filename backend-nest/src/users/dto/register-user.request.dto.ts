import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RegisterUserRequestDto {
  @ApiProperty({
    example: 'user1',
    description: '유저 아이디',
    type: 'string',
  })
  @IsString()
  userId: string;
  @ApiProperty({
    example: '1234',
    description: '비밀번호',
    type: 'string',
  })
  @IsString()
  password: string;
  @ApiProperty({
    description: '로스트아크에서 발급받은 토큰 키',
    type: 'string',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.PY-pIMoh1QKJeRxoYNyi9Ya1xWGfV29_lybHaFSC0vo',
  })
  @IsString()
  apiKey: string;
}
