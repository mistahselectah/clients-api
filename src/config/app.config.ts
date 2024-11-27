import { ClientEntity } from "../db/entities/client.entity";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { get } from "env-var";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export interface IApiConfig {
  port: number;
  salt: string;
  defaultUserPassword: string;
}

export interface IConfig {
  api: IApiConfig;
  db: TypeOrmModuleOptions & PostgresConnectionOptions;
}

const api: IApiConfig = {
  port: get('API_PORT').required().asPortNumber(),
  salt: get('SALT').required().asString(),
  defaultUserPassword: get('DEFAULT_USER_PASSWORD').required().asString(),
}

const db: TypeOrmModuleOptions & PostgresConnectionOptions = {
  type: 'postgres',
  host: get('POSTGRES_HOST').required().asString(),
  port: get('POSTGRES_PORT').required().asPortNumber(),
  username: get('POSTGRES_USER').required().asString(),
  password: get('POSTGRES_PASSWORD').required().asString(),
  database: get('POSTGRES_DB').required().asString(),
  entities: [ClientEntity]
};

export default (): IConfig => ({
  api,
  db,
});
