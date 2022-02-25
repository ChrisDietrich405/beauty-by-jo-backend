import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { get } from 'http';
import { CreateScheduleDto } from './create-schedule-dto';
import { ScheduleService } from './schedule.service';

// import { AppService } from './app.service';

@Controller('/schedule')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  // With @Body is like (createUserDto = information from the front-end or postman)
  @Get()
  index(): any {
    return this.scheduleService.findAll();
  }

  @Post()
  save(@Body()createScheduleDto:CreateScheduleDto): any {
      return this.scheduleService.save(createScheduleDto)
  }
}


