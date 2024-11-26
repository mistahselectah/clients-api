import { ClientEntity } from '@entities/client.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from '@modules/clients/clients.module';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'sa',
      password: 'sa',
      database: 'sa',
      entities: [ClientEntity]
    }),
    AuthModule,
    ClientsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
