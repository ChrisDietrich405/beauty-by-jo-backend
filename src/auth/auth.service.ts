import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SigninAuthDto } from './dto/signin-auth-dto';
import { JwtService } from '@nestjs/jwt';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) { }

  async validateUser({ email, password }: SigninAuthDto): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const userPayload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    }

    const payload = { username: user.username, sub: user.id };
    
    return {
      user: userPayload,
      access_token: this.jwtService.sign(payload),
      message: 'You are logged in successfully',
      success: true,
    };
  }
}
