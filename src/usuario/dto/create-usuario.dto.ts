import { IsInt, isEmail, IsString, IsOptional, IsNumber, IsNotEmpty, Min, IsEmail } from 'class-validator';


export class CreateUsuarioDto {
@IsString()
@IsNotEmpty()
nome: string;

@IsEmail()
@IsString()
email: string;

@IsNotEmpty()
@IsString()
senhaHash: string;



}
