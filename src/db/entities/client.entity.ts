import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ERole } from '../../common/enum';
import { NumericColumnTransformer } from '../../common/utils/numeric-column-transformer';

@Entity('clients')
export class ClientEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // https://stackoverflow.com/questions/76921431/typeorm-postgres-nestjs-columndecimal-is-returning-string
  @Column('numeric', { transformer: new NumericColumnTransformer() })
  amount: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column('enum', {
    name: 'role',
    enumName: 'UserRole',
    enum: ERole,
    default: ERole.USER,
  })
  role: ERole;

  @Column({ default: 'user' })
  password: string;
}
