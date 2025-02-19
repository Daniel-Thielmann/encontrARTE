import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMedicationStockDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @IsString({ message: 'O nome deve ser uma string' })
  name: string;

  @IsNotEmpty({ message: 'A dose não pode ser vazio' })
  @IsNumber()
  dose: number;

  @IsNotEmpty({ message: 'A quantidade de comprimidos não pode ser vazio' })
  @IsNumber()
  numberOfPills: number;

  @IsNotEmpty({ message: 'A quantidade de caixas não pode ser vazio' })
  @IsNumber()
  numberOfPackages: number;

  @IsNotEmpty({ message: 'O id do usuário não pode ser vazio' })
  @IsString({ message: 'O id do usuário deve ser uma string' })
  user_id: string;
}
