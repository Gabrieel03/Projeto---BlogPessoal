import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Postagem } from "./entities/postagem.entity";
import { PostagemService } from "./services/postagem.service";
import { PostagemController } from "./controller/postagem.controller";
import { TemaModule } from "../tema/tema.module";
import { TemaService } from "../tema/service/tema.service";
import { TemaController } from "../tema/controller/trma.controller";


@Module({
    imports: [TypeOrmModule.forFeature([Postagem]), TemaModule],
    controllers: [PostagemController, TemaController],
    providers: [PostagemService, TemaService],
    exports: [TypeOrmModule]    
})
export class PostagemModule { }