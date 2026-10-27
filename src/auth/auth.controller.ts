import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { get } from 'http';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    // Para acessar o register, você pode usar 
    // a rota POST /auth/register com o corpo da requisição 
    // contendo os campos name, email e password.
    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Get()
    getAllUsers() {
        return this.authService.getAllUsers();
    }
    
}
