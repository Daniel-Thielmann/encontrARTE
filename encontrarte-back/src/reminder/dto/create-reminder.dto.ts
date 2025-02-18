import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateReminderDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @IsString({ message: 'O nome deve ser uma string' })
  name: string;

  @IsNotEmpty({ message: 'A data de início não pode ser vazia' })
  @IsDate({ message: 'A data deve ser uma data válida' })
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  startDate: Date;

  @IsOptional()
  @IsDate({ message: 'A data de término deve ser uma data válida' })
  @Transform(({ value }) => (value ? new Date(value) : null), {
    toClassOnly: true,
  })
  endDate?: Date;

  @IsNotEmpty({ message: 'O ID do usuário não pode ser vazio' })
  @IsString({ message: 'O ID do usuário deve ser uma string' })
  user_id: string;

  @IsNotEmpty({ message: 'O ID da rotina não pode ser vazio' })
  @IsString({ message: 'O ID da rotina deve ser uma string' })
  routine_id: string;

  @IsNotEmpty({ message: 'O campo endsWhenStockRunsOut não pode ser vazio' })
  @IsBoolean({ message: 'O campo endsWhenStockRunsOut deve ser um booleano' })
  endsWhenStockRunsOut: boolean;

  @IsOptional()
  @IsString({ message: 'O ID do estoque de medicação deve ser uma string' })
  medication_id?: string;
}
