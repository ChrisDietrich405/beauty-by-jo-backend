import { IsNotEmpty } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  hash: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  password_confirmation: string;
}
