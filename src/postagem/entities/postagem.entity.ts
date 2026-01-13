import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Tema } from "../../tema/entities/tema.entity";
import { Usuario } from "../../Usuario/Entities/usuario.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'tb_postagens' }) //Indicando que a class é uma Entidade/Model e converte em TB no DB
export class Postagem {

    @ApiProperty()
    @PrimaryGeneratedColumn() //Chave Primaria e Auto Incremental
    id: number;

    @ApiProperty()
    @IsNotEmpty()  //Validador de Objeto Verificar se o campo está ausente
    @Column({ length: 100, nullable: false })  //Regra do MySQL - NOT NULL do MySQL
    titulo: string

    @ApiProperty()
    @IsNotEmpty()
    @Column({ length: 1000, nullable: false })
    texto: string

    @ApiProperty()
    @UpdateDateColumn()
    data: Date

    @ApiProperty({ type: () => Tema })
    @ManyToOne(() => Tema, (tema) => tema.postagem, {
        onDelete: 'CASCADE'
    })
    tema: Tema

    @ApiProperty({ type: () => Usuario })
    // Indica o lado MUITO do relacionamento, indicando que esse campo se conecta ao campo Postagem da Model Usuario
    @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
        onDelete: "CASCADE"
    })
    usuario: Usuario

}