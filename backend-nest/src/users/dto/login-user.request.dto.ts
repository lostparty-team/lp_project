import { IsString } from 'class-validator';

export class LoginUserRequestDto {
  @IsString()
  userId: string;

  @IsString()
  password: string;
}
