import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('produto')

export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) { }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getUser(@CurrentUser() user: any) {
    return user;
  }


  @UseGuards(JwtAuthGuard, RolesGuard,)
  @Roles('ADMIN')
  @Post()
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtoService.create(createProdutoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.produtoService.findAll();
  }

  @Get('disponiveis')
  findDisponiveis() {
    return this.produtoService.findDisponiveis();
  }
  
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.produtoService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard,)
  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtoService.update(+id, updateProdutoDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard,)
  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtoService.remove(+id);
  }
}
