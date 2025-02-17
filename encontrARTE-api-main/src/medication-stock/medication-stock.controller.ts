import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MedicationStockService } from './medication-stock.service';
import { CreateMedicationStockDto } from './dto/create-medication-stock.dto';
import { UpdateMedicationStockDto } from './dto/update-medication-stock.dto';

@Controller('medication-stock')
export class MedicationStockController {
  constructor(
    private readonly medicationStockService: MedicationStockService,
  ) {}

  @Post()
  create(@Body() createMedicationStockDto: CreateMedicationStockDto) {
    return this.medicationStockService.create(createMedicationStockDto);
  }

  @Get()
  findAll() {
    return this.medicationStockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicationStockService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMedicationStockDto: UpdateMedicationStockDto,
  ) {
    return this.medicationStockService.update(id, updateMedicationStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicationStockService.remove(id);
  }
}
