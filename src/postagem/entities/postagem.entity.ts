import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity({ name: 'tb_postagens' }) //Indicando que a class é uma Entidade/Model e converte em TB no DB
export class Postagem {

    @PrimaryGeneratedColumn() //Chave Primaria e Auto Incremental
    id: number;

    @IsNotEmpty()  //Validador de Objeto Verificar se o campo está ausente
    @Column({ length: 100, nullable: false })  //Regra do MySQL - NOT NULL do MySQL
    titulo: string

    @IsNotEmpty()
    @Column({ length: 1000, nullable: false })
    texto: string

    @UpdateDateColumn()
    data: Date
}