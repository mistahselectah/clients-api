import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateClientsTable1732664407687 implements MigrationInterface {
    name = 'CreateClientsTable1732664407687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."UserRole" AS ENUM('ADMIN', 'USER')`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" numeric NOT NULL, "email" character varying NOT NULL, "name" character varying NOT NULL, "role" "public"."UserRole" NOT NULL DEFAULT 'USER', "password" character varying NOT NULL DEFAULT 'user', CONSTRAINT "UQ_b48860677afe62cd96e12659482" UNIQUE ("email"), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TYPE "public"."UserRole"`);
    }

}
