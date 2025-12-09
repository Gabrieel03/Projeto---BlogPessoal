import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ILike, Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult } from "typeorm/browser";
import { TemaService } from "../../tema/service/tema.service";

@Injectable() //Indica que a classe e de serviço e pode ser inserida e injetada em outras classes
export class PostagemService {

    //Iniciando Ferramentaas Para a Classe de Serviços
    constructor(
        @InjectRepository(Postagem) //PODE CHAMAR OS METODOS DE UMA CLASSE REPOSITORY
        private postagemRepository: Repository<Postagem>,
        private temaService: TemaService
    ) { }

    async findAll(): Promise<Postagem[]> {
        return await this.postagemRepository.find()
    }

    async findById(id: number): Promise<Postagem> {

        const postagem = await this.postagemRepository.findOne({
            where: { id }
        });

        if (!postagem) {
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);

        } return postagem

    }

    async findByTitulo(titulo: string): Promise<Postagem[]> {
        return await this.postagemRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`)
            }
        })
    }

    async create(postagem: Postagem): Promise<Postagem> {
        return await this.postagemRepository.save(postagem);
    }

    async update(postagem: Postagem): Promise<Postagem> {
         let buscaPostagem = await this.findById(postagem.id);

        if (!buscaPostagem || !postagem.id){
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);
        }
        return await this.postagemRepository.save(postagem);
    }

    async delete(id: number): Promise<DeleteResult> {
   
        let buscaPostagem = await this.findById(id);

        if (!buscaPostagem)
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);

        return await this.postagemRepository.delete(id);
    }
    
}