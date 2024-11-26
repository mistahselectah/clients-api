import { md5 } from '@common/functions';
import { ClientEntity } from '@entities/client.entity';
import { ClientOutput } from '@modules/clients/dto/client.output';
import { CreateClientInput } from '@modules/clients/dto/create-client.input';
import { TotalAmountOutput } from '@modules/clients/dto/total-amount.output';
import { UpdateClientInput } from '@modules/clients/dto/update-client.input';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClientsService {
  constructor(@InjectRepository(ClientEntity) private clientsRepo: typeof ClientEntity) {
  }

  private mapEntityToOutput(client: ClientEntity): ClientOutput {
    const {password, ...listItem} = client;
    return listItem;
  }

  async getTotalAmount(): Promise<TotalAmountOutput> {
    const result =  await this.clientsRepo.createQueryBuilder('clients')
      .select('sum(clients.amount)', 'totalAmount')
      .execute();
    return {totalAmount: Number(result[0].totalAmount)};
  }

  async deleteClient(id: string): Promise<void> {
    await this.clientsRepo.delete({id});
  }

  async updateClient(id: string, input: UpdateClientInput): Promise<ClientOutput> {
    let client, password;
    if (input.password) {
      password = md5(input.password);
      client =  {id, ...input, password} as ClientEntity;
    } else {
      client =  {id, ...input} as ClientEntity;
    }
    await this.clientsRepo.update({id}, client);
    const updatedClient = await this.clientsRepo.findOneBy({id});
    return this.mapEntityToOutput(updatedClient);
  }

  async createClient(input: CreateClientInput): Promise<ClientOutput> {
    const password = md5(input.password);
    const client =  await this.clientsRepo.save({...input, password} as ClientEntity);
    return this.mapEntityToOutput(client);
  }

  async getClients(): Promise<ClientOutput[]> {
    const clients =  await this.clientsRepo.find();
    return clients.map(this.mapEntityToOutput);
  }
}
