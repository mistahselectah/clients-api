import { AuthService } from '@modules/auth/auth.service';
import { LoginInput } from '@modules/auth/dto/login.input';
import { LoginOutput } from '@modules/auth/dto/login.output';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiOkResponse({ type: LoginOutput })
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse()
  @Post('login')
  login(@Body(ValidationPipe) body: LoginInput): Promise<LoginOutput> {
    return this.authService.login(body);
  }
}
