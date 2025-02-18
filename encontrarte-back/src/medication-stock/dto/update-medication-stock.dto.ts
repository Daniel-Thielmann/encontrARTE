import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicationStockDto } from './create-medication-stock.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMedicationStockDto extends PartialType(
  CreateMedicationStockDto,
) {
  @IsString({ message: 'O nome deve ser uma string' })
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  dose: number;

  @IsNumber()
  @IsOptional()
  numberOfPills: number;

  @IsNumber()
  @IsOptional()
  numberOfPackages: number;

  @IsString({ message: 'O id do usuário deve ser uma string' })
  @IsOptional()
  user_id: string;
}
