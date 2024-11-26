import { EUserRole } from '@common/enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNumber, IsString, Min, MinLength } from 'class-validator';

export class CreateClientInput {
  @ApiProperty({ description: 'Счет клиента' })
  @IsNumber()
  @Min(1)
  amount: number;

  @ApiProperty({ description: 'Email клиента' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Имя клиента' })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({ description: 'Роль клиента' })
  @IsEnum(EUserRole)
  role: string;

  @ApiProperty({ description: 'Пароль клиента' })
  @IsString()
  @MinLength(3)
  password: string;
}
