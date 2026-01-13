import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  // Chama a funções do nest
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Blog Pessoal')
    .setDescription('Projeto Blog Pessoal')
    .setContact("Generation Brasil", "http://www.generationbrasil.online", "generation@email.com")
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  //Ajustando o Fuso do DB
  process.env.TZ = '-03:00';

  //Faz validações no codigo
  app.useGlobalPipes(new ValidationPipe());

  //Faz as requisições funcionarem
  app.enableCors();

  await app.listen(4000);
}
bootstrap();
