import { AppModule } from "@modules/app/app.module";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as request from "supertest";
import { HttpExceptionFilter } from "../../filters/http-exception.filter";

describe("Auth API", () => {
  let app: INestApplication;
  let httpServer;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule(
      {
        imports: [AppModule]
      }
    ).compile();
    app = moduleRef.createNestApplication<INestApplication>();
    app.useGlobalFilters(new HttpExceptionFilter());
    app.setGlobalPrefix('api');
    await app.init();
    httpServer = app.getHttpServer();
  });

  it(`GET /auth/login`, async () => {
    await request(httpServer)
      .post("/api/auth/login")
      .send({email: 'alice@example.com', password: '123'})
      .expect(200)
      .then((response) => {
        expect(response.body.token).toBeDefined();
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
