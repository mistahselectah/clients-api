import 'dotenv/config';
import { DataSource } from 'typeorm';
import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';
import config from "../config/app.config";

export const MIGRATION_CONFIG = {
  ...(config().db),
  entities: ['src/db/entities/*.entity{.ts,.js}'],
  migrations: ['src/db/migrations/*{.ts,.js}'],
  migrationsTableName: 'typeorm_migrations',
  migrationsTransactionMode: 'all',
} as DataSourceOptions;

export const migrationsDatasource = new DataSource(MIGRATION_CONFIG);
migrationsDatasource.initialize();
