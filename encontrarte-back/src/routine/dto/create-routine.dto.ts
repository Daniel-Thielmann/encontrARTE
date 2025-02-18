import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsNumber, IsDate } from 'class-validator';

export class CreateRoutineDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @IsString({ message: 'O nome deve ser uma string' })
  name: string;

  @IsNotEmpty({ message: 'o Id da medicação não pode ser vazio' })
  @IsString({ message: 'O Id da medicação deve ser uma string' })
  medication_id: string;

  @IsNotEmpty({ message: 'O Id do usuário não pode ser vazio' })
  @IsString({ message: 'O Id do usuário deve ser uma string' })
  user_id: string;

  @IsNotEmpty({ message: 'A quantidade de comprimidos não pode ser vazio' })
  @IsNumber()
  numberOfPillsIngested: number;

  @IsNotEmpty({ message: 'O id do usuário não pode ser vazio' })
  @Type(() => Date)
  @IsDate()
  timeOfPillIngestion: Date;
}
