import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { PostagemService } from "../services/postagem.service";
import { Postagem } from "../entities/postagem.entity";

@Controller("/postagens")  //Indica que a classe e uma classe de controller
export class PostagemController {

    constructor(private readonly postagemService: PostagemService) { }

    @Get() //Indica qual e o tipo de requisição esse metodo executa
    @HttpCode(HttpStatus.OK) //Monta  a resposta Http para o front com o status code
    findAll(): Promise<Postagem[]> {
        return this.postagemService.findAll()
    }

}


