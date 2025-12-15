import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { UsuarioLogin } from './../entities/usuariologin.entity';
import { AuthService } from '../service/auth.service';
import { LocalAuthGuard } from '../guard/local-auth.guard';

@Controller("/usuarios")
export class AuthController {
    constructor(private authService: AuthService) { }

    // Anotação que indica que usaremos uma classe de validação especial (Guard)
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/logar')
    login(@Body() usuario: UsuarioLogin): Promise<any> {
        return this.authService.login(usuario);
    }

}