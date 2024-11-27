import 'dotenv/config';
import { ConfigService } from "@nestjs/config";
import { NestFactory } from '@nestjs/core';
import { configureSwagger } from './config/swagger';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('api');
  configureSwagger(app);
  const config = app.get<ConfigService>(ConfigService);
  await app.listen(config.get('api').port);
}
bootstrap();
