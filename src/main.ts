import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  
  // Chama a funções do nest
  const app = await NestFactory.create(AppModule);
  
  //Ajustando o Fuso do DB
  process.env.TZ = '-03:00';

  //Faz validações no codigo
  app.useGlobalPipes(new ValidationPipe());
  
  //Faz as requisições funcionarem
  app.enableCors();

  await app.listen( 4000);
}
bootstrap();
