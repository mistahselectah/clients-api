import { MigrationInterface, QueryRunner } from "typeorm";
import { ClientEntity } from '../../db/entities/client.entity';

const clients = [
  { name: 'Alice', email: 'alice@example.com', amount: 1.22 },
  { name: 'Bob', email: 'bob@example.com', amount: 2.33 },
  { name: 'Claire', email: 'claire@example.com', amount: 3.44 },
  { name: 'Diana', email: 'diana@example.com', amount: 44.555 },
  { name: 'Elon', email: 'elon@example.com', amount: 555 },
];

export class SeedingClients1732567461516 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (let client of clients) {
      await queryRunner.manager.save(ClientEntity.create({ ...client }));
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.query('truncate table clients;');
  }

}
