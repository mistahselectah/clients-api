import { ClientsEntity } from '@entities/clients.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from '@modules/clients/clients.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'sa',
          password: 'sa',
          database: 'sa',
          entities: [ClientsEntity],
    }),
    ClientsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
