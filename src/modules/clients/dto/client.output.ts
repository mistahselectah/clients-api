import { ApiProperty } from '@nestjs/swagger';

export class ClientOutput {
  @ApiProperty({description: 'Уникальный идентификатор клиента'})
  id: string;

  @ApiProperty({description: 'Счет клиента'})
  amount: number;

  @ApiProperty({description: 'Email клиента'})
  email: string;

  @ApiProperty({description: 'Имя клиента'})
  name: string;

  @ApiProperty({description: 'Роль пользователя'})
  role: string;
}
