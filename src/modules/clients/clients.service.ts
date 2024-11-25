import { ClientsEntity } from '@entities/clients.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClientsService {
  constructor(@InjectRepository(ClientsEntity) private clientsRepo: typeof ClientsEntity) {
  }

  async getClients(): Promise<ClientsEntity[]> {
    return await this.clientsRepo.find();
  }
}
