import { BAD_REQUEST_ERROR } from '@common/constants';
import { ClientEntity } from '@entities/client.entity';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { ClientOutput } from '@modules/clients/dto/client.output';
import { CreateClientInput } from '@modules/clients/dto/create-client.input';
import { TotalAmountOutput } from '@modules/clients/dto/total-amount.output';
import { UpdateClientInput } from '@modules/clients/dto/update-client.input';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  ValidationPipe
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiForbiddenResponse,
  ApiInternalServerErrorResponse, ApiNoContentResponse, ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation, ApiParam,
  ApiTags, ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { IsEntityExistsPipe } from '../../pipes/is-entity-exists.pipe';
import { ClientsService } from './clients.service';

@ApiTags('Клиенты')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @ApiOperation({ summary: 'Получить список пользователей' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: [ClientOutput] })
  @ApiUnauthorizedResponse()
  @ApiInternalServerErrorResponse()
  @UseGuards(JwtAuthGuard)
  @Get()
  async getClients(): Promise<ClientOutput[]> {
    return this.clientsService.getClients();
  }

  @ApiOperation({ summary: 'Создать пользователя' })
  @ApiBearerAuth()
  @ApiBody({type: CreateClientInput})
  @ApiCreatedResponse({ type: ClientOutput })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @ApiBadRequestResponse({example: BAD_REQUEST_ERROR})
  @ApiInternalServerErrorResponse()
  @UseGuards(JwtAuthGuard)
  @Post()
  async createClient(@Body(ValidationPipe) body: CreateClientInput): Promise<ClientOutput> {
    return this.clientsService.createClient(body);
  }

  @ApiOperation({ summary: 'Обновить данные пользователя' })
  @ApiBearerAuth()
  @ApiBody({type: UpdateClientInput})
  @ApiParam({name: 'id', type: String})
  @ApiOkResponse({type: ClientOutput})
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @ApiBadRequestResponse({example: BAD_REQUEST_ERROR})
  @ApiInternalServerErrorResponse()
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @HttpCode(200)
  async updateClient(
    @Param('id', ParseUUIDPipe, IsEntityExistsPipe(ClientEntity)) id: string,
    @Body(ValidationPipe) body: UpdateClientInput
  ): Promise<ClientOutput> {
    return this.clientsService.updateClient(id, body);
  }

  @ApiOperation({ summary: 'Удалить пользователя' })
  @ApiBearerAuth()
  @ApiParam({name: 'id', type: String})
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  async deleteClient(@Param('id', ParseUUIDPipe, IsEntityExistsPipe(ClientEntity)) id: string): Promise<void> {
    await this.clientsService.deleteClient(id);
  }

  @ApiOperation({ summary: 'Получить сумму всех счетов пользователей' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: TotalAmountOutput })
  @ApiUnauthorizedResponse()
  @ApiInternalServerErrorResponse()
  @UseGuards(JwtAuthGuard)
  @Get('total-amount')
  async getTotalAmount(): Promise<TotalAmountOutput> {
    return this.clientsService.getTotalAmount();
  }
}
