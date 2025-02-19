import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MedicationStockModule } from './medication-stock/medication-stock.module';
import { RoutineModule } from './routine/routine.module';
import { ReminderModule } from './reminder/reminder.module';

@Module({
  imports: [UsersModule, MedicationStockModule, RoutineModule, ReminderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
