import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { ForgotPasswordDto } from './dto/forgot-password-dto';
import { ResetPasswordDto } from './dto/reset-password-dto';
import { UserService } from './user.service';

// import { AppService } from './app.service';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  // With @Body is like (createUserDto = information from the front-end or postman)
  @Post()
  newUser(@Body() createUserDto: CreateUserDto): any {
    return this.userService.insert(createUserDto);
  }

  @Post('/forgot-password')
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.userService.forgotPassword(forgotPasswordDto.email);
  }

  @Post('/reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.userService.resetPassword(
      resetPasswordDto.hash,
      resetPasswordDto.password,
      resetPasswordDto.password_confirmation,
    );
  }
}
