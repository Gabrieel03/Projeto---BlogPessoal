import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "tb_tema" })
export class Tema {
    
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @IsNotEmpty()
    @Column({ nullable: false, length: 255 })
    @ApiProperty()
    descricao: string;

    @OneToMany(() => Postagem, (postagem) => postagem.tema)
    @ApiProperty({ type: () => [Postagem] })
    postagem: Postagem[];

}