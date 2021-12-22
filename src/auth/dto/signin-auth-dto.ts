/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsEmail } from 'class-validator';

export class SigninAuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}
