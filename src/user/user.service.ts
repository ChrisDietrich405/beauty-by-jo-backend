import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './user.entity';
const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
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
}
