import { Injectable } from '@nestjs/common';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class RoutineService {
  constructor(private prisma: PrismaService) {}
  async create(createRoutineDto: CreateRoutineDto) {
    const newRoutine = await this.prisma.routine.create({
      data: {
        name: createRoutineDto.name,
        numberOfPillsIngested: createRoutineDto.numberOfPillsIngested,
        timeOfPillIngestion: createRoutineDto.timeOfPillIngestion,
        user_id: createRoutineDto.user_id,
        medication_id: createRoutineDto.medication_id,
      },
    });

    return {
      newRoutine,
      message: 'Rotina criada com sucesso!',
    };
  }

  async findAll() {
    return await this.prisma.routine.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} routine`;
  }

  update(id: number, updateRoutineDto: UpdateRoutineDto) {
    return `This action updates a #${id} routine`;
  }

  remove(id: number) {
    return `This action removes a #${id} routine`;
  }
}
