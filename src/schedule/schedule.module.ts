import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './schedule.entity';
import { SpecificService } from '../service/specific-service.entity';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';

@Module({
  providers: [ScheduleService],
  imports: [TypeOrmModule.forFeature([Schedule, SpecificService])],
  controllers: [ScheduleController],
  exports: [ScheduleService],
})
export class ScheduleModule {}
