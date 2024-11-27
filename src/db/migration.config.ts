import 'dotenv/config';
import { get } from "env-var";
import { DataSource } from 'typeorm';
import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';

export const MIGRATION_CONFIG = {
  type: 'postgres',
  host: get('POSTGRES_HOST').required().asString(),
  port: get('POSTGRES_PORT').required().asPortNumber(),
  username: get('POSTGRES_USER').required().asString(),
  password: get('POSTGRES_PASSWORD').required().asString(),
  database: get('POSTGRES_DB').required().asString(),
  entities: ['src/db/entities/*.entity{.ts,.js}'],
  migrations: ['src/db/migrations/*{.ts,.js}'],
  migrationsTableName: 'typeorm_migrations',
  migrationsTransactionMode: 'all',
} as DataSourceOptions;

export const migrationsDatasource = new DataSource(MIGRATION_CONFIG);
migrationsDatasource.initialize();
