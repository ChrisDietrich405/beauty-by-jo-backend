import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { PasswordReset } from './password-reset.entity';

@Module({
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User, PasswordReset])],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
