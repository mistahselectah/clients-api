import { ERole } from '@common/enum';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNumber, IsPositive,
  IsString,
  MinLength
} from "class-validator";

export class CreateClientInput {
  @ApiProperty({ description: 'Счет клиента' })
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({ description: 'Email клиента' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Имя клиента' })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({ description: 'Роль клиента' })
  @IsEnum(ERole)
  role: string;

  @ApiProperty({ description: 'Пароль клиента' })
  @IsString()
  @MinLength(3)
  password: string;
}
