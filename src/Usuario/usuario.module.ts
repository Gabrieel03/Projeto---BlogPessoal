import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UsuarioController } from './Controller/usuario.controller';
import { UsuarioService } from './Service/usuario.service';
import { Usuario } from './Entities/usuario.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Usuario]), forwardRef(() => AuthModule)],
    providers: [UsuarioService],
    controllers: [UsuarioController],
    exports: [UsuarioService],
})
export class UsuarioModule { }