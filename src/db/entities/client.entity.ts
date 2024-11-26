import { NumericColumnTransformer } from '@common/utils/numeric-column-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ERole } from '../../common/enum';

@Entity('clients')
export class ClientEntity extends BaseEntity {
  @ApiProperty({ description: 'Уникальный идентификатор клиента' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Счет клиента', type: 'number' })
  // https://stackoverflow.com/questions/76921431/typeorm-postgres-nestjs-columndecimal-is-returning-string
  @Column('numeric', { transformer: new NumericColumnTransformer() })
  amount: number;

  @ApiProperty({ description: 'Email клиента' })
  @Column()
  email: string;

  @ApiProperty({ description: 'Имя клиента' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Роль клиента' })
  @Column('enum', {
    name: 'role',
    enumName: 'UserRole',
    enum: ERole,
    default: ERole.USER,
  })
  role: ERole;

  @ApiProperty({ description: 'Пароль клиента' })
  @Column({ default: 'user' })
  password: string;
}
