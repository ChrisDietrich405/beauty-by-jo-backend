import { HttpException, HttpStatus, Injectable, Query } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { Schedule } from './schedule.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
    @InjectConnection()
    private connection: Connection,
  ) {}

  async save(data: any): Promise<Schedule> {
    const schedule = await this.scheduleRepository.save();
    return schedule;
  }
}
