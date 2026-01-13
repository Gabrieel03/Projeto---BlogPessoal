import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { sensitiveHeaders } from 'http2';

describe('Teste do modulo de Usuario e Auth (e2e)', () => {

  let token: any;
  let usuarioId: any;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: "sqlite",
          database: ":memory:",
          entities: [__dirname + "./../src/**/entities/*.entity.ts"],
          synchronize: true,
          dropSchema: true
        }),
        AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });
  it("01 - Deve cadastrar um usuario", async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: "Root",
        usuario: "root@root.com",
        senha: "rootroot",
        foto: "-",
      })
      .expect(201);

    usuarioId = resposta.body.id;
  });

  it("02 - Não deve Cadastrar um Usuario Duplicado", async () => {
    return request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: "Root",
        usuario: "root@root.com",
        senha: "rootroot",
        foto: "-",
      })
      .expect(400);
  });

  it("03 - Deve autenticar um usuario (login)", async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/logar')
      .send({
        usuario: "root@root.com",
        senha: "rootroot",
      });
    expect(200);

    token = resposta.body.token;
  });

  it("04 - Deve Listar todos os usuarios", async () => {
    return await request(app.getHttpServer())
      .get('/usuarios/all')
      .set('Authorization', `${token}`)
      .expect(200);
  });

  it("05 - Deve Atualizar um usuario", async () => {
    return await request(app.getHttpServer())
      .put('/usuarios/atualizar')
      .set('Authorization', `${token}`)
      .send({
        id: usuarioId,
        nome: "Root Atualizado",
        usuario: "root@root.com",
        senha: "rootroot",
        foto: "-",
      })
      .expect(200)
      .then(resposta => {
        expect("Root Atualizado").toEqual(resposta.body.nome);
      });

  });
})
