import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clients')
export class ClientsEntity extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('numeric')
  amount: number;

  @Column()
  email: string;

  @Column()
  name: string;
}
