import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { get } from 'env-var';
import { configureSwagger } from './config/swagger';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('api');
  configureSwagger(app);
  await app.listen(get('API_PORT').required().asPortNumber());
}
bootstrap();
