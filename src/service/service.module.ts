import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './service.entity';
import { SpecificService } from './specific-service.entity';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';

@Module({
  providers: [ServiceService],
  imports: [TypeOrmModule.forFeature([Service, SpecificService])],
  controllers: [ServiceController],
  exports: [ServiceService],
})
export class ServiceModule {}
