import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginInput {

  @ApiProperty({ description: 'Email пользователя' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Пароль пользователя' })
  @IsString()
  password: string;
}
