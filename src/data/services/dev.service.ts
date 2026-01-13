import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";
import { Tema } from "../../tema/entities/tema.entity";
import { Usuario } from "../../Usuario/Entities/usuario.entity";


export class DevService implements TypeOrmOptionsFactory {
    
    createTypeOrmOptions(): TypeOrmModuleOptions{
        return {
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'GabGouIngriGab0307@',
            database: 'db_blogpessoal',
            entities: [Postagem, Tema, Usuario],
            synchronize: true,
        };
    }
}