import { md5 } from '../../common/functions';
import { ClientEntity } from '../../db/entities/client.entity';
import { MigrationInterface, QueryRunner } from "typeorm";

export class EncryptPasswords1732586432771 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const clients = await queryRunner.manager.find(ClientEntity);
    for (let client of clients) {
      const password = md5(client.password);
      await queryRunner.manager.update(ClientEntity, {id: client.id}, {password});
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
