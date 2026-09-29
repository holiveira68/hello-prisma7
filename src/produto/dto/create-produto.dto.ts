import { IsInt, IsString, IsOptional, IsNumber, IsNotEmpty, Min } from 'class-validator';

export class CreateProdutoDto {

    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsOptional()
    @IsString()
    descricao?: string;

    @IsNumber()
    @Min(0)
    preco: number;

    @IsInt()
    @Min(0)
    estoque: number;

}
