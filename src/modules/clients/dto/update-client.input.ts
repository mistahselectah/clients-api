import { ERole } from '@common/enum';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { MoreThan } from "typeorm";

export class UpdateClientInput {
  @ApiProperty({ description: 'Счет клиента', required: false })
  @IsNumber()
  @MoreThan(0)
  @IsOptional()
  amount?: number;

  @ApiProperty({ description: 'Email клиента', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ description: 'Имя клиента', required: false })
  @IsString()
  @MinLength(5)
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Роль клиента', required: false })
  @IsEnum(ERole)
  @IsOptional()
  role?: string;

  @ApiProperty({ description: 'Пароль клиента', required: false })
  @IsOptional()
  password?: string;
}
