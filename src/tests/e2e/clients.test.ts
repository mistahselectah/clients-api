import { AppModule } from "@modules/app/app.module";
import { LoginOutput } from "@modules/auth/dto/login.output";
import { ClientsService } from "@modules/clients/clients.service";
import { CreateClientInput } from "@modules/clients/dto/create-client.input";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as request from "supertest"

describe("Clients API", () => {
  let app: INestApplication;
  let httpServer;
  let adminToken;
  let userToken;
  let client1Id;
  let client2Id;
  let clientsService: ClientsService;

  const client1: CreateClientInput = {
    email: 'test1@example.com',
    password: '123',
    name: 'test',
    role: 'USER',
    amount: 1
  };
  const client2: CreateClientInput = {
    email: 'test2@example.com',
    password: '123',
    name: 'test2',
    role: 'USER',
    amount: 1
  };

  async function login(email: string, password: string): Promise<LoginOutput> {
    const response = await request(httpServer)
      .post("/api/auth/login")
      .send({ email, password });
    return response.body;
  }

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule(
      {
        imports: [AppModule]
      }
    ).compile();
    app = moduleRef.createNestApplication<INestApplication>();
    clientsService = app.get<ClientsService>(ClientsService);
    // app.useGlobalFilters(new HttpExceptionFilter());
    app.setGlobalPrefix('api');
    await app.init();
    httpServer = app.getHttpServer();
    const response  = await login('alice@example.com','123');
    adminToken = response.token;
  });

  it(`should get clients`, async () => {
    return request(httpServer)
      .get("/api/clients")
      .auth(adminToken, { type: 'bearer' })
      .expect(200)
      .then((response) => {
        expect(response.body).toBeDefined();
        expect(response.body.length).toBeGreaterThan(0);
      });
  });

  it(`should create client`, async () => {
    return request(httpServer)
      .post("/api/clients")
      .auth(adminToken, { type: 'bearer' })
      .send(client1)
      .expect(201)
      .then((response) => {
        expect(response.body).toBeDefined();
        expect(response.body.id).toBeDefined();
        expect(response.body.email).toEqual(client1.email);
        expect(response.body.name).toEqual(client1.name);
        expect(response.body.role).toEqual(client1.role);
        expect(response.body.amount).toEqual(client1.amount);
        expect(response.body.password).toBeFalsy();
        client1Id = response.body.id;
      });
  });

  it(`should not create client with existing email`, async () => {
    return request(httpServer)
      .post("/api/clients")
      .auth(adminToken, { type: 'bearer' })
      .send(client1)
      .expect(400)
      .then((response) => {
        expect(response.body.message).toBeDefined();
        expect(response.body.message).toEqual('Такой email уже занят');
      });
  });

  it(`should not create client without auth token`, async () => {
    return request(httpServer)
      .post("/api/clients")
      .send(client1)
      .expect(401)
      .then((response) => {
        expect(response.body.message).toBeDefined();
        expect(response.body.message).toEqual('Unauthorized');
      });
  });

  it(`should not create client without required fields`, async () => {
    const {name, email, password} = client1;
    return request(httpServer)
      .post("/api/clients")
      .auth(adminToken, { type: 'bearer' })
      .send({name, email, password})
      .expect(400);
  });

  it(`should not create client with invalid email`, async () => {
    return request(httpServer)
      .post("/api/clients")
      .auth(adminToken, { type: 'bearer' })
      .send({...client1, email: 'qq'})
      .expect(400);
  });

  it(`should update client`, async () => {
    const name = 'new name'
    return request(httpServer)
      .put(`/api/clients/${client1Id}`)
      .send({name})
      .auth(adminToken, { type: 'bearer' })
      .expect(200)
      .then((response) => {
        expect(response.body).toBeDefined();
        expect(response.body.name).toEqual(name);
      });
  });

  it(`should create client behalf of role USER`, async () => {
    const loginResponse = await login(client1.email, client1.password);
    userToken = loginResponse.token;
    return request(httpServer)
      .post(`/api/clients`)
      .send(client2)
      .auth(userToken, { type: 'bearer' })
      .expect(201)
      .then((response) => {
        expect(response.body).toBeDefined();
        expect(response.body.id).toBeDefined();
        expect(response.body.email).toEqual(client2.email);
        expect(response.body.name).toEqual(client2.name);
        expect(response.body.role).toEqual(client2.role);
        expect(response.body.amount).toEqual(client2.amount);
        expect(response.body.password).toBeFalsy();
        client2Id = response.body.id;
      });
  });

  it(`should update client behalf of owner`, async () => {
    const name = 'updated name';
    return request(httpServer)
      .put(`/api/clients/${client1Id}`)
      .send({ name })
      .auth(userToken, { type: 'bearer' })
      .expect(200)
      .then((response) => {
        expect(response.body).toBeDefined();
        expect(response.body.name).toEqual(name);
      });
  });

  it(`should not update client behalf of not owner`, async () => {
    const name = 'updated name';
    await request(httpServer)
      .put(`/api/clients/${client2Id}`)
      .send({ name })
      .auth(userToken, { type: 'bearer' })
      .expect(403);
    await clientsService.deleteClient(client2Id);
  });

  it(`should delete client`, async () => {
    return request(httpServer)
      .delete(`/api/clients/${client1Id}`)
      .auth(adminToken, { type: 'bearer' })
      .expect(204);
  });

  afterAll(async () => {
    await app.close();
  });
});
