import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ReminderService {
  constructor(private prisma: PrismaService) {}
  async create(createReminderDto: CreateReminderDto) {
    const {
      endsWhenStockRunsOut,
      routine_id,
      startDate,
      endDate,
      user_id,
      medication_id,
    } = createReminderDto;

    const routine = await this.prisma.routine.findUnique({
      where: { id: routine_id },
    });

    if (!routine) {
      throw new Error('Routine not found');
    }

    const medicationStock = await this.prisma.medicationStock.findUnique({
      where: { id: medication_id },
    });

    if (!medicationStock) {
      throw new Error('Medication stock not found');
    }

    if (endsWhenStockRunsOut) {
      const reminder = await this.prisma.reminder.create({
        data: {
          name: createReminderDto.name,
          startDate,
          user_id,
          routine_id,
          endsWhenStockRunsOut: true,
          medication_id,
          endDate: null,
        },
      });
      return reminder;
    } else {
      const reminder = await this.prisma.reminder.create({
        data: {
          name: createReminderDto.name,
          startDate,
          endDate,
          user_id,
          routine_id,
          endsWhenStockRunsOut: false,
          medication_id,
        },
      });
      return reminder;
    }
  }

  async checkStockAndUpdateReminder() {
    const reminders = await this.prisma.reminder.findMany({
      where: { endsWhenStockRunsOut: true },
    });

    for (const reminder of reminders) {
      const routine = await this.prisma.routine.findUnique({
        where: { id: reminder.routine_id },
      });

      const medicationStock = await this.prisma.medicationStock.findUnique({
        where: { id: routine.medication_id },
      });

      if (medicationStock.numberOfPills <= 0) {
        reminder.endDate = new Date();
        await this.prisma.reminder.update({
          where: { id: reminder.id },
          data: {
            endDate: reminder.endDate,
          },
        });
      }
    }
  }

  async findAll() {
    return await this.prisma.reminder.findMany();
  }

  async findOne(id: string) {
    const reminder = await this.prisma.reminder.findUnique({
      where: {
        id,
      },
    });

    if (!reminder) {
      throw new NotFoundException('Reminder not found');
    }

    return reminder;
  }

  update(id: number, updateReminderDto: UpdateReminderDto) {
    return `This action updates a #${id} reminder`;
  }

  remove(id: string) {
    return this.prisma.reminder.delete({
      where: {
        id,
      },
    });
  }
}
