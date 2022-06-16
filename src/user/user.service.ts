import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { PasswordReset } from './password-reset.entity';
import { User } from './user.entity';
import { v4 as uuid } from 'uuid';
import axios from 'axios';

const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(PasswordReset)
    private passwordResetRepository: Repository<PasswordReset>,
  ) {}

  async insert(createUserDto: CreateUserDto): Promise<object> {
    const { email } = createUserDto;
    const user = await this.usersRepository
      .createQueryBuilder()
      .where('email = :email', { email })
      .getOne();

    if (user) {
      throw new HttpException('email already in use', HttpStatus.BAD_REQUEST);
    }

    createUserDto.password = bcrypt.hashSync(
      createUserDto.password,
      parseInt(process.env.SALT_ROUNDS),
    );
    const inserted = await this.usersRepository.insert(createUserDto);
    return inserted.identifiers.pop();
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository
      .createQueryBuilder()
      .where('email = :email', { email })
      .getOne();
    return user;
  }

  async forgotPassword(email: string): Promise<any> {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const expires_at = new Date();
    expires_at.setDate(expires_at.getDate() + 1);

    const passwordReset = {
      id: null,
      user_id: user.id,
      hash: uuid(),
      expires_at,
    };

    await this.passwordResetRepository.insert(passwordReset);

    var data = {
      service_id: process.env.SERVICE_ID,
      template_id: process.env.TEMPLATE_ID,
      user_id: process.env.PUBLIC_KEY,
      accessToken: process.env.PRIVATE_KEY,
      template_params: {
        to_name: user.firstName,
        to_email: user.email,
        link: `<a href="${process.env.APP_URL}/reset-password/${passwordReset.hash}">here</a>`,
      },
    };

    await axios.post(
      'https://api.emailjs.com/api/v1.0/email/send',
      JSON.stringify(data),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }

  async resetPassword(
    hash: string,
    password: string,
    passwordConfirmation: string,
  ): Promise<any> {
    if (password?.trim() !== passwordConfirmation?.trim()) {
      throw new HttpException(
        { message: 'Password not confirmed', type: 'error' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const resetPassword = await this.passwordResetRepository
      .createQueryBuilder('password_reset')
      .leftJoinAndSelect('password_reset.user', 'user')
      .where('hash = :hash and expires_at >= :date', { hash, date: new Date() })
      .getOne();

    if (!resetPassword) {
      throw new HttpException(
        { message: 'Hash expired', type: 'expired' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const { user } = resetPassword;
    user.password = bcrypt.hashSync(
      password,
      parseInt(process.env.SALT_ROUNDS),
    );

    await this.usersRepository.save(user);

    resetPassword.expires_at = new Date();
    await this.passwordResetRepository.save(resetPassword);

    return resetPassword.expires_at;
  }
}
