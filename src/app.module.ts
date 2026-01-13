import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postagem/entities/postagem.entity';
import { PostagemModule } from './postagem/postagem.module';
import { Tema } from './tema/entities/tema.entity';
import { TemaModule } from './tema/tema.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './Usuario/usuario.module';
import { Usuario } from './Usuario/Entities/usuario.entity';
import { ConfigModule } from '@nestjs/config';
import { ProdService } from './data/services/prod.service';
import { AppController } from './app.controller';

//Decorator e uma etiqueta de Metadados
//Arquivos modulos são o que conecta com a parte principal
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: ProdService,
      imports: [ConfigModule],
    }),
    PostagemModule,
    TemaModule,
    AuthModule,
    UsuarioModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
