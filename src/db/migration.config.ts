import * as dotenv from 'dotenv';
import {DataSource} from 'typeorm';
import {DataSourceOptions} from 'typeorm/data-source/DataSourceOptions';
dotenv.config();

export const MIGRATION_CONFIG = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  schema: process.env.DB_SCHEMA,
  entities: ['src/db/entities/*.entity{.ts,.js}'],
  migrations: ['src/db/migrations/*{.ts,.js}'],
  migrationsTableName: 'typeorm_migrations',
  migrationsTransactionMode: 'all',
} as DataSourceOptions;

export const migrationsDatasource = new DataSource(MIGRATION_CONFIG);
migrationsDatasource.initialize();
