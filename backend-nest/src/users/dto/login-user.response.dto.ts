import { ApiProperty } from '@nestjs/swagger';

export class LoginUserResponseDto {
  @ApiProperty({
    description: '서버에서 발급한 access_token',
    type: 'string',
    example: 'jwt_token...',
  })
  access_token: string;
}
