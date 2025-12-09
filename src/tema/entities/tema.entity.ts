import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";

@Entity({ name: "tb_tema" })
export class Tema {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({ nullable: false, length: 255 })
    descricao: string;

    @OneToMany(() => Postagem, (postagem) => postagem.tema)
    postagem: Postagem[];

}