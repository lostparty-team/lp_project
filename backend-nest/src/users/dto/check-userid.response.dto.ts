import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CheckUserIdResponseDto {
  @ApiProperty({ description: '중복 체크' })
  @IsString()
  exist: boolean;
}
