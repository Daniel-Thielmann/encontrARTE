import { Module } from '@nestjs/common';
import { MedicationStockService } from './medication-stock.service';
import { MedicationStockController } from './medication-stock.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [MedicationStockController],
  providers: [MedicationStockService, PrismaService],
})
export class MedicationStockModule {}
