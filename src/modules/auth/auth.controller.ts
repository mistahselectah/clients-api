import { BAD_REQUEST_ERROR, INTERNAL_SERVER_ERROR, UNAUTHORIZED_ERROR } from '@common/constants';
import { AuthService } from '@modules/auth/auth.service';
import { LoginInput } from '@modules/auth/dto/login.input';
import { LoginOutput } from '@modules/auth/dto/login.output';
import { Body, Controller, HttpCode, Post, ValidationPipe } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse, ApiOkResponse,
  ApiOperation,
  ApiTags, ApiUnauthorizedResponse
} from '@nestjs/swagger';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiBody({type: LoginInput})
  @ApiOkResponse({ type: LoginOutput })
  @ApiBadRequestResponse({example: BAD_REQUEST_ERROR})
  @ApiUnauthorizedResponse({example: UNAUTHORIZED_ERROR})
  @ApiInternalServerErrorResponse({example: INTERNAL_SERVER_ERROR})
  @Post('login')
  @HttpCode(200)
  login(@Body(ValidationPipe) body: LoginInput): Promise<LoginOutput> {
    return this.authService.login(body);
  }
}
