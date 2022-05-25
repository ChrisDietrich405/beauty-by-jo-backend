import {
  Body,
  Controller,
  Request,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { get, request } from 'http';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateScheduleDto } from './create-schedule-dto';
import { ScheduleService } from './schedule.service';

@Controller('/schedule')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  save(@Body() createScheduleDto: CreateScheduleDto, @Request() req): any {
    createScheduleDto.user_id = req.user.id;
    return this.scheduleService.save(createScheduleDto);
  }
}
