import { ApiProperty } from '@nestjs/swagger';

export class TotalAmountOutput {
  @ApiProperty({ description: 'Сумма счетов всех пользователей' })
  totalAmount: number;
}
