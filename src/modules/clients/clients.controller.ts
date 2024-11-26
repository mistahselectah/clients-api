import { ClientEntity } from '@entities/client.entity';
import { AdminGuard } from '@modules/auth/guards/admin.guard';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
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
  @ApiOkResponse({ type: [ClientEntity] })
  @ApiInternalServerErrorResponse()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get()
  getClients(): Promise<ClientEntity[]> {
    return this.clientsService.getClients();
  }
}
