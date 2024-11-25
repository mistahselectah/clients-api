import { ClientsEntity } from '@entities/clients.entity';
import { Controller, Get } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { ClientsService } from './clients.service';

@ApiTags('Клиенты')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @ApiOperation({ summary: 'Получить данные всех клиентов.' })
  @ApiOkResponse({ type: [ClientsEntity] })
  @ApiInternalServerErrorResponse()
  @Get()
  getClients(): Promise<ClientsEntity[]> {
    return this.clientsService.getClients();
  }
}
