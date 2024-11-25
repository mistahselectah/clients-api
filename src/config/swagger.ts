import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const configureSwagger = (app: INestApplication) => {
    const config = new DocumentBuilder().setTitle('SA Test').build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`/doc`, app, document);
};
