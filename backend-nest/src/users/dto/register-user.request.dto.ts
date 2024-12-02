import { IsString } from 'class-validator';

export class RegisterUserRequestDto {
  @IsString()
  userId: string;

  @IsString()
  password: string;

  @IsString()
  apiKey: string;
}
