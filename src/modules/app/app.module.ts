import { ClientEntity } from '@entities/client.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from '@modules/clients/clients.module';
import { AuthModule } from '@modules/auth/auth.module';
import { get } from 'env-var';
import { RBAcModule } from 'nestjs-rbac';
import { RBAC } from '../../rbac/settings';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: get('POSTGRES_HOST').required().asString(),
      port: get('POSTGRES_PORT').required().asPortNumber(),
      username: get('POSTGRES_USER').required().asString(),
      password: get('POSTGRES_PASSWORD').required().asString(),
      database: get('POSTGRES_DB').required().asString(),
      entities: [ClientEntity],
      // logging: true
    }),
    RBAcModule.forRoot(RBAC),
    AuthModule,
    ClientsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
