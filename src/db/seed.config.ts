import * as dotenv from 'dotenv';
import {DataSource} from 'typeorm';
import {MIGRATION_CONFIG} from './migration.config';
dotenv.config();

const config = {
  ...MIGRATION_CONFIG,
  migrations: ['src/db/seeds/*{.ts,.js}'],
  migrationsTableName: 'typeorm_seeds',
  synchronize: false,
};

export const migrationsDatasource = new DataSource(config);
migrationsDatasource.initialize();
