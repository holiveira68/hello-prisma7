import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsuarioService {
  constructor(
      private readonly prisma: PrismaService,
    ) { }
  
    create(createUsuarioDto: CreateUsuarioDto) {
      return this.prisma.usuario.create({data: createUsuarioDto,});
    }
  
    findAll() {
      return this.prisma.usuario.findMany({
        
        orderBy: {
          id: 'asc',
        },
      });
    }
  
    findOne(id: number) {
      return this.prisma.usuario.findUnique({
        where: { id },
      });
    }
  
    update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
      return this.prisma.usuario.update({
        where: { id },
        data: updateUsuarioDto,
      });
    }
  
    remove(id: number) {
      return this.prisma.usuario.delete({
        where: { id },
      });
    }
}
