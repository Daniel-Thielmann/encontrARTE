import { IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @IsString({ message: 'O nome deve ser uma string' })
  name: string;

  @IsNotEmpty({ message: 'O email não pode ser vazio' })
  @IsString({ message: 'O email deve ser uma string' })
  email: string;

  @IsNotEmpty({ message: 'A senha não pode ser vazia' })
  @IsString({ message: 'A senha deve ser uma string' })
  password: string;
}
