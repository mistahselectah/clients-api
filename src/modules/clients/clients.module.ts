import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsEntity } from '@entities/clients.entity';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ClientsEntity])],
  controllers: [ClientsController],
  providers: [ClientsService]
})
export class ClientsModule {}
