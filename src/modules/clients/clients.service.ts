import { ClientEntity } from '@entities/client.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClientsService {
  constructor(@InjectRepository(ClientEntity) private clientsRepo: typeof ClientEntity) {
  }

  async getClients(): Promise<ClientEntity[]> {
    return await this.clientsRepo.find();
  }
}
