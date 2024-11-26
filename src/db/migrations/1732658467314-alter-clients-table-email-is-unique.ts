import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterClientsTableEmailIsUnique1732658467314 implements MigrationInterface {
    name = 'AlterClientsTableEmailIsUnique1732658467314'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "UQ_b48860677afe62cd96e12659482" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "UQ_b48860677afe62cd96e12659482"`);
    }

}
