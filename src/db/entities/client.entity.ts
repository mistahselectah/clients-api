import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EUserRole } from '../../common/enum';

@Entity('clients')
export class ClientEntity extends BaseEntity{
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

  @ApiProperty({description: 'Роль клиента'})
  @Column('enum', {
    name: 'role',
    enumName: 'UserRole',
    enum: EUserRole,
    default: EUserRole.USER,
  })
  role: EUserRole;

  @ApiProperty({description: 'Пароль клиента'})
  @Column({default: 'user'})
  password: string;
}
