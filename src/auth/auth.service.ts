import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) { }
    async register(registerDto: RegisterDto) {
        const { name, email, password } = registerDto;
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new ConflictException(
                'E-mail já cadastrado',
            );
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await this.prisma.user.create({
            data: {
                name,
                email,
                password: passwordHash,
            },
        });
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role,
        };
    }

    async getAllUsers() {
        const users = await this.prisma.user.findMany();
        return users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        }));
    }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new UnauthorizedException(
                'E-mail ou senha inválidos',
            );
        }
        const passwordIsValid = await bcrypt.compare(
            password,
            user.password,
        );
        if (!passwordIsValid) {
            throw new UnauthorizedException(
                'E-mail ou senha inválidos',
            );
        }
        const accessToken = this.jwtService.sign({
            sub: user.id,
            email: user.email,
            role: user.role,
        });
        return {
            access_token: accessToken,
        };
    }

}