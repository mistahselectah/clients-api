import { BAD_REQUEST_ERROR, FORBIDDEN_ERROR } from '@common/constants';
import { EAction, EResource } from '@common/enum';
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
import { RBAC_REQUEST_FILTER, RBAcGuard, RBAcPermissions } from 'nestjs-rbac';
import { IsEntityExistsPipe } from '../../pipes/is-entity-exists.pipe';
import { ClientsService } from './clients.service';

@ApiTags('Клиенты')
@UseGuards(JwtAuthGuard, RBAcGuard)
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @ApiOperation({ summary: 'Получить список пользователей' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: [ClientOutput] })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse({example: FORBIDDEN_ERROR})
  @ApiInternalServerErrorResponse()
  @RBAcPermissions(`${EResource.CLIENTS}@${EAction.LIST}`)
  @UseGuards(RBAcGuard)
  @Get()
  async getClients(): Promise<ClientOutput[]> {
    return this.clientsService.getClients();
  }

  @ApiOperation({ summary: 'Создать пользователя' })
  @ApiBearerAuth()
  @ApiBody({type: CreateClientInput})
  @ApiCreatedResponse({ type: ClientOutput })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse({example: FORBIDDEN_ERROR})
  @ApiBadRequestResponse({example: BAD_REQUEST_ERROR})
  @ApiInternalServerErrorResponse()
  @RBAcPermissions(`${EResource.CLIENTS}@${EAction.CREATE}`)
  @Post()
  async createClient(@Body(ValidationPipe) body: CreateClientInput): Promise<ClientOutput> {
    return this.clientsService.createClient(body);
  }

  @ApiOperation({ summary: 'Изменить данные пользователя' })
  @ApiBearerAuth()
  @ApiBody({type: UpdateClientInput})
  @ApiParam({name: 'id', type: String})
  @ApiOkResponse({type: ClientOutput})
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse({example: FORBIDDEN_ERROR})
  @ApiBadRequestResponse({example: BAD_REQUEST_ERROR})
  @ApiInternalServerErrorResponse()
  @RBAcPermissions(`${EResource.CLIENTS}@${RBAC_REQUEST_FILTER}`)
  @Put(':id')
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
  @ApiForbiddenResponse({example: FORBIDDEN_ERROR})
  @ApiInternalServerErrorResponse()
  @RBAcPermissions(`${EResource.CLIENTS}@${EAction.DELETE}`)
  @Delete(':id')
  @HttpCode(204)
  async deleteClient(@Param('id', ParseUUIDPipe, IsEntityExistsPipe(ClientEntity)) id: string): Promise<void> {
    await this.clientsService.deleteClient(id);
  }

  @ApiOperation({ summary: 'Получить сумму всех счетов пользователей' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: TotalAmountOutput })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse({example: FORBIDDEN_ERROR})
  @ApiInternalServerErrorResponse()
  @RBAcPermissions(`${EResource.CLIENTS}@${EAction.GET_TOTAL_AMOUNT}`)
  @Get('total-amount')
  async getTotalAmount(): Promise<TotalAmountOutput> {
    return this.clientsService.getTotalAmount();
  }
}
