import 'dotenv/config';
import { ERole } from '../../common/enum';
import { get } from 'env-var';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { CreateClientInput } from '../../../src/modules/clients/dto/create-client.input';
import { md5 } from '../../common/functions';
import { ClientEntity } from '../../db/entities/client.entity';

const password = md5(get('DEFAULT_USER_PASSWORD').required().asString());

const clients: CreateClientInput[] = [
  {
    name: 'Alice',
    email: 'alice@example.com',
    amount: 1.22,
    role: ERole.ADMIN,
    password,
  },
  {
    name: 'Bob',
    email: 'bob@example.com',
    amount: 2.33,
    role: ERole.USER,
    password,
  },
  {
    name: 'Claire',
    email: 'claire@example.com',
    amount: 3.44,
    role: ERole.USER,
    password,
  },
  {
    name: 'Diana',
    email: 'diana@example.com',
    amount: 44.555,
    role: ERole.USER,
    password,
  },
  {
    name: 'Elon',
    email: 'elon@example.com',
    amount: 555,
    role: ERole.USER,
    password,
  },
];

export class SeedingClients1732567461516 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const client of clients) {
      await queryRunner.manager.save(ClientEntity.create(client as ClientEntity));
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.query('truncate table clients;');
  }
}
