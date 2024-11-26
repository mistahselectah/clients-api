import { ApiProperty } from '@nestjs/swagger';

export class LoginOutput {

  @ApiProperty({description: 'Роль пользователя'})
  role: string;

  @ApiProperty({description: 'Токен для авторизации'})
  token: string;
}
