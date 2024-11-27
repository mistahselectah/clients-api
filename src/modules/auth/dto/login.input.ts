import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginInput {
  @ApiProperty({
    description: 'Email пользователя',
    example: 'alice@example.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Пароль пользователя', example: '123' })
  @IsString()
  password: string;
}
