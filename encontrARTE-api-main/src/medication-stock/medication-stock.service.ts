import { Injectable } from '@nestjs/common';
import { CreateMedicationStockDto } from './dto/create-medication-stock.dto';
import { UpdateMedicationStockDto } from './dto/update-medication-stock.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class MedicationStockService {
  constructor(private prisma: PrismaService) {}
  async create(createMedicationStockDto: CreateMedicationStockDto) {
    const newMedicationStock = await this.prisma.medicationStock.create({
      data: {
        name: createMedicationStockDto.name,
        dose: createMedicationStockDto.dose,
        numberOfPills: createMedicationStockDto.numberOfPills,
        numberOfPackages: createMedicationStockDto.numberOfPackages,
        user_id: createMedicationStockDto.user_id,
      },
    });

    return {
      newMedicationStock,
      message: 'MedicationStock criado com sucesso!',
    };
  }

  async findAll() {
    return this.prisma.medicationStock.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.medicationStock.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateMedicationStockDto: UpdateMedicationStockDto) {
    const updateData = { ...updateMedicationStockDto };

    const medicationStock = await this.prisma.medicationStock.update({
      where: { id },
      data: updateData,
    });

    return {
      medicationStock,
      message: 'Estoque atualizado com sucesso!',
    };
  }

  async remove(id: string) {
    await this.prisma.medicationStock.delete({
      where: { id },
    });
    return {
      message: 'Estoque removido com sucesso!',
    };
  }
}
