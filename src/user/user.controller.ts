import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UserService } from './user.service';

// import { AppService } from './app.service';

@Controller('/user')
export class UserController {

    constructor(private userService: UserService) {
    }

  // With @Body is like (createUserDto = information from the front-end or postman)
  @Post()
  newUser(@Body() createUserDto: CreateUserDto): any {
    return this.userService.insert(createUserDto)
  }
}
