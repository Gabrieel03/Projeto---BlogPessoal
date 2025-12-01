import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable() //Indica que a classe e de serviço e pode ser inserida e injetada em outras classes
export class PostagemService {

    //Iniciando Ferramentaas Para a Classe de Serviços
    constructor(
        @InjectRepository(Postagem) //PODE CHAMAR OS METODOS DE UMA CLASSE REPOSITORY
        private postagemRepository: Repository<Postagem>
    ) { }

    async findAll(): Promise<Postagem[]> {
        return await this.postagemRepository.find()
    }
}