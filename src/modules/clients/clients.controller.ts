import { ClientsEntity } from '@entities/clients.entity';
import { Controller, Get } from '@nestjs/common';
import { ClientsService } from './clients.service';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  getHello(): Promise<ClientsEntity[]> {
    return this.clientsService.getClients();
  }
}
