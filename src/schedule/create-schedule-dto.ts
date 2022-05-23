/* eslint-disable prettier/prettier */
import {
  IsBoolean,
  IsDate,
  IsDefined,
  IsDateString,
  IsInt,
} from 'class-validator';

export class CreateScheduleDto {
  @IsDefined()
  @IsInt()
  specific_service_id;
  @IsDefined()
  @IsDateString()
  date;
  @IsDefined()
  @IsBoolean()
  status;

  user_id;
}
