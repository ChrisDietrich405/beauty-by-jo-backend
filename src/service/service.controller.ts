import { Body, Controller, Get, Query } from '@nestjs/common';
import { get } from 'http';
import { ServiceService } from './service.service';

// import { AppService } from './app.service';

@Controller('/service')
export class ServiceController {
  constructor(private serviceService: ServiceService) {}

  // With @Body is like (createUserDto = information from the front-end or postman)
  @Get()
  index(): any {
    return this.serviceService.findAll();
  }

  @Get('/verifyAvailability')
  async verifyAvailability(
    @Query('date') date,
    @Query('specificServiceId') specificServiceId,
  ) {
    return this.serviceService.verifyAvailability(date, specificServiceId);
  }
}
