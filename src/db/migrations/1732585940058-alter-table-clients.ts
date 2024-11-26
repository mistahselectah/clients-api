import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableClients1732585940058 implements MigrationInterface {
    name = 'AlterTableClients1732585940058'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."UserRole" AS ENUM('ADMIN', 'USER')`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "role" "public"."UserRole" NOT NULL DEFAULT 'USER'`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "password" character varying NOT NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."UserRole"`);
    }

}
