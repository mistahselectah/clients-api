import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clients')
export class ClientsEntity extends BaseEntity{
  @ApiProperty({description: 'Уникальный идентификатор клиента'})
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({description: 'Счет клиента'})
  @Column('numeric')
  amount: number;

  @ApiProperty({description: 'Email клиента'})
  @Column()
  email: string;

  @ApiProperty({description: 'Имя клиента'})
  @Column()
  name: string;
}
