/* eslint-disable prettier/prettier */
import { IsBoolean, IsDate, IsDefined, IsInt } from 'class-validator';

export class CreateScheduleDto {
  @IsDefined()
  @IsInt()
  specific_service_id
  @IsDefined()
  @IsDate()
  date
  @IsDefined()
  @IsBoolean()
  status
  
 

}