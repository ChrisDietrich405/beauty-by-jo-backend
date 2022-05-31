import { HttpException, HttpStatus, Injectable, Query } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { Service } from './service.entity';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
    @InjectConnection()
    private connection: Connection,
  ) {}

  async findAll(): Promise<Service[]> {
    const services = await this.serviceRepository
      .createQueryBuilder('service')
      .leftJoinAndSelect('service.specificService', 'specificService')
      .getMany();
    return services;
  }

  async verifyAvailability(date) {
    const availability = await this.connection.query(
      `select Date_Ranges.Date, schedule.id is null as available from (
      WITH recursive Date_Ranges AS (
        select CAST(? as datetime) as Date
         union all
         select date_add(Date, interval 90 minute)
         from Date_Ranges
         where Date < cast(? as datetime))
      select Date from Date_Ranges
    ) as Date_Ranges
    left join schedule on Date_Ranges.date = schedule.date`,
      [`${date} 09:00:00`, `${date} 16:00:00`],
    );
    return availability;
  }
}
