import { Body, Controller, Request, Post, Query } from '@nestjs/common';
import { get, request } from 'http';
import { CreateScheduleDto } from './create-schedule-dto';
import { ScheduleService } from './schedule.service';

@Controller('/schedule')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  // With @Body is like (createUserDto = information from the front-end or postman)
  // @Get()
  // index(): any {
  //   return this.scheduleService.findAll();
  // }

  @Post()
  save(@Body() createScheduleDto: CreateScheduleDto, @Request() req): any {
    console.log(req.user);
    return this.scheduleService.save(createScheduleDto);
  }
}
