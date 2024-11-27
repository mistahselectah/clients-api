import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginInput {
  @ApiProperty({
    description: 'Email пользователя',
    example: 'bob@example.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Пароль пользователя', example: 'admin' })
  @IsString()
  password: string;
}
