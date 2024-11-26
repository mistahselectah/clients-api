import { AuthModule } from '@modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '@entities/client.entity';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([ClientEntity])],
  controllers: [ClientsController],
  providers: [ClientsService]
})
export class ClientsModule {}
