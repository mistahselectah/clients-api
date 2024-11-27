import { ApiProperty } from '@nestjs/swagger';

export class LoginOutput {
  @ApiProperty({ description: 'Токен для авторизации' })
  token: string;
}
